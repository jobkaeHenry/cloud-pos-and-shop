import { useCallback, useState } from "react";
import { Product } from "../../../../types/Products";
import useProductDetailQuery from "../../../ProductList/api/useProductDetailQuery";
import { Stack } from "@mui/system";
import { Button, NativeSelect, TextField, Typography } from "@mui/material";
import useGetCategoriesQuery from "../../../Categories/api/useCategoriesQuery";
import OptionEditor from "./OptionEditor";
import usePatchProductMutation from "../../../ProductList/api/usePatchProductMutation";
import { PatchProductDTO } from "../../../ProductList/types/ProductDTO";
import useModal from "../../../../hooks/useModal";
import NewOptionEditor from "./NewOptionEditor";
import {
  CreateOptionDTO,
  PatchOptionByArrayDTO,
} from "../../../ProductList/types/OptionDTO";
import useDeleteMenuMutation from "../../api/useDeleteMenuMutation";
import { ImageInput } from "../../../../components/Atom/SingleImageInput";
import { usePatchImageMutation } from "../../api/usePatchImageMutation";

type Props = {
  productId: Product["id"];
};

const MenuEditorModal = ({ productId }: Props) => {
  const { data: productDetail } = useProductDetailQuery(productId);
  const { data: categories } = useGetCategoriesQuery();
  const { mutateAsync: patchProductHandler } = usePatchProductMutation();
  const { mutateAsync: deleteProduct } = useDeleteMenuMutation();
  const { mutateAsync: uploadImage } = usePatchImageMutation();

  const [formValue, setFormValue] = useState<PatchProductDTO>({
    title: productDetail.title,
    categoryId: productDetail.category.id,
    description: productDetail.description,
    price: productDetail.price,
    adminMemo: productDetail.adminMemo ?? "",
  });
  const [newImage, setNewImage] = useState<File>(null);

  const [optionToPatch, setOptionToPatch] = useState<{
    patch?: PatchOptionByArrayDTO[];
    remove?: number[];
  }>();

  const [optionIdToCreate, setOptionIdToCreate] = useState<CreateOptionDTO[]>();

  const { closeModal } = useModal();

  const changeHandler = useCallback(
    (target: EventTarget & (HTMLInputElement | HTMLTextAreaElement)) => {
      setFormValue((prev) => ({ ...prev, [target.name]: target.value }));
    },
    []
  );

  const deleteHandler = useCallback(async () => {
    if (window.confirm("메뉴를 삭제하겠습니까?")) {
      await deleteProduct(productId);
      closeModal();
    }
  }, []);

  return (
    <Stack
      gap={2}
      component={"form"}
      onSubmit={async (e) => {
        e.preventDefault();
        await uploadImage({ file: newImage, menuId: productDetail.id });
        await patchProductHandler({
          menuId: productId,
          formData: {
            ...formValue,
            option: { create: optionIdToCreate, ...optionToPatch },
          },
        });
        closeModal();
      }}
    >
      <Stack>
        <Typography variant="subtitle1">카테고리</Typography>
        <NativeSelect
          value={formValue.categoryId}
          onChange={({ target }) =>
            setFormValue((prev) => ({
              ...prev,
              categoryId: Number(target.value),
            }))
          }
        >
          {/* FIXME */}
          {categories
            .filter((category) => category.title !== "All")
            .map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
        </NativeSelect>
      </Stack>
      <Typography variant="subtitle1">상품정보</Typography>
      <Stack direction={"row"} gap={1}>
        <TextField
          fullWidth
          label={"상품명"}
          name="title"
          size="small"
          onChange={({ target }) => changeHandler(target)}
          value={formValue.title}
        />
        <TextField
          fullWidth
          label={"가격"}
          size="small"
          type="number"
          name="price"
          onChange={({ target }) => changeHandler(target)}
          value={formValue.price}
        />
      </Stack>
      <Stack direction={"row"} gap={1}>
        <ImageInput
          onFileChange={setNewImage}
          initialImage={productDetail.image}
        />
        <TextField
          multiline
          fullWidth
          rows={3}
          name="description"
          label={"상품설명"}
          placeholder="고객에게 보여지는 상품 설명입니다"
          onChange={({ target }) => changeHandler(target)}
          value={formValue.description}
        />
      </Stack>
      <TextField
        multiline
        rows={5}
        name="adminMemo"
        label={"점주용 메모"}
        placeholder="관리자만 확인 가능한 메모입니다 레시피, 직원 지시사항 등을 작성해주세요"
        onChange={({ target }) => changeHandler(target)}
        value={formValue.adminMemo}
      />
      {/* 기존옵션 패치 */}
      <Typography variant="subtitle1">옵션</Typography>
      <OptionEditor
        productId={productId}
        onChange={(val) => setOptionToPatch(val)}
      />
      {/* 신규 옵션 추가 */}
      <NewOptionEditor onChange={(val) => setOptionIdToCreate(val)} />
      {/* 삭제 저장 */}
      <Stack direction={"row"} gap={1}>
        <Button
          fullWidth
          variant="outlined"
          color="error"
          onClick={deleteHandler}
        >
          메뉴삭제
        </Button>
        <Button fullWidth type="submit">
          저장
        </Button>
      </Stack>
    </Stack>
  );
};

export default MenuEditorModal;
