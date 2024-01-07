import axios from "@/libs/api/axios";

import { Products } from "../interface/Products";
import { GET_MENU_LIST } from "@/const/serverPath";

const getMenuList = async (shopDomain: string) => {
  const { data } = await axios.get<Products>(GET_MENU_LIST(shopDomain));
  const sortedData = data.sort((a, b) =>
    a.category.title.localeCompare(b.category.title)
  );
  return sortedData;
};

export default getMenuList;
