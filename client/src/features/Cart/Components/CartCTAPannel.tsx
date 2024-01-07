import { useRecoilValue } from "recoil";
import { ColumnWrapper } from "../../../layouts/Wrapper";
import {
  PriceToPurchaseSelector,
  TotalQuantitySelector,
} from "../../../recoil/Cart/Selector/CartSelector";
import { DiscountablePriceSelector } from "../../../recoil/Coupon/Selector/DiscountablePriceSelector";
import useModal from "../../../hooks/useModal";
import RecieptModal from "../../Purchase/ReceiptModal";
import { Button } from "@mui/material";

const CartCTAPannel = () => {
  const totalQuantity = useRecoilValue(TotalQuantitySelector); // 총 아이템갯수
  const hasItems = totalQuantity === 0; // 장바구니에 아이템이 담겨있는지 여부
  const discountablePrice = useRecoilValue(DiscountablePriceSelector); // 할인 가능한 가격
  const priceToPurchase = useRecoilValue(PriceToPurchaseSelector); // 총 결제금액
  const { openModal } = useModal();

  return (
    <ColumnWrapper
      className="p-2 fixed w-full bottom-0 sm:w-[320px] items-end bg-white border-t border-t-gray-300"
      gap={2}
    >
      <span className="text-xl">
        총 <span className="font-bold">{totalQuantity}</span> 개
      </span>
      {discountablePrice > 0 && (
        <div className="flex flex-row justify-between items-center w-full">
          <span className="text-lg">금액 할인</span>
          <span className="text-lg font-bold">{`${discountablePrice.toLocaleString()} 원`}</span>
        </div>
      )}
      <Button
        onClick={() => openModal(<RecieptModal />)}
        fullWidth
        disabled={hasItems}
      >{`${priceToPurchase.toLocaleString()}원 결제`}</Button>
    </ColumnWrapper>
  );
};

export default CartCTAPannel;
