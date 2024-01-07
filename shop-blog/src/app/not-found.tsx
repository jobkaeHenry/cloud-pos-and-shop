"use client";
import { Typography, Container, Stack } from "@mui/material";
import Image from "next/image";

import Logo from "@/assets/images/favicon.png";

const NotFoundPage = () => {
  return (
    <Container maxWidth="sm">
      <Stack alignItems="center" justifyContent="center" minHeight="100vh">
        <Image
          src={Logo}
          alt={"로고"}
          height={30}
          style={{ margin: "0 auto" }}
        />
        <Typography mt={4} variant="h6" component="div" gutterBottom>
          {`[404]  페이지를 찾을 수 없습니다.`}
        </Typography>
        <Typography gutterBottom>
          죄송합니다. 요청하신 페이지가 존재하지 않습니다.
        </Typography>
      </Stack>
    </Container>
  );
};

export default NotFoundPage;
