import CustomAppBar from "@/Components/CustomAppBar";
import Footer from "@/Components/Footer";
import ShopContextProvider from "@/Components/ShopContextProvider";
import CustomThemeProvider from "@/Components/ThemeProvider";
import { APP_BAR_HEIGHT } from "@/const/UISizes";
import getShopInfo from "@/feature/theme/api/getShopInfo";
import getThemeOption from "@/feature/theme/utils/getThemeOption";
import { Paper } from "@mui/material";
import { Container, Stack } from "@mui/system";
import { isAxiosError } from "axios";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  params: { shopName: string };
};

type MetadataProps = {
  params: { shopName: string };
};
export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const domain = params.shopName;
  const { shopName, contact, shopAddress } = await getShopInfo(domain);

  return {
    title: `${shopName}`,
    description: `${shopName} 의 메뉴,행사 등을 알아보세요`,
    keywords: [
      `${shopName} ${contact ? `연락처: ${contact}` : ""}`,
      `${shopName} ${shopAddress ? `주소: ${shopAddress}` : ""}`,
      `${shopName} 메뉴`,
      `${shopName} 행사`,
      `${shopName} 이벤트`,
    ],
  };
}

const ShopPageLayout = async ({ children, params }: Props) => {
  const { shopName: shopDomain } = params;
  try {
    const shopData = await getShopInfo(shopDomain);

    const { primaryColor, secondaryColor } = shopData;
    const themeOptions = getThemeOption({ primaryColor, secondaryColor });

    return (
      <CustomThemeProvider themeOptions={themeOptions}>
        <ShopContextProvider shopData={shopData}>
          <CustomAppBar />
          <Stack px={{ xs: 0, md: 4 }} mt={APP_BAR_HEIGHT}>
            <Paper
              sx={{
                p: { xs: 0, md: 2 },
                minHeight: `calc(100vh - ${APP_BAR_HEIGHT})`,
              }}
            >
              <Container maxWidth={"xl"}>{children}</Container>
            </Paper>
          </Stack>
          <Footer />
        </ShopContextProvider>
      </CustomThemeProvider>
    );
  } catch (err) {
    if (isAxiosError(err) && err.response) {
      if (err.response.status === 404) {
        return notFound();
      } else throw err;
    }
  }
};

export default ShopPageLayout;
