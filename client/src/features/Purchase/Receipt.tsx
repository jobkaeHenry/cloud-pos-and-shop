import { ColumnWrapper } from "../../layouts/Wrapper";
import { useRecoilValue } from "recoil";
import { CartAtom } from "../../recoil/Cart/Atom/CartAtom";
import { PriceToPurchaseSelector } from "../../recoil/Cart/Selector/CartSelector";
import { DiscountablePriceSelector } from "../../recoil/Coupon/Selector/DiscountablePriceSelector";
import { CartElemDetail } from "../Cart/Components/CartElem";

const Receipt = () => {
  const cartItems = useRecoilValue(CartAtom);
  const priceToPurchase = useRecoilValue(PriceToPurchaseSelector); // 총 결제금액
  const discountablePrice = useRecoilValue(DiscountablePriceSelector); // 할인 가능한 가격

  return (
    <ColumnWrapper
      gap={4}
      className="h-fit max-h-[70vh] overflow-y-auto p-8 border border-gray-400"
    >
      <span className="text-2xl font-bold text-center">주문내역</span>
      <ul className="w-[320px] flex flex-col gap-9 mt-4">
        {cartItems.map((cartItem) => (
          <li key={cartItem.cartId}>
            <CartElemDetail data={cartItem} />
          </li>
        ))}
      </ul>
      <hr />
      {discountablePrice > 0 && (
        <div className="flex flex-row justify-between items-center w-full">
          <span className="text-lg font-bold">금액 할인</span>
          <span className="text-lg font-bold">{`${discountablePrice.toLocaleString()} 원`}</span>
        </div>
      )}
      <span className="text-2xl font-bold text-right">{`합계 ${priceToPurchase.toLocaleString()}원`}</span>
    </ColumnWrapper>
  );
};

export default Receipt;
