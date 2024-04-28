import { Box, IconButton, Stack, Typography } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useEffect, useState } from "react";

interface NumberInputProps {
  value?: number;
  onClickPlus?: () => void;
  onClickMinus?: () => void;
  onChange?: (newValue: number) => void;
  initialValue?: number;
}

const NumberInput = ({
  value,
  initialValue = 0,
  onChange,
  onClickPlus,
  onClickMinus,
}: NumberInputProps) => {
  const isControlled = value !== undefined;
  const [controlledValue, setControlledValue] = useState(value ?? initialValue);

  useEffect(() => {
    onChange?.(controlledValue);
  }, [controlledValue]);

  return (
    <Stack direction={"row"} alignItems={"center"} gap={1}>
      <Box color={"grey.500"}>
        <IconButton
          color="inherit"
          onClick={() => {
            onClickMinus?.();
            setControlledValue((prev) => (prev > 1 ? prev - 1 : 1));
          }}
        >
          <RemoveCircleOutlineIcon />
        </IconButton>
      </Box>
      <Box minWidth={20} textAlign={"center"}>
        <Typography fontWeight={700}>
          {isControlled ? controlledValue : value}
        </Typography>
      </Box>
      <IconButton
        onClick={() => {
          onClickPlus?.();
          setControlledValue((prev) => prev + 1);
        }}
        color="primary"
      >
        <AddCircleIcon />
      </IconButton>
    </Stack>
  );
};

export default NumberInput;
