import { ErrorBoundary } from "react-error-boundary";
import Logo from "../../assets/Logo";
import CategoryList from "../../features/Categories/CategoryList";
import ErrorMessage from "../Loading/Message";
import CategorySkeleton from "../../features/Categories/CategorySkeleton";
import { Suspense, useCallback } from "react";
import { USER_PAGE_URL } from "../../const/clientPath";
import useNavigateWithState from "../../hooks/useNavigateWithState";
import useModal from "../../hooks/useModal";
import LoginForm from "../../features/auth/component/login/LoginForm";
import SettingsIcon from "@mui/icons-material/Settings";
import { ButtonBase } from "@mui/material";
import useDoubleCheckMutation from "../../features/auth/api/useDoubleCheckMutation";

const Navbar = () => {
  const navigate = useNavigateWithState();
  const { openModal, closeModal } = useModal();
  const { mutateAsync: doubleCheckPassword } = useDoubleCheckMutation();

  const openLoginModal = useCallback(() => {
    openModal(
      <LoginForm
        disableAutoComplete
        onSubmit={async ({ userId, password }) => {
          await doubleCheckPassword({ userId, password });
          navigate(USER_PAGE_URL);
          closeModal();
        }}
      />
    );
  }, []);

  return (
    <nav className="flex-row flex items-center border-b justify-between px-4 w-full h-[60px] fixed top-0 bg-white overflow-y-auto">
      <ErrorBoundary fallback={<ErrorMessage />}>
        <Suspense fallback={<CategorySkeleton />}>
          <CategoryList />
        </Suspense>
      </ErrorBoundary>
      <ButtonBase
        onClick={openLoginModal}
        sx={{ display: { xs: "none", sm: "block" } }}
      >
        <Logo />
      </ButtonBase>
      <ButtonBase
        onClick={openLoginModal}
        sx={{ display: { xs: "block", sm: "none" } }}
      >
        <SettingsIcon />
      </ButtonBase>
    </nav>
  );
};

export default Navbar;
