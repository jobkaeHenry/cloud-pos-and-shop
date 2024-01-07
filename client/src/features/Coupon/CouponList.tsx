import CouponElem from "./CouponElem";
import useGetCouponQuery from "./api/useCouponQuery";
import { useRecoilState } from "recoil";
import { selectedCouponAtom } from "../../recoil/Coupon/Atom/selectedCouponAtom";

const CouponList = () => {
  const { data } = useGetCouponQuery();
  const [selectedValue, setSelectedCoupon] = useRecoilState(selectedCouponAtom);

  return (
    <select
      onChange={(e) => {
        if (e.target.value) {
          setSelectedCoupon(JSON.parse(e.target.value));
        } else setSelectedCoupon("");
      }}
      value={selectedValue && JSON.stringify(selectedValue)}
    >
      <option value={""}>선택안함</option>
      {data.map((coupon) => (
        <CouponElem data={coupon} key={coupon.id} />
      ))}
    </select>
  );
};

export default CouponList;
