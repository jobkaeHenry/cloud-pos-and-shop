import CartList from "./Components/CartList";
import CartAdjustPannel from "./Components/CartAdjustPannel";
import CartCTAPannel from "./Components/CartCTAPannel";

const Cart = () => {
  return (
    <>
      {/* 상단 컨트롤패널 */}
      <CartAdjustPannel />
      {/* 카트 리스트 */}
      <CartList />
      {/* 최종 */}
      <CartCTAPannel />
    </>
  );
};

export default Cart;
