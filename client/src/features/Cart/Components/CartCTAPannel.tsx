import { useRecoilValue } from "recoil";
// import { ColumnWrapper } from "../../../layouts/Wrapper";
import {
  PriceToPurchaseSelector,
  TotalQuantitySelector,
} from "../../../recoil/Cart/Selector/CartSelector";
// import { DiscountablePriceSelector } from "../../../recoil/Coupon/Selector/DiscountablePriceSelector";
import useModal from "../../../hooks/useModal";
import RecieptModal from "../../Purchase/ReceiptModal";
import { Button, Stack, Typography } from "@mui/material";
import { CART_CTA_HEIGHT, DRAWER_WIDTH } from "../../../const/UiSize";

const CartCTAPannel = () => {
  const totalQuantity = useRecoilValue(TotalQuantitySelector); // 총 아이템갯수
  const hasItems = totalQuantity === 0; // 장바구니에 아이템이 담겨있는지 여부
  // const discountablePrice = useRecoilValue(DiscountablePriceSelector); // 할인 가능한 가격
  const priceToPurchase = useRecoilValue(PriceToPurchaseSelector); // 총 결제금액
  const { openModal } = useModal();

  return (
    <Stack
      gap={2}
      p={1}
      direction={"row"}
      borderTop={"1px solid"}
      borderColor={"grey.200"}
      bgcolor={"background.paper"}
      position={"fixed"}
      alignItems={"center"}
      justifyContent={"end"}
      bottom={0}
      right={0}
      width={{ xs: "100%", md: DRAWER_WIDTH }}
      height={CART_CTA_HEIGHT}
    >
      <Stack direction={"row"} gap={1} alignItems={"center"}>
        <Typography variant="label" fontWeight={"bold"} color={"grey.600"}>
          합계
        </Typography>
        <Typography component="span" variant="subtitle1" fontWeight={700}>
          &#8361; {priceToPurchase.toLocaleString()}
        </Typography>
      </Stack>

      <Button onClick={() => openModal(<RecieptModal />)} disabled={hasItems}>
        {`총 ${totalQuantity}개 구매`}
      </Button>
    </Stack>
  );
};

export default CartCTAPannel;
