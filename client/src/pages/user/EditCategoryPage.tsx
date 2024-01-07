import { Stack, Typography } from "@mui/material";
import NewCategoryButton from "../../features/user/components/category/NewCategoryButton";
import EditableCategoryList from "../../features/user/components/category/EditableCategoryList";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorMessage from "../../components/Loading/Message";

const EditCategoryPage = () => {
  return (
    <Stack gap={2}>
      <Typography variant="h2">카테고리 관리</Typography>
      <Stack flexWrap={"wrap"} direction="row" gap={2}>
        <NewCategoryButton />
        <ErrorBoundary fallback={<ErrorMessage />}>
          <Suspense>
            <EditableCategoryList />
          </Suspense>
        </ErrorBoundary>
      </Stack>
    </Stack>
  );
};

export default EditCategoryPage;
