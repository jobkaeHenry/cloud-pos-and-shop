"use client";
import SectionTitle from "@/Components/SectionTitle";
import restaurantImage from "@/assets/images/restaurant2.jpg";
import ShopInfoContext from "@/context/ShopInfoContext";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useContext } from "react";
import CouponList from "./CouponList";
import { Coupons } from "../interface/Coupons";
import { sanitize } from 'isomorphic-dompurify';

const StorePage = ({ initialData }: { initialData?: Coupons }) => {
  const { shopAddress, description, contact, shopName } =
    useContext(ShopInfoContext);

  return (
    <Stack gap={2} textAlign={"center"} mb={4}>
      <Image
        src={restaurantImage}
        height={300}
        alt="restaurnat-image"
        style={{ objectFit: "cover", width: "100%" }}
        priority
      />
      <SectionTitle>매장 안내</SectionTitle>
      <Typography variant="h4">{shopName}</Typography>
      {description && <Box dangerouslySetInnerHTML={{ __html: sanitize(description) }} />}
      {shopAddress && <Typography> 오시는 길 : {shopAddress}</Typography>}
      {contact && <Typography>연락처 : {contact}</Typography>}
      <SectionTitle>진행중인 행사</SectionTitle>
      <CouponList initialData={initialData} />
    </Stack>
  );
};

export default StorePage;
