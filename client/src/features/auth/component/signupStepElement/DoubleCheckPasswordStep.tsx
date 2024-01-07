import { TextField, TextFieldProps } from "@mui/material";
import SignupStep from "../SignupStep";

interface DoubleCheckPasswordStepProps
  extends Omit<TextFieldProps<"standard">, "variant" | "onChange"> {
  value?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  error?: boolean;
}

const DoubleCheckPasswordStep = ({
  value,
  onChange,
  error,
}: DoubleCheckPasswordStepProps) => {
  return (
    <SignupStep title={`비밀번호를\n한번 더 입력해 주세요`} error={error}>
      <TextField
        name="passwordcheck"
        autoComplete="off"
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        helperText="8~20자 대소문자, 숫자, 특수기호가 들어가야해요"
        value={value}
        onChange={(e) => onChange && onChange(e)}
      />
    </SignupStep>
  );
};

export default DoubleCheckPasswordStep;
