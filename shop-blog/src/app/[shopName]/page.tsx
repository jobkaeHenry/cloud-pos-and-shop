"use server";
import getMenuList from "@/feature/menu/api/getMenuList";
import MenuPage from "@/feature/menu/components/MenuPage";
import getCouponLIst from "@/feature/store/api/getCouponLIst";
import StorePage from "@/feature/store/components/StorePage";

const ShopMainPage = async ({ params }: { params: { shopName: string } }) => {
  const initialCouponData = await getCouponLIst(params.shopName);
  const initialMenuData = await getMenuList(params.shopName);
  return (
    <>
      <StorePage initialData={initialCouponData}/>
      <MenuPage initialData={initialMenuData}/>
    </>
  );
};

export default ShopMainPage;
