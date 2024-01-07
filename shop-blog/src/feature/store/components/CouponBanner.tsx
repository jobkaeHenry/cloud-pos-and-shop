import React from "react";
import { Coupon } from "../interface/Coupons";
import { Card, Stack, Box, Typography } from "@mui/material";
import ParsePrice from "@/utils/ParsePrice";

const CouponBanner = ({ title, amount, type }: Omit<Coupon, "id">) => {
  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Stack p={2} gap={2} borderRadius={2} textAlign={"left"}>
        <Typography variant="h4" fontWeight="bold" color="secondary.main">
          {`${ParsePrice(amount, type)} `}
        </Typography>
        <Stack>
          <Typography variant="h6" fontWeight="medium">
            {title}
          </Typography>
          <Typography color="text.secondary">{`"${title}" ${ParsePrice(
            amount,
            type
          )} 할인 행사입니다`}</Typography>
        </Stack>
      </Stack>
      <Box width={50} bgcolor={"secondary.main"} />
    </Card>
  );
};

export default CouponBanner;
