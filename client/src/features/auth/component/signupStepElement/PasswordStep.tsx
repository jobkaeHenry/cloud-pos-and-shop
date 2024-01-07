import { TextField, TextFieldProps } from "@mui/material";
import SignupStep from "../SignupStep";

interface PasswordStepProps
  extends Omit<TextFieldProps<"standard">, "variant" | "onChange"> {
  value?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

const PasswordStep = ({ value, onChange }: PasswordStepProps) => {
  return (
    <SignupStep
      title={`🔐\n비밀번호를 입력해 주세요`}
      error={
        value
          ? !new RegExp(
              /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            ).test(value)
          : undefined
      }
    >
      <TextField
        name="password"
        autoComplete="new-password"
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        helperText="8자 이상, 영문, 숫자, 특수기호가 들어가야해요"
        value={value}
        onChange={(e) => onChange && onChange(e)}
      />
    </SignupStep>
  );
};

export default PasswordStep;
