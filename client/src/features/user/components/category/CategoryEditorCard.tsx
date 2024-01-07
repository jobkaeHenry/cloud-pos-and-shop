import { Button, IconButton, Stack, TextField } from "@mui/material";
import { Ref, useRef, useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

type Props = {
  onSubmit?: (title: string) => void;
  onCancle?: () => void;
  onDelete?: () => void;
  title?: string;
};

const CategoryEditorCard = ({ title, onSubmit, onCancle, onDelete }: Props) => {
  const [newTitle, setNewTitle] = useState(title ?? "");

  return (
    <TextField
      value={newTitle}
      label="카테고리명"
      autoFocus
      onChange={({ target }) => setNewTitle(target.value)}
      sx={{ width: "calc(50% - 8px)" }}
      InputProps={{
        startAdornment: (
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onDelete && onDelete();
            }}
          >
            <DeleteOutlineIcon color="error" />
          </IconButton>
        ),
        endAdornment: (
          <Stack direction={"row"} gap={1}>
            <Button
              size="small"
              variant="outlined"
              onClick={() => onCancle && onCancle()}
            >
              취소
            </Button>
            <Button
              type="submit"
              size="small"
              onClick={() => onSubmit && onSubmit(newTitle)}
            >
              저장
            </Button>
          </Stack>
        ),
      }}
    >
      {title}
    </TextField>
  );
};

export default CategoryEditorCard;
