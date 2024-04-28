import { ReactNode, useState } from "react";
import Puller from "../../../components/Atom/Puller";
import { CART_CTA_HEIGHT, DRAWER_WIDTH } from "../../../const/UiSize";
import { Box, Drawer } from "@mui/material";

interface CartListResponsiveWrapperProps {
  children: ReactNode;
}

const CartListResponsiveWrapper = ({
  children,
}: CartListResponsiveWrapperProps) => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(true);
  const toggleModal = () => setIsOpenDrawer((prev) => !prev);

  return (
    <>
      <Box
        component={"ul"}
        sx={{ zIndex: 0, overflowY: "auto", height: "100%" }}
        display={{ xs: "none", md: "block" }}
        width={DRAWER_WIDTH}
      >
        {children}
      </Box>

      <Puller
        isOpen={isOpenDrawer}
        onClick={toggleModal}
        position={"absolute"}
        bottom={CART_CTA_HEIGHT}
        left={0}
        right={0}
        sx={{ display: { xs: "block", md: "none" } }}
      />
      <Drawer
        onClose={toggleModal}
        open={isOpenDrawer}
        anchor="bottom"
        variant="persistent"
        sx={{ display: { xs: "flex", md: "none" } }}
        PaperProps={{
          sx: {
            bottom: CART_CTA_HEIGHT,
          },
        }}
      >
        <Box
          component={"ul"}
          sx={{ overflowY: "auto" }}
          height={"50vh"}
        >
          <Puller
            isOpen={isOpenDrawer}
            onClick={toggleModal}
            position={"sticky"}
            top={0}
            zIndex={1}
          />
          {children}
        </Box>
      </Drawer>
    </>
  );
};

export default CartListResponsiveWrapper;
