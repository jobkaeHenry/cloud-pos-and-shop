import { Card, CardProps, Stack, Typography } from "@mui/material";
import { useState } from "react";
import PostAddIcon from "@mui/icons-material/PostAdd";
import CategoryEditorCard from "./CategoryEditorCard";
import useCreateCategoryMutation from "../../api/useCreateCategoryMutation";

const NewCategoryButton = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { mutateAsync: newCategoryHandler } = useCreateCategoryMutation();

  return !isEditing ? (
    <CategoryButtonWrapper
      onClick={() => setIsEditing(true)}
      variant="outlined"
    >
      <Typography color={"text.secondary"}>카테고리 추가</Typography>
      <PostAddIcon />
    </CategoryButtonWrapper>
  ) : (
    <CategoryEditorCard
      onCancle={() => setIsEditing(false)}
      onSubmit={async (title) => {
        await newCategoryHandler(title);
        setIsEditing(false);
      }}
    />
  );
};

export const CategoryButtonWrapper = ({
  children,
  ...cardProps
}: CardProps) => {
  return (
    <Card
      variant="outlined"
      sx={{
        width: "calc(50% - 8px)",
        borderColor: "#c3c3c3",
        cursor: "pointer",
      }}
      {...cardProps}
    >
      <Stack
        p={2}
        gap={1}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {children}
      </Stack>
    </Card>
  );
};

export default NewCategoryButton;
