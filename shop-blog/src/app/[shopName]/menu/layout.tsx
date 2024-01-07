import { ReactNode } from "react";
import { Metadata, ResolvingMetadata } from "next";
import axios from "@/libs/api/axios";
import { Products } from "@/feature/menu/interface/Products";
import { GET_MENU_LIST } from "@/const/serverPath";

type MetadataProps = {
  params: { shopName: string };
};
export async function generateMetadata(
  { params }: MetadataProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const domain = params.shopName;
  const shopName = (await parent).title?.absolute;
  const { data } = await axios.get<Products>(GET_MENU_LIST(domain));

  return {
    title: `${shopName} | 메뉴`,
    description: `${shopName}의 맛있는 메뉴를 살펴보세요`,
    keywords: data.map(
      ({ title, price }) =>
        `${shopName} ${price}원 ${title},${shopName} ${title}`
    ),
  };
}

type MenuPageLayoutProps = {
  children: ReactNode;
};
const MenuPageLayout = async ({ children }: MenuPageLayoutProps) => {
  return <>{children}</>;
};

export default MenuPageLayout;
