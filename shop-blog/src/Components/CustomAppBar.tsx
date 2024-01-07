"use client";

import ShopInfoContext from "@/context/ShopInfoContext";
import useGetStoreName from "@/hooks/useGetStoreName";
import {
  AppBar,
  Container,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";

const CustomAppBar = () => {
  const shopDomain = useGetStoreName();
  const currentPath = usePathname();

  const { shopLogo, shopName } = useContext(ShopInfoContext);

  const GNBList = [
    { title: "Menu", href: `/${shopDomain}/menu` },
    { title: "Store", href: `/${shopDomain}/store` },
  ];

  return (
    <AppBar>
      <Toolbar>
        {/* <Box > */}
        <Container
          maxWidth={"xl"}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link href={`/${shopDomain}`}>
            {shopLogo ? (
              <Image height={36} src={shopLogo} alt={`${shopName}의 로고`} />
            ) : (
              <Typography variant="h6" fontWeight={"bold"} color="primary.main">
                {shopName}
              </Typography>
            )}
          </Link>
          <List
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            {GNBList.map(({ title, href }, i) => (
              <ListItem
                sx={
                  currentPath === href
                    ? { color: "primary.main", fontWeight: "bold" }
                    : undefined
                }
                key={i}
              >
                <Link href={href}>{title}</Link>
              </ListItem>
            ))}
          </List>
        </Container>
        {/* </Box> */}
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
