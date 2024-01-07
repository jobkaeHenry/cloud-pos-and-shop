import { useCallback, useEffect } from "react";
import RowWrapper, { ColumnWrapper } from "../../../layouts/Wrapper";
import ParsePrice from "../../Coupon/utils/ParsePrice";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { SelectedItemAtom } from "../../../recoil/Cart/Atom/CartAtom";
import { selectedCouponAtom } from "../../../recoil/Coupon/Atom/selectedCouponAtom";
import { TotalQuantitySelector } from "../../../recoil/Cart/Selector/CartSelector";
import CouponModal from "../../Coupon/CouponModal";
import useModal from "../../../hooks/useModal";
import useCart from "../hooks/useCart";
import { usePrefetchCouponQuery } from "../../Coupon/api/useCouponQuery";
import { Button } from "@mui/material";

const CartAdjustPannel = () => {
  const selectedItemId = useRecoilValue(SelectedItemAtom); // 현재 유저가 선택한 아이템 ID
  const selectedCoupon = useRecoilValue(selectedCouponAtom); // 현재 유저가 선택한 쿠폰
  const totalQuantity = useRecoilValue(TotalQuantitySelector); // 총 아이템갯수
  const hasItems = totalQuantity === 0; // 장바구니에 아이템이 담겨있는지 여부
  const setSelectedCoupon = useSetRecoilState(selectedCouponAtom);

  useEffect(() => {
    if (totalQuantity === 0) {
      // 장바구니에 아무것도 담겨있지않을 경우, 쿠폰 적용을 제외
      setSelectedCoupon("");
    }
  }, [totalQuantity, setSelectedCoupon]);

  const { changeQuantity } = useCart();

  const { openModal } = useModal();

  const plusQuantity = useCallback(
    () => changeQuantity(selectedItemId, (prev) => prev + 1),
    [selectedItemId, changeQuantity]
  );

  const minusQuantity = useCallback(() => {
    changeQuantity(selectedItemId, (prev) => (prev > 1 ? prev - 1 : 1));
  }, [selectedItemId, changeQuantity]);

  const prefetchCoupon = usePrefetchCouponQuery(); // 패널에 마우스를 올릴 시 할인을 적용할 가능성이 있다고 보고 쿠폰을 미리 패치

  return (
    <ColumnWrapper
      gap={2}
      className="p-2 h-[100px] fixed top-[50vh] w-full sm:top-[60px] sm:w-[320px] bg-white border-y border-y-gray-300 sm:border-t-0 z-10"
      onMouseOver={prefetchCoupon}
    >
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-grow-1">
          {selectedCoupon
            ? `${ParsePrice(selectedCoupon.amount, selectedCoupon.type)} 할인`
            : ""}
        </div>
        <Button
          disabled={hasItems}
          variant="outlined"
          size="small"
          className="w-fit"
          onClick={() => openModal(<CouponModal />)}
        >
          쿠폰적용하기
        </Button>
      </div>
      <RowWrapper gap={2}>
        <Button
          disabled={!selectedItemId}
          size="small"
          fullWidth
          variant="outlined"
          onClick={minusQuantity}
        >
          -
        </Button>
        <Button
          disabled={!selectedItemId}
          size="small"
          fullWidth
          variant="outlined"
          onClick={plusQuantity}
        >
          +
        </Button>
      </RowWrapper>
    </ColumnWrapper>
  );
};

export default CartAdjustPannel;
