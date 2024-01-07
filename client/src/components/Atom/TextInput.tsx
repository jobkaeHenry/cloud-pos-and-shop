import React, { useId, useState } from "react";

interface TextInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  error?: string;
}

const TextInput = ({
  label,
  type,
  onChange,
  id,
  name,
  error,
  ...otherInputProps
}: TextInputProps) => {
  const [state, setState] = useState<string | number | readonly string[]>("");
  const uniqueId = useId();
  const defaultId = id ? id : uniqueId;
  return (
    <div>
      <label
        htmlFor={defaultId}
        className="block text-sm font-medium text-gray-600"
      >
        {label}
      </label>
      <input
        type={type}
        value={state}
        onChange={(e) => {
          onChange && onChange(e);
          setState(e.target.value);
        }}
        id={defaultId}
        name={defaultId}
        className={`mt-1 p-2 w-full border rounded-md ${
          error ? "border-red-500" : ""
        }`}
        {...otherInputProps}
      />
    </div>
  );
};

export default TextInput;
