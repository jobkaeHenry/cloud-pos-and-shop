import { TextField, TextFieldProps } from "@mui/material";
import SignupStep from "../SignupStep";

interface UserIdStepProps
  extends Omit<TextFieldProps<"standard">, "variant" | "onChange"> {
  value?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

const UserIdStep = ({ value, onChange }: UserIdStepProps) => {
  return (
    <SignupStep
      title={`원활한 환경을 위해\n아이디를 입력해 주세요😃`}
      error={
        value
          ? !new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/).test(value)
          : undefined
      }
    >
      <TextField
        name="userId"
        autoComplete="username"
        label="아이디"
        type="id"
        placeholder="아이디를 입력해주세요"
        helperText="6글자 이상, 영문, 숫자를 포함해주세요"
        value={value}
        onChange={(e) => onChange && onChange(e)}
      />
    </SignupStep>
  );
};

export default UserIdStep;
