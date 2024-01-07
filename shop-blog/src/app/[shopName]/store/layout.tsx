import { ReactNode } from "react";
import { Metadata, ResolvingMetadata } from "next";

type MetadataProps = {
  params: { shopName: string };
};
export async function generateMetadata(
  _: MetadataProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const shopName = (await parent).title?.absolute;
  return {
    title: `${shopName} | 매장안내`,
    description: `${shopName} 매장 안내입니다`,
  };
}

type StorePageLayoutProps = {
  children: ReactNode;
};
const StorePageLayout = async ({ children }: StorePageLayoutProps) => {
  return <>{children}</>;
};

export default StorePageLayout;