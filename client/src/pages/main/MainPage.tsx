import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ProductList from "../../features/ProductList/ProductList";
import Cart from "../../features/Cart/Cart";
import ErrorMessage from "../../components/Loading/Message";
import ProductListSkeleton from "../../features/ProductList/ProductListSkeleton";
import useInitialCartItems from "../../hooks/useInitialCartItems";
import Navbar from "./../../components/Atom/Navbar";

const MainPage = () => {
  useInitialCartItems(); // 로컬스토리지에 아이템이 있다면 불러올 지 여부를 물음
  return (
    <>
      <Navbar />
      <div className="w-full flex flex-col fixed top-[60px] bottom-0 sm:flex-row">
        <main className="w-full overflow-y-auto bg-gray-50">
          <ErrorBoundary fallback={<ErrorMessage />}>
            <Suspense fallback={<ProductListSkeleton />}>
              <ProductList />
            </Suspense>
          </ErrorBoundary>
        </main>
        <aside className="min-w-[320px] min-h-[50vh] max-h-[50vh] sm:max-h-full overflow-y-auto">
          <Cart />
        </aside>
      </div>
    </>
  );
};

export default MainPage;
