"use client";
import Image from "next/image";
import Logo from "@/assets/images/favicon.png";
import Link from "next/link";
import { Stack, Paper, Typography, Divider, Container } from "@mui/material";
import ShopInfoContext from "@/context/ShopInfoContext";
import { useContext } from "react";

const Footer = () => {
  const { shopAddress, contact, shopLogo, shopName } =
    useContext(ShopInfoContext);

  return (
    <Paper component="footer" sx={{ mt: 2 }}>
      <Container maxWidth={"xl"}>
        <Stack gap={2} p={2}>
          <Stack justifyContent={"center"}>
            {shopLogo ? (
              <Image height={36} src={shopLogo} alt={`${shopName}의 로고`} />
            ) : (
              <Typography
                color="primary.main"
                textAlign={"center"}
                fontWeight="bold"
                variant="h6"
              >
                {shopName}
              </Typography>
            )}
            <Typography textAlign="center" variant="subtitle2">
              {shopName && `| 상호명 : ${shopName} `}
              {shopAddress && `| 주소 : ${shopAddress} `}
              {contact && `| 연락처 : ${contact} `}
            </Typography>
            <Typography
              textAlign="center"
              variant="subtitle2"
            >{`COPYRIGHT (C) ${shopName} ALL RIGHTS RESERVED.`}</Typography>
          </Stack>

          <Divider />

          <Link href={"https://www.youtube.com/@jobkaeHenry"}>
            <Stack gap={2} direction={"row"}>
              <Image height={18} src={Logo} alt="로고" />
              <Typography variant="subtitle2" color={"GrayText"}>
                Powered by JobkaeHenry
              </Typography>
            </Stack>
          </Link>
        </Stack>
      </Container>
    </Paper>
  );
};

export default Footer;
