import { useState } from "react";
import Logo from "../../../../assets/Logo";
import TextInput from "../../../../components/Atom/TextInput";
import LoginRequestDTO from "../../interface/LoginDTO";
import { Link } from "react-router-dom";
import { SIGNUP_URL } from "../../../../const/clientPath";
import { Button, Typography } from "@mui/material";

interface LoginFormProps {
  onSubmit: ({ userId, password }: Omit<LoginRequestDTO, "shopName">) => any;
  disableAutoComplete?: boolean;
}

const LoginForm = ({ onSubmit, disableAutoComplete }: LoginFormProps) => {
  const [userId, setUserId] = useState<LoginRequestDTO["userId"]>();
  const [password, setPassword] = useState<LoginRequestDTO["password"]>();
  const [hasError, setHasError] = useState(false);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (!userId || !password) {
          return;
        }
        try {
          await onSubmit({ userId, password });
        } catch (err) {
          setHasError(true);
        }
      }}
      className="flex flex-col gap-4"
    >
      <h2 className="mb-6 flex justify-center">
        <Logo height={48}/>
      </h2>
      <TextInput
        label={"아이디"}
        type={"id"}
        id={"id"}
        autoComplete={disableAutoComplete ? "off" : "username"}
        onChange={({ target }) => setUserId(target.value)}
      />
      <TextInput
        label={"비밀번호"}
        type={"password"}
        id={"password"}
        autoComplete={disableAutoComplete ? "off" : "password"}
        onChange={({ target }) => setPassword(target.value)}
      />
      {hasError && (
        <Typography variant="label" color="error">
          아이디, 혹은 패스워드를 확인해주세요
        </Typography>
      )}
      <Typography
        variant="label"
        component={Link}
        to={SIGNUP_URL}
        className="text-sm text-gray-600 "
      >
        <Typography variant="label" fontWeight={"bold"} color="primary.main">
          회원가입
        </Typography>{" "}
        하고 이용하기!
      </Typography>
      <Button type="submit">로그인</Button>
    </form>
  );
};

export default LoginForm;
