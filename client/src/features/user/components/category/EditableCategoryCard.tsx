import { useState } from "react";
import CategoryEditorCard from "./CategoryEditorCard";
import { CategoryButtonWrapper } from "./NewCategoryButton";
import SettingsIcon from "@mui/icons-material/Settings";
import useDeleteCategoryMutation from "../../api/useDeleteCategoryMutation";
import usePatchCategoryMutation from "../../api/usePatchCategoryMutation";
import { Stack } from "@mui/system";

type EditableCategoryCardProps = {
  id: number;
  title: string;
};

const EditableCategoryCard = ({ id, title }: EditableCategoryCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { mutateAsync: deleteCategoryHandler } = useDeleteCategoryMutation();
  const { mutateAsync: patchCategoryHandler } = usePatchCategoryMutation();

  return isEditing ? (
    <CategoryEditorCard
      title={title}
      onCancle={() => setIsEditing(false)}
      onSubmit={async (title) => {
        await patchCategoryHandler({ title, id });
        setIsEditing(false);
      }}
      onDelete={async () => {
        if (
          !window.confirm(
            "카테고리 삭제시 모든 하위 상품이 삭제됩니다. 삭제하시겠습니까?"
          )
        ) {
          return;
        }

        await deleteCategoryHandler(id);
        setIsEditing(false);
      }}
    />
  ) : (
    <CategoryButtonWrapper>
      <Stack direction={"row"} justifyContent={"space-between"} width={"100%"}>
        {title}
        <SettingsIcon onClick={() => setIsEditing(true)} />
      </Stack>
    </CategoryButtonWrapper>
  );
};

export default EditableCategoryCard;
