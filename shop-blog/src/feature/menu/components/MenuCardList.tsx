"use client";

import React, { useContext, useEffect, useState } from "react";
import MenuCard from "./MenuCard";
import { Products } from "../interface/Products";
import { Grid } from "@mui/material";
import getMenuList from "../api/getMenuList";
import ShopInfoContext from "@/context/ShopInfoContext";

type Props = {
  initialData?: Products;
};

const MenuCardList = ({ initialData }: Props) => {
  const [menuData, setMenuData] = useState<Products>(initialData ?? []);
  const { shopName } = useContext(ShopInfoContext);

  useEffect(() => {
    if (initialData) return;
    const initialDataList = async () => {
      const data = await getMenuList(shopName ?? "");
      setMenuData(data);
    };
    initialDataList();
  }, []);

  return (
    <Grid container spacing={2} my={2}>
      {menuData.map((menu, i) => (
        <Grid item xs={12} sm={6} lg={3} key={i}>
          <MenuCard data={menu} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MenuCardList;
