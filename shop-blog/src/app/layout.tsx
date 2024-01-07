import type { Metadata } from "next";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

interface RootLayoutInterface {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Powered By JobkaeHenry",
  description: "Powered By JobkaeHenry",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({ children }: RootLayoutInterface) {
  return (
    <html lang="kr">
      <body>
        <AppRouterCacheProvider key={"mui"}>{children}</AppRouterCacheProvider>
      </body>
    </html>
  );
}
