import { Stack, Typography } from "@mui/material";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorMessage from "../../components/Loading/Message";
import EditWebsiteContent from "./EditWebsiteContent";

const EditWebsitePage = () => {
  return (
    <Stack gap={2}>
      <Typography variant="h2" fontWeight={'bold'}>웹사이트 관리</Typography>
      <ErrorBoundary
        fallback={<ErrorMessage message="로그인 후 이용 가능합니다" />}
      >
        <Suspense fallback={<></>}>
          <EditWebsiteContent />
        </Suspense>
      </ErrorBoundary>
    </Stack>
  );
};

export default EditWebsitePage;
