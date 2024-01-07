import { GET_SHOP_SETTING } from "@/const/serverPath";
import axios from "@/libs/api/axios";
import ShopSettingInterface from "../interface/ShopSettingInterface";

const getShopInfo = async (shopDomain: string) => {
  const { data } = await axios.get<ShopSettingInterface>(
    GET_SHOP_SETTING(shopDomain)
  );
  return data;
};

export default getShopInfo;
