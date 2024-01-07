import { useCallback, useEffect, useState } from "react";
import { Stack } from "@mui/system";
import { Button, NativeSelect, TextField, Typography } from "@mui/material";
import useGetCategoriesQuery from "../../../Categories/api/useCategoriesQuery";
import { CreateProductDTO } from "../../../ProductList/types/ProductDTO";
import useModal from "../../../../hooks/useModal";
import useCreateProductMutation from "../../../ProductList/api/useCreateProductMutation";
import NewOptionEditor from "./NewOptionEditor";
import { Option } from "../../../../types/Products";

const NewMenuModal = () => {
  const { data: categories } = useGetCategoriesQuery();
  const filteredCategory = categories.filter(
    (category) => category.title !== "All"
  );
  const { mutateAsync: createProductHandler } = useCreateProductMutation();

  const [formValue, setFormValue] = useState<CreateProductDTO>({
    title: "",
    description: "",
    categoryId: filteredCategory[0].id,
    //@ts-ignore 빈 값 감지로직과 내부에 number로 바꾸는 로직이 있으므로 문제가 없음
    price: "",
  });

  const [option, setOption] = useState<Omit<Option, "id">[]>();

  const { closeModal } = useModal();
  const changeHandler = useCallback(
    (target: EventTarget & (HTMLInputElement | HTMLTextAreaElement)) => {
      setFormValue((prev) => ({ ...prev, [target.name]: target.value }));
    },
    []
  );

  return (
    <Stack
      gap={2}
      component={"form"}
      minWidth={"516px"}
      onSubmit={async (e) => {
        e.preventDefault();
        await createProductHandler({ ...formValue, option });
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
          {filteredCategory.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </NativeSelect>
      </Stack>
      <Typography variant="subtitle1">상품정보</Typography>
      <TextField
        label={"상품명"}
        name="title"
        size="small"
        onChange={({ target }) => changeHandler(target)}
        value={formValue.title}
        required
      />
      <TextField
        label={"가격"}
        size="small"
        type="number"
        name="price"
        onChange={({ target }) => changeHandler(target)}
        required
        value={formValue.price}
      />
      <TextField
        multiline
        rows={3}
        name="description"
        label={"상품설명"}
        onChange={({ target }) => changeHandler(target)}
        required
        value={formValue.description}
      />
      <Typography variant="subtitle1">옵션</Typography>
      <NewOptionEditor onChange={setOption} />
      <Button type="submit">저장</Button>
    </Stack>
  );
};

export default NewMenuModal;
