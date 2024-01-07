import {
  Button,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { CouponTypeRightBar, CouponWrapper } from "./CouponCard";
import ValidatePositiveIntiger from "../utils/ValidateCorrectValue";

interface CouponCardEditorInterface extends CouponData {
  onChange?: (newValue: CouponData) => void;
  onCancel?: () => void;
  onSubmit?: (newValue: CouponData) => void;
}

export interface CouponData {
  title?: string;
  amount?: string;
  type?: "rate" | "amount";
  id?: string;
}

const CouponCardEditor = ({
  title = "",
  amount = "",
  type = "rate",
  onChange,
  onSubmit,
  onCancel,
}: CouponCardEditorInterface) => {
  const [couponData, setCouponData] = useState<CouponData>({
    title,
    amount,
    type,
  });
  const changeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setCouponData((prev) => {
        if (
          event.target.type === "number" &&
          event.target.value !== "" &&
          ValidatePositiveIntiger(event.target.value)
        ) {
          return prev;
        }
        return {
          ...prev,
          [event.target.name]: event.target.value,
        };
      });
    },
    []
  );

  useEffect(() => {
    onChange && onChange(couponData);
  }, []);

  return (
    <CouponWrapper>
      <Stack
        component={"form"}
        direction="column"
        justifyContent="space-between"
        p={2}
        gap={1}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit && onSubmit(couponData);
        }}
      >
        <Stack direction={"row"} gap={1}>
          {/* 쿠폰 종류 */}
          <ToggleButtonGroup
            size="small"
            sx={{ flexShrink: "0" }}
            onChange={(_, val) => {
              if (val !== null) {
                setCouponData((prev) => ({ ...prev, type: val }));
              }
            }}
            exclusive
            value={couponData.type}
          >
            <ToggleButton value={"rate"}>비율 할인</ToggleButton>
            <ToggleButton value={"amount"}>금액 할인</ToggleButton>
          </ToggleButtonGroup>
          {/* 금액 / 비율 */}
          <TextField
            label={couponData.type === "rate" ? "할인률" : "할인 금액"}
            value={couponData.amount}
            onChange={changeHandler}
            name="amount"
            size="small"
            type="number"
            InputProps={{
              endAdornment: <>{couponData.type === "amount" ? "원" : "%"}</>,
            }}
            error={
              couponData.amount
                ? couponData.type === "amount"
                  ? ValidatePositiveIntiger(couponData.amount)
                  : Number(couponData.amount) > 100 ||
                    Number(couponData.amount) < 0
                : undefined
            }
            required
          />
        </Stack>
        {/* 쿠폰명 */}
        <TextField
          value={couponData.title}
          size="small"
          label="쿠폰명"
          type="text"
          name="title"
          onChange={changeHandler}
          required
        />
        {/* 제출 */}
        <Stack direction={"row"} gap={1}>
          {onCancel && (
            <Button
              fullWidth
              size="small"
              variant="outlined"
              onClick={() => onCancel && onCancel()}
            >
              취소
            </Button>
          )}
          <Button fullWidth size="small" color="primary" type="submit">
            완료
          </Button>
        </Stack>
      </Stack>
      <CouponTypeRightBar type={couponData.type} />
    </CouponWrapper>
  );
};

export default CouponCardEditor;
