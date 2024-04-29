// import CouponElem from "./CouponElem";
import useGetCouponQuery from "./api/useCouponQuery";
import { useRecoilState } from "recoil";
import { selectedCouponAtom } from "../../recoil/Coupon/Atom/selectedCouponAtom";
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Select,
  Stack,
} from "@mui/material";
import CouponCard from "./components/CouponCard";
import { useEffect } from "react";

const CouponList = () => {
  const { data } = useGetCouponQuery();
  const [selectedValue, setSelectedCoupon] = useRecoilState(selectedCouponAtom);
  useEffect(() => setSelectedCoupon(data[0]), []);
  return (
    <RadioGroup>
      <Stack gap={2}>
        {data.map((data) => {
          const isSelectedCoupon =
            selectedValue && String(selectedValue.id) === String(data.id);
          return (
            <FormControlLabel
              key={data.id}
              label={<CouponCard id={data.id} {...data} />}
              componentsProps={{
                typography: { sx: { display: "block", minWidth: "300px" } },
              }}
              control={
                <Radio
                  onChange={() => setSelectedCoupon(data)}
                  checked={!!isSelectedCoupon}
                />
              }
            />
          );
        })}
      </Stack>
    </RadioGroup>
  );
};

export default CouponList;
