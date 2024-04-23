import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import MainPage from "./pages/main/MainPage";
import ProtectedRoute from "./layouts/ProtectedRoute";
import { HOME_URL, USER_PAGE_URL } from "./const/clientPath";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import UserPageLayout from "./pages/user/UserPageLayout";
import { Suspense } from "react";
import EditMenuPage from "./pages/user/EditMenuPage";
import EditCouponPage from "./pages/user/EditCouponPage";
import BaseLayout from "./BaseLayout";
import EditCategoryPage from "./pages/user/EditCategoryPage";
import EditWebsitePage from "./pages/user/EditWebsitePage";
import NotFoundPage from "./pages/NotFound";
import ViewOrdersPage from "./pages/user/ViewOrdersPage";

function App() {
  return (
    <BrowserRouter>
      <Suspense>
        <Routes>
          {/* 베이스 레이아웃 */}
          <Route element={<BaseLayout />}>
            {/* 로그인 전용 */}
            <Route element={<ProtectedRoute />}>
              <Route element={<MainPage />} path={HOME_URL} />
              {/* 세팅페이지 */}
              <Route element={<UserPageLayout />} path={USER_PAGE_URL}>
                <Route index element={<ViewOrdersPage />} />
                <Route element={<ViewOrdersPage />} path={"order"} />
                <Route element={<EditMenuPage />} path={"menu"} />
                <Route element={<EditCouponPage />} path={"coupon"} />
                <Route element={<EditCategoryPage />} path={"category"} />
                <Route element={<EditWebsitePage />} path={"website"} />
              </Route>
            </Route>
            {/* Auth 페이지 */}
            <Route path={"auth"} element={<Outlet />}>
              <Route path={"login"} element={<LoginPage />} />
              <Route path={"signup"} element={<SignupPage />} />
            </Route>
            {/* Catch all */}
            <Route path={"*"} element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
