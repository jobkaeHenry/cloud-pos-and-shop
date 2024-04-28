import CartList from "./Components/CartList";
import CartCTAPannel from "./Components/CartCTAPannel";
import { Box, Stack } from "@mui/material";
import CartListResponsiveWrapper from "./Components/CartListResponsiveWrapper";

const Cart = () => {
  return (
    <Stack>
      <CartListResponsiveWrapper>
        <CartList />
      </CartListResponsiveWrapper>

      <Box zIndex={1201}>
        <CartCTAPannel />
      </Box>
    </Stack>
  );
};

export default Cart;
