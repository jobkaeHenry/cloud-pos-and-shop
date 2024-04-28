import { Button, Stack } from "@mui/material";
import useMultistepForm from "../../hooks/useMultistepForm";
import CouponModal from "../Coupon/CouponModal";
import ReceiptModal from "./ReceiptModal";

const PurchaseMultiStepForm = () => {
  const { MultistepForm, next, isLastStep } = useMultistepForm(
    [<CouponModal />, <ReceiptModal />],
    0
  );
  return (
    <Stack gap={4} minWidth={"280px"} alignItems={"center"}>
      {MultistepForm}
      {!isLastStep && (
        <Button fullWidth onClick={next}>
          결제
        </Button>
      )}
    </Stack>
  );
};

export default PurchaseMultiStepForm;
