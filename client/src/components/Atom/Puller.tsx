import { Box, BoxProps, SvgIcon } from "@mui/material";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

import { CART_CTA_HEIGHT } from "../../const/UiSize";

interface Props extends Omit<BoxProps, "onClick"> {
  isOpen?: boolean;
  onClick?: () => void;
}

const Puller = ({ isOpen = true, onClick, ...others }: Props) => {
  return (
    <Box
      bgcolor={"background.paper"}
      p={1}
      visibility={"visible"}
      height={CART_CTA_HEIGHT}
      textAlign={"center"}
      boxShadow="2px 0px 8px 0px rgba(0, 0, 0, 0.1)"
      borderRadius={"16px 16px 0 0"}
      overflow={'hidden'}
      {...others}
    >
      <SvgIcon onClick={onClick}>
        {isOpen ? (
          <KeyboardDoubleArrowDownIcon />
        ) : (
          <KeyboardDoubleArrowUpIcon />
        )}
      </SvgIcon>
    </Box>
  );
};

export default Puller;
