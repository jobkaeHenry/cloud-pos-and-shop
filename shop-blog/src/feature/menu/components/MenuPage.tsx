"use client";

import SectionTitle from "@/Components/SectionTitle";
import restaurantImage from "@/assets/images/restaurant1.jpg";
import MenuCardList from "@/feature/menu/components/MenuCardList";
import { Products } from "@/feature/menu/interface/Products";
import { Stack } from "@mui/material";
import Image from "next/image";

interface ManuPageInterface {
  initialData: Products;
}

const MenuPage = ({ initialData }: ManuPageInterface) => {
  return (
    <Stack gap={2}>
      <Image
        src={restaurantImage}
        height={300}
        alt="restaurnat-image"
        style={{ objectFit: "cover", width: "100%" }}
        priority
      />
      <SectionTitle>메뉴 안내</SectionTitle>
      <MenuCardList initialData={initialData} />
    </Stack>
  );
};

export default MenuPage;
