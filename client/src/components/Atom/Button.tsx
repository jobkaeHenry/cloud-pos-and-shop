import React from "react";

interface ButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "className" | "onClick"
  > {
  disabled?: boolean;
  rounded?: boolean;
  variant?: "normal" | "thin";
  ghost?: boolean;
  fullWidth?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  rounded,
  ghost,
  fullWidth,
  variant = "normal",
  className,
  onClick,
  ...others
}) => {
  const classNames = [
    "flex",
    "gap-8",
    "justify-center",
    "items-center",
    fullWidth ? "w-full" : "",
    "font-bold",
    ghost ? "text-gray-600" : "text-white",
    rounded ? "rounded-full" : "rounded-md",
    disabled ? "bg-gray-300" : "bg-blue-400",
  ];

  if (ghost) {
    classNames.push("bg-white", "border", "border-gray-300");
  }
  if (variant === "normal") {
    classNames.push("px-4", "py-3");
  }
  if (variant === "thin") {
    classNames.push("px-3", "py-1");
  }

  return (
    <button
      className={`${classNames.join(" ")} ${className ?? ""}`}
      disabled={disabled}
      onClick={(e) => {
        if (!disabled && onClick) {
          onClick(e);
        }
      }}
      {...others}
    >
      {children}
    </button>
  );
};

export default Button;
