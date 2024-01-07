import { ButtonTypeMap } from "@mui/base";
import {
  Button,
  ExtendButtonBase,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { useEffect, useState, ReactNode } from "react";

interface Props
  extends Omit<
    TextFieldProps<"standard">,
    "onClick" | "onChange" | "error" | "defaultValue"
  > {
  onClick?: (domain: string) => void;
  onChange?: (domain: string) => void;
  error: boolean;
  resetError: () => void;
  defaultValue?: string;
  ButtonProps?: Omit<
    ExtendButtonBase<ButtonTypeMap<{}, "button">>,
    "sx" | "onClick" | "disabled"
  > & { children?: ReactNode | ReactNode[] };
}

const DomainTextField = ({
  onClick,
  onChange,
  error,
  resetError,
  defaultValue,
  ButtonProps,
  InputProps,
  ...textFieldProps
}: Props) => {
  const [domainName, setDomainName] = useState(defaultValue);

  useEffect(() => {
    onChange && onChange(domainName);
  }, [domainName]);

  return (
    <Stack direction={"row"} gap={1} justifyContent={"center"}>
      <TextField
        value={domainName}
        label="도메인"
        autoFocus
        fullWidth
        autoComplete="off"
        error={error}
        helperText={
          error
            ? "이미 존재하는 도메인이에요"
            : "영문 혹은 숫자만 입력가능합니다"
        }
        InputProps={{
          startAdornment: (
            <Typography variant="label" color="text.secondary" mr={0.5}>
              {process.env.REACT_APP_BLOG_URL}/
            </Typography>
          ),
          ...InputProps,
        }}
        onChange={({ target }) => {
          if (
            target.value !== "" &&
            !new RegExp(/^[a-zA-Z0-9]+$/).test(target.value)
          ) {
            return;
          }
          resetError();
          setDomainName(target.value);
        }}
        {...textFieldProps}
      />
      <Button
        sx={{ height: "56px", flexShrink: 0 }}
        disabled={error}
        onClick={(e) => {
          e.preventDefault();
          if (!new RegExp(/^[a-zA-Z0-9]+$/).test(domainName)) {
            return;
          }
          onClick && onClick(domainName);
        }}
        {...ButtonProps}
      >
        {ButtonProps?.children ? ButtonProps.children : "사용하기"}
      </Button>
    </Stack>
  );
};

export default DomainTextField;
