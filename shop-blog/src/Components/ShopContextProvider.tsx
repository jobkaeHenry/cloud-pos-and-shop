'use client'
import ShopInfoContext from "@/context/ShopInfoContext";
import ShopSettingInterface from "@/feature/theme/interface/ShopSettingInterface";
import React, { ReactNode } from "react";

interface ShopContextProviderProps {
  shopData: Partial<ShopSettingInterface>;
  children?: ReactNode | ReactNode[];
}

const ShopContextProvider = ({
  children,
  shopData,
}: ShopContextProviderProps) => {
  return (
    <ShopInfoContext.Provider value={shopData}>
      {children}
    </ShopInfoContext.Provider>
  );
};

export default ShopContextProvider;
