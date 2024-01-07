import { Button, Stack, Typography } from "@mui/material";
import { Coupon } from "../../../types/Coupons";
import ParsePrice from "../utils/ParsePrice";
import { ReactNode } from "react";

type CouponCardInterface = {
  onDelete?: (id: number) => void;
  onEdit?: () => void;
} & Coupon;

const CouponCard = ({
  title,
  id,
  amount,
  type,
  onDelete,
  onEdit,
}: CouponCardInterface) => {
  return (
    <CouponWrapper>
      <Stack direction="column" justifyContent="space-between" p={2}>
        <Typography variant="h2" fontWeight={"bold"} color="primary">
          {ParsePrice(amount, type)}
        </Typography>
        <Stack>
          <Typography variant="subtitle2">{title}</Typography>
          <Typography>{`${ParsePrice(amount, type)} 할인`}</Typography>
        </Stack>
        {(onDelete || onEdit) && (
          <Stack direction={"row"} gap={1}>
            <Button
              size="small"
              variant="outlined"
              color="error"
              onClick={() => onDelete && onDelete(id)}
            >
              삭제
            </Button>
            <Button
              size="small"
              color="primary"
              onClick={() => onEdit && onEdit()}
            >
              수정
            </Button>
          </Stack>
        )}
      </Stack>
      <CouponTypeRightBar type={type} />
    </CouponWrapper>
  );
};

export const CouponWrapper = ({ children }: { children?: ReactNode }) => (
  <Stack
    borderRadius={2}
    border={"1px solid"}
    borderColor={"text.disabled"}
    overflow="hidden"
    direction="row"
    justifyContent={"space-between"}
    maxWidth={320}
    width={"100%"}
    height={180}
  >
    {children}
  </Stack>
);

export const CouponTypeRightBar = ({ type }: { type: Coupon["type"] }) => (
  <Stack
    bgcolor={"primary.main"}
    justifyContent={"center"}
    alignItems={"center"}
    width={30}
    height={"100%"}
  >
    <Typography
      sx={{ writingMode: "vertical-rl" }}
      color="white"
      fontWeight="bold"
      variant="subtitle1"
      letterSpacing={3}
    >
      {type?.toUpperCase()}
    </Typography>
  </Stack>
);

export default CouponCard;
