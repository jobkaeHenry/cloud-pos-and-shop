import { InputHTMLAttributes, useState } from "react";
import { RowWrapper } from "./../../layouts/Wrapper";

interface Props
  extends Pick<
    InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange" | "name" | "defaultChecked"
  > {
  label: string;
  unit?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({ label, unit, onChange, ...others }: Props) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked((prevChecked) => !prevChecked);
  };
  return (
    <label htmlFor={label} className="flex flex-row items-center gap-2">
      <input
        className="hidden"
        type="checkbox"
        id={label}
        name={label}
        checked={isChecked}
        onChange={(e) => {
          handleCheckboxChange();
          onChange && onChange(e);
        }}
        {...others}
      />
      <label
        className={`block w-4 h-4 border ${
          isChecked ? "bg-blue-500 border-4" : ""
        } 'border-gray-400' rounded-4 float-left`}
        htmlFor={label}
      ></label>
      <RowWrapper className="justify-between w-full">
        <span className="font-semibold">{label}</span>
        <span className="text-gray-500">{unit}</span>
      </RowWrapper>
    </label>
  );
};
export default Checkbox;
