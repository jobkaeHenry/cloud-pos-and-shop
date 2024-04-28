import { useRecoilValue } from "recoil";
import { CartAtom } from "../../../recoil/Cart/Atom/CartAtom";
import CartElem from "./CartElem";
import { AnimatePresence } from "framer-motion";

const CartList = () => {
  const cartItems = useRecoilValue(CartAtom);

  return (
    <AnimatePresence mode="popLayout">
      {cartItems.map((cartItem) => (
        <CartElem data={cartItem} key={cartItem.cartId} />
      ))}
    </AnimatePresence>
  );
};

export default CartList;
