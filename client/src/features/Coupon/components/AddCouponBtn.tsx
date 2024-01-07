import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import { Stack, Typography } from "@mui/material";
import { CouponWrapper } from "./CouponCard";
import { useCallback, useState } from "react";
import CouponCardEditor, { CouponData } from "./CouponCardEditor";
import useCreateCouponMutation from "../api/useCreateCouponMutation";

const AddCouponBtn = () => {
  const [isAddingCoupon, setIsAddingCoupon] = useState(false);
  const { mutateAsync: createCoupon } = useCreateCouponMutation();

  const submitHandler = useCallback(async (data: CouponData) => {
    await createCoupon(data);
    setIsAddingCoupon(false);
  }, []);

  return isAddingCoupon ? (
    <CouponCardEditor
      onSubmit={submitHandler}
      onCancel={() => setIsAddingCoupon(false)}
    />
  ) : (
    <CouponWrapper>
      <Stack
        onClick={() => setIsAddingCoupon(true)}
        component={"button"}
        alignItems={"center"}
        justifyContent={"center"}
        width={"100%"}
        gap={1}
        color={"text.secondary"}
      >
        <LocalActivityIcon />
        <Typography>쿠폰 추가하기</Typography>
      </Stack>
    </CouponWrapper>
  );
};

export default AddCouponBtn;
