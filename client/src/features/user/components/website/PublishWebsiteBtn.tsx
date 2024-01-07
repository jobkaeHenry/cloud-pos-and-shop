import { useState } from "react";
import useMyInfoQuery from "../../../auth/api/useMyInfoQuery";
import { Container, Stack, Typography } from "@mui/material";
import Logo from "./../../../../assets/Logo";
import useCreateWebsiteMutation from "../../api/useCreateWebsiteMutation";
import { isAxiosError } from "axios";
import DomainTextField from "./DomainTextField";

const PublishWebsiteBtn = () => {
  const { data } = useMyInfoQuery();

  const [isAlreadyExist, setIsAlreadyExist] = useState(false);

  const { mutateAsync: PublishWebsite } = useCreateWebsiteMutation({
    onError: (err) => {
      if (isAxiosError(err)) {
        if (err.response.status === 400) {
          setIsAlreadyExist(true);
        }
      }
    },
  });

  return !data?.setting ? (
    <Container maxWidth={"md"}>
      <Stack
        gap={4}
        minHeight={"60vh"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Logo height={64}/>
        <Typography textAlign={"center"} variant="h2">
          아직 웹사이트가 없으시네요 <br />
          빠르고 간편하게 웹사이트를 만들어보세요!
        </Typography>
        <DomainTextField
          onClick={(domain) => PublishWebsite(domain)}
          error={isAlreadyExist}
          resetError={() => setIsAlreadyExist(false)}
        />
        <Typography>
          메뉴, 간단한소개, 매장위치, 연락처 등의 정보가 공유됩니다
        </Typography>
      </Stack>
    </Container>
  ) : null;
};

export default PublishWebsiteBtn;
