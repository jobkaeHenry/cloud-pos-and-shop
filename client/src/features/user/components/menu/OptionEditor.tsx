import { Option, Product } from "../../../../types/Products";
import { IconButton, Stack, TextField } from "@mui/material";
import useProductDetailQuery from "../../../ProductList/api/useProductDetailQuery";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useCallback, useEffect, useState } from "react";
import ValidatePositiveIntiger from "../../../Coupon/utils/ValidateCorrectValue";

type Props = {
  productId: Product["id"];
  onChange?: (value: { remove: number[]; patch: Option[] }) => void;
};

const OptionEditor = ({ productId, onChange }: Props) => {
  const { data: productDetail } = useProductDetailQuery(productId);
  const [optionToPatch, setOptionToPatch] = useState<Option[]>(
    productDetail?.option
  );
  const [optionToDelete, setOptionToDelete] = useState<number[]>([]);

  const deleteHandler = useCallback((deleteItemId: number) => {
    setOptionToPatch((prev) => prev.filter(({ id }) => id !== deleteItemId));
    setOptionToDelete((prev) => [...prev, deleteItemId]);
  }, []);

  const changeHandler = useCallback((newData) => {
    setOptionToPatch((prev) =>
      prev.map((option) => {
        if (option.id !== newData.id) return option;
        return newData;
      })
    );
  }, []);

  useEffect(() => {
    onChange && onChange({ remove: optionToDelete, patch: optionToPatch });
  }, [optionToDelete, optionToPatch]);

  return (
    <>
      {optionToPatch &&
        optionToPatch.length > 0 &&
        optionToPatch.map((option) => (
          <Stack key={option.id} direction={"row"} gap={1}>
            <TextField
              label={"옵션명"}
              size="small"
              name="title"
              required
              onChange={({ target }) =>
                changeHandler({ ...option, title: target.value })
              }
              value={option.title}
            />
            <TextField
              label={"옵션가격"}
              name="price"
              size="small"
              InputProps={{ endAdornment: <>원</> }}
              required
              onChange={({ target }) =>
                changeHandler({ ...option, price: Number(target.value) })
              }
              value={option.price}
              error={
                option.price ? ValidatePositiveIntiger(option.price) : undefined
              }
            />
            <IconButton
              onClick={() => {
                deleteHandler(option.id);
              }}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </Stack>
        ))}
    </>
  );
};

export default OptionEditor;
