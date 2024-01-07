"use client";

import ShopSettingInterface from "@/feature/theme/interface/ShopSettingInterface";
import { createContext } from "react";

const ShopInfoContext = createContext<Partial<ShopSettingInterface>>({});

export default ShopInfoContext;
