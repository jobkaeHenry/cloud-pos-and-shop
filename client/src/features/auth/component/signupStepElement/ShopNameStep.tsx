import { TextField, TextFieldProps } from "@mui/material";
import SignupStep from "../SignupStep";

interface ShopNameStepProps
  extends Omit<TextFieldProps<"standard">, "variant" | "onChange"> {
  value?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

const ShopNameStep = ({ value, onChange }: ShopNameStepProps) => {
  return (
    <SignupStep
      title={`거의 다 끝나가요!\n상호를 설정해주세요🤓`}
      error={value ? !!value && !(value.length > 2) : undefined}
    >
      <TextField
        name="shopName"
        autoComplete="shopname"
        label="상호"
        type="text"
        placeholder="상호를 입력해주세요"
        helperText="상호를 입력해주세요"
        value={value}
        onChange={(e) => onChange && onChange(e)}
      />
    </SignupStep>
  );
};

export default ShopNameStep;
