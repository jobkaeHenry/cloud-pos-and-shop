import { ColumnWrapper } from "../../layouts/Wrapper";
import useModal from "../../hooks/useModal";
import useResetStatus from "./hooks/useResetStatus";
import Receipt from "./Receipt";
import CompleteLottie from "../../components/Loading/CompleteLottie";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@mui/material";
import { useRecoilValue } from "recoil";
import { CartItemToOrderDto } from "../../recoil/Cart/Selector/CartSelector";
import { selectedCouponAtom } from "../../recoil/Coupon/Atom/selectedCouponAtom";
import useCreateOrderMutation from "./apis/useCreateOrderMutation";
import { Order } from "../../types/Orders";
import getPriceToPurchase from "../../utils/getPriceToPurchase";
import getDiscountedPriceByCoupon from "../../utils/getDiscountedPriceByCoupon";
import ErrorMessage from "../../components/Loading/Message";

const RecieptModal = () => {
  const { closeModal } = useModal();
  const resetStatus = useResetStatus();
  const [isLottieCompleted, setIsLottieCompleted] = useState(false); //Lottie가 로딩완료됬는지 여부

  const [orderedItem, setOrderedItem] = useState<Order>();

  const { mutateAsync, isError, isSuccess } = useCreateOrderMutation({
    onSuccess: (data) => {
      resetStatus();
      setOrderedItem(data);
    },
  });

  const orderedItems = useRecoilValue(CartItemToOrderDto);
  const coupon = useRecoilValue(selectedCouponAtom);

  useEffect(() => {
    mutateAsync({
      couponId: coupon === "" ? undefined : coupon.id,
      orderedItems: orderedItems,
    });
  }, []);

  const totalPrice = (orderedItem?.orderedItems ?? []).reduce(
    (acc, { price, quantity, option }) =>
      acc +
      (price + option.reduce((acc, { price }) => acc + price, 0)) * quantity,
    0
  );
  const discountablePrice = getDiscountedPriceByCoupon({
    coupon: orderedItem?.coupon ?? "",
    totalPrice: totalPrice,
  });
  const priceToPurchase = getPriceToPurchase({ totalPrice, discountablePrice });

  return (
    <>
      <AnimatePresence mode={"popLayout"}>
        {isLottieCompleted && isSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            layout
          >
            <ColumnWrapper gap={4}>
              <Receipt
                items={orderedItem.orderedItems}
                priceToPurchase={priceToPurchase}
                discountablePrice={discountablePrice}
              />
              <Button
                onClick={closeModal}
                variant="outlined"
                color="inherit"
                sx={{ color: "text.secondary" }}
              >
                확인 후 닫기
              </Button>
            </ColumnWrapper>
          </motion.div>
        )}

        {!isLottieCompleted && !isError && (
          <>
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                style={{ width: 200, height: 200 }}
                layout
              >
                <CompleteLottie onComplete={() => setIsLottieCompleted(true)} />
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </AnimatePresence>
      {isError && (
        <div>
          <ErrorMessage />
        </div>
      )}
    </>
  );
};

export default RecieptModal;
