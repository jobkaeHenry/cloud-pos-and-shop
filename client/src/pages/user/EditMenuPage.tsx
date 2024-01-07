import { Button, Stack, Typography } from "@mui/material";
import MenuTable from "../../features/user/components/menu/MenuTable";

import { Suspense, useCallback } from "react";
import useModal from "../../hooks/useModal";
import NewMenuModal from "../../features/user/components/menu/NewMenuModal";
import { ErrorBoundary } from "react-error-boundary";
import ErrorMessage from "../../components/Loading/Message";

const EditMenuPage = () => {
  const { openModal } = useModal();

  const openNewMenuModal = useCallback(() => {
    openModal(<NewMenuModal />);
  }, [openModal]);

  return (
    <Stack rowGap={2}>
      <Typography variant="h2">메뉴 관리</Typography>
      <ErrorBoundary fallback={<ErrorMessage />}>
        <Suspense fallback={<></>}>
          <MenuTable />
        </Suspense>
      </ErrorBoundary>
      <Button
        onClick={openNewMenuModal}
        sx={{ position: "sticky", bottom: "16px" }}
      >
        메뉴 추가
      </Button>
    </Stack>
  );
};

export default EditMenuPage;
