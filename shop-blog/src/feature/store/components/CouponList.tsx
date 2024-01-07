"use client";

import { useContext, useEffect, useState } from "react";

import ShopInfoContext from "@/context/ShopInfoContext";
import CouponBanner from "./CouponBanner";
import { Coupons } from "../interface/Coupons";
import getCouponLIst from "../api/getCouponLIst";

type Props = {
  initialData?: Coupons;
};

const CouponList = ({ initialData }: Props) => {
  const [CouponData, setCouponData] = useState<Coupons>(initialData ?? []);
  const { shopName } = useContext(ShopInfoContext);

  useEffect(() => {
    if (initialData) return;
    const initialDataList = async () => {
      const data = await getCouponLIst(shopName ?? "");
      setCouponData(data);
    };
    initialDataList();
  }, []);

  return (
    <>
      {CouponData.map(({ title, amount, type }, i) => (
        <CouponBanner title={title} amount={amount} type={type} key={i} />
      ))}
    </>
  );
};

export default CouponList;
