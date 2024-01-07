import { useCallback, useState } from "react";
import useMyInfoQuery from "../../../auth/api/useMyInfoQuery";
import { Button, Divider, Stack, TextField, Tooltip } from "@mui/material";
import { MuiColorInput } from "mui-color-input";
import DomainTextField from "./DomainTextField";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PinDropIcon from "@mui/icons-material/PinDrop";
import usePatcheWebsiteMutation from "../../api/usePatchWebsiteMutation";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import copyToClipboard from "../../../../utils/copyToClipboard";
import useFireToast from "../../../../hooks/useFireToast";
import WebsiteDescriptionTextEditor from "./WebsiteDescriptionTextEditor";

const EditWebsite = () => {
  const SHOP_BLOG_BASE_URL = process.env.REACT_APP_BLOG_URL;

  const { data: initial } = useMyInfoQuery();
  const [primaryColor, setPrimaryColor] = useState(
    initial.setting?.primaryColor
  );
  const [secondaryColor, setSecondaryColor] = useState(
    initial.setting?.secondaryColor
  );
  const [shopAddress, setShopAddress] = useState(initial.setting?.shopAddress);
  const [contact, setContact] = useState(initial.setting?.contact);
  const [description, setDescription] = useState(initial.setting?.description);

  const [isAlreadyExist, setIsAlreadyExist] = useState(false);
  const { mutateAsync: patchHandler } = usePatcheWebsiteMutation();
  const { fireToast } = useFireToast();

  const copyToClipboardHandler = useCallback(() => {
    copyToClipboard(`${SHOP_BLOG_BASE_URL}/${initial.setting?.domainName}`, {
      onError: () => fireToast("복사에 실패했습니다", "warning"),
      onSuccess: () => fireToast("링크가 복사되었습니다"),
    });
  }, [initial.setting?.domainName]);

  return !!initial?.setting ? (
    <Stack gap={3}>
      <DomainTextField
        error={isAlreadyExist}
        defaultValue={initial.setting?.domainName}
        onClick={async (domainName) => {
          await patchHandler({ domainName });
          window.alert("완료되었습니다");
        }}
        resetError={() => setIsAlreadyExist(false)}
        ButtonProps={{ children: "수정하기" }}
        InputProps={{
          endAdornment: (
            <Tooltip
              title={"링크복사"}
              sx={{ cursor: "pointer" }}
              onClick={copyToClipboardHandler}
            >
              <ContentCopyIcon />
            </Tooltip>
          ),
        }}
      />
      <Divider />
      <Stack direction={"row"} gap={1}>
        <TextField
          name="shopAddress"
          label="매장 주소"
          fullWidth
          value={shopAddress}
          onChange={({ target }) => setShopAddress(target.value)}
          InputProps={{ startAdornment: <PinDropIcon /> }}
        />
        <TextField
          name="contact"
          label="매장 연락처"
          type="tel"
          value={contact}
          fullWidth
          onChange={({ target }) => setContact(target.value)}
          InputProps={{ startAdornment: <LocalPhoneIcon /> }}
        />
      </Stack>
      <WebsiteDescriptionTextEditor
        onChange={setDescription}
        value={description}
        placeholder={"매장이 추구하는가치, 매장에 관한 설명을 적어주세요"}
      />
      <Divider />
      <Stack direction={"row"} gap={1}>
        <MuiColorInput
          value={primaryColor}
          label="브랜드컬러"
          onChange={(color) => setPrimaryColor(color)}
          format="hex"
          fullWidth
          isAlphaHidden
        />
        <MuiColorInput
          value={secondaryColor}
          label="포인트컬러"
          onChange={(color) => setSecondaryColor(color)}
          format="hex"
          fullWidth
          isAlphaHidden
        />
      </Stack>
      <Button
        onClick={async () => {
          await patchHandler({
            shopAddress,
            secondaryColor,
            primaryColor,
            contact,
            description,
          });
          window.alert("완료되었습니다");
        }}
      >
        수정
      </Button>
      <Divider />
    </Stack>
  ) : (
    <></>
  );
};

export default EditWebsite;
