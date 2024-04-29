import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";

interface CheatingSheetProps {
  title: string;
  memo?: string;
}

const CheatingSheet = ({ title, memo }: CheatingSheetProps) => {
  return (
    <Box p={2} border={"1px solid"} flexGrow={1} borderColor={"grey.500"}>
      <Typography variant="subtitle1" textAlign={"center"} fontWeight={"bold"}>
        점주 메모
      </Typography>
      <Typography textAlign={"center"}>- {title} -</Typography>
      <Typography mt={1}>{memo}</Typography>
    </Box>
  );
};

export default CheatingSheet;
