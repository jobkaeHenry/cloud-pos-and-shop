import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ProductList from "../../features/ProductList/ProductList";
import Cart from "../../features/Cart/Cart";
import ErrorMessage from "../../components/Loading/Message";
import ProductListSkeleton from "../../features/ProductList/ProductListSkeleton";
import useInitialCartItems from "../../hooks/useInitialCartItems";
import Navbar from "./../../components/Atom/Navbar";
import { Box, Stack } from "@mui/material";
import { CART_CTA_HEIGHT, NAVBAR_HEIGHT } from "../../const/UiSize";

const MainPage = () => {
  useInitialCartItems(); // 로컬스토리지에 아이템이 있다면 불러올 지 여부를 물음
  return (
    <>
      <Navbar />
      <Stack
        width={"100%"}
        position={"fixed"}
        top={NAVBAR_HEIGHT}
        bottom={0}
        direction={{ xs: "column", md: "row" }}
      >
        <Box
          component={"main"}
          bgcolor={"grey.100"}
          sx={{
            width: "100%",
            overflowY: "auto",
            pb: {
              xs: `calc(${CART_CTA_HEIGHT} + ${CART_CTA_HEIGHT})`,
              md: 0,
            },
          }}
        >
          <ErrorBoundary fallback={<ErrorMessage />}>
            <Suspense fallback={<ProductListSkeleton />}>
              <ProductList />
            </Suspense>
          </ErrorBoundary>
        </Box>
        <Cart />
      </Stack>
    </>
  );
};

export default MainPage;
