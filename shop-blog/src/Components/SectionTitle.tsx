import { Divider, Typography } from "@mui/material";
import React from "react";

type SectionTitleProps = {
  children?: string;
};

const SectionTitle = ({ children }: SectionTitleProps) => {
  return (
    <>
      <Typography
        textAlign={"center"}
        variant="h4"
        mt={6}
        mb={1}
        color="primary.main"
        fontWeight="medium"
      >
        {children}
      </Typography>
      <Divider />
    </>
  );
};

export default SectionTitle;
 