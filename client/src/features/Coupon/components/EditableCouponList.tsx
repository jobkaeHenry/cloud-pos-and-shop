import useGetCouponQuery from "../api/useCouponQuery";
import EditableCouponCard from "./EditableCouponCard";

const CouponCardList = () => {
  const { data: coupons } = useGetCouponQuery();

  return (
    <>
      {coupons.map(({ title, amount, type, id }) => (
        <EditableCouponCard
          title={title}
          amount={String(amount)}
          type={type}
          id={String(id)}
          key={id}
        />
      ))}
    </>
  );
};

export default CouponCardList;
