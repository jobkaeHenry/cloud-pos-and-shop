"use server";

import getCouponLIst from "@/feature/store/api/getCouponLIst";
import StorePage from "@/feature/store/components/StorePage";

const Page = async ({ params }: { params: { shopName: string } }) => {
  const initialData = await getCouponLIst(params.shopName);
  return <StorePage initialData={initialData} />;
};

export default Page;
