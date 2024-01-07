import { useCallback, useEffect, useState } from "react";
import { Option } from "../../../../types/Products";
import { Stack } from "@mui/system";
import { Button, IconButton, TextField } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ValidatePositiveIntiger from "../../../Coupon/utils/ValidateCorrectValue";

interface NewOptionEditorProps {
  onChange?: (optionArray: Omit<Option, "id">[]) => void;
}

const NewOptionEditor = ({ onChange }: NewOptionEditorProps) => {
  const [newOption, setNewOption] = useState<Omit<Option, "id">[]>([]);

  useEffect(() => {
    onChange && onChange(newOption);
  }, [newOption]);

  const changeHandler = useCallback(
    (
      target: EventTarget & (HTMLInputElement | HTMLTextAreaElement),
      index: number
    ) =>
      setNewOption((prev) =>
        prev.map((e, innerIndex) => {
          if (innerIndex === index) {
            return { ...e, [target.name]: target.value };
          }
          return e;
        })
      ),
    []
  );

  return (
    <>
      {newOption.length > 0 &&
        newOption.length > 0 &&
        newOption.map((newOption, index) => (
          <Stack key={index} direction={"row"} gap={1}>
            <TextField
              label={"옵션명"}
              size="small"
              name="title"
              required
              value={newOption.title}
              onChange={({ target }) => changeHandler(target, index)}
            />
            <TextField
              label={"옵션가격"}
              size="small"
              name="price"
              type="number"
              required
              InputProps={{ endAdornment: <>원</> }}
              value={newOption.price}
              error={
                newOption.price
                  ? ValidatePositiveIntiger(newOption.price)
                  : undefined
              }
              onChange={({ target }) => changeHandler(target, index)}
            />
            <IconButton
              onClick={() =>
                setNewOption((prev) =>
                  prev.filter((_, inner_index) => index !== inner_index)
                )
              }
            >
              <DeleteOutlineIcon />
            </IconButton>
          </Stack>
        ))}
      <Button
        variant="outlined"
        color="inherit"
        sx={{ color: "text.secondary" }}
        onClick={() =>
          setNewOption((prev) => [...prev, { title: "", price: 0 }])
        }
      >
        옵션추가
      </Button>
    </>
  );
};

export default NewOptionEditor;
