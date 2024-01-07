"use server";
import React from "react";
import MenuPage from "../../../feature/menu/components/MenuPage";
import getMenuList from "@/feature/menu/api/getMenuList";

const page = async ({ params }: { params: { shopName: string } }) => {
  const initialData = await getMenuList(params.shopName);

  return <MenuPage initialData={initialData} />;
};

export default page;
