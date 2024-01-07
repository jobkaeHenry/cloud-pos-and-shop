"use client";
import {
  ToggleButton,
  ToggleButtonGroup,
  ToggleButtonGroupProps,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface CustomToggleButtonGroupType
  extends Omit<ToggleButtonGroupProps, "onChange" | "value" | "children"> {
  onChange: (val: string) => void;
  value: { value: string | number; label?: string | number }[];
}

const CustomToggleButtonGroup = ({
  onChange,
  value,
  sx,
  ...toggleBtnGroupProps
}: CustomToggleButtonGroupType) => {
  const [currentValue, setCurrentValue] = useState(value[0].value);

  return (
    <ToggleButtonGroup
      value={currentValue}
      exclusive
      fullWidth
      onChange={(_e, val) => {
        if (val !== null) {
          setCurrentValue(val);
          onChange(val);
        }
      }}
      sx={{
        backgroundColor: "background.paper",
        px: 2,
        borderRadius: 0,
        overflowX: "auto",
        ...sx,
      }}
      {...toggleBtnGroupProps}
    >
      {value.map(({ value, label }, i) => {
        return (
          <ToggleButton
            key={i}
            disableRipple
            value={value}
            fullWidth
            sx={ToggleButtonStyle}
          >
            <Typography
              className="inline-block whitespace-nowrap"
              fontSize="caption1"
              fontWeight="bold"
            >
              {label ? label : value}
            </Typography>
          </ToggleButton>
        );
      })}
    </ToggleButtonGroup>
  );
};

const ToggleButtonStyle = {
  border: 0,
  borderRadius: 0,
  "&.Mui-selected": {
    backgroundColor: "background.paper",
    borderBottom: "1px solid",
    ":hover": {
      backgroundColor: "background.paper",
    },
  },
  ":hover": {
    backgroundColor: "background.paper",
  },
};

export default CustomToggleButtonGroup;
