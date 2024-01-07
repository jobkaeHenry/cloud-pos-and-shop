import { Category } from "../../types/Categories";
import { Typography, TypographyProps } from "@mui/material";

interface Props extends TypographyProps {
  title: Category["title"] | string;
  isSelected?: boolean;
}

const CategoryElem = ({ title, isSelected, ...others }: Props) => {
  return (
    <Typography
      component="button"
      py={2}
      px={2}
      pb={isSelected ? "14px" : undefined}
      fontWeight={isSelected ? "bold" : "medium"}
      color={isSelected ? "primary.main" : "text.gray"}
      borderBottom={isSelected ? "1px solid" : undefined}
      borderColor={"primary.main"}
      className={"whitespace-nowrap cursor-pointer select-none"}
      {...others}
    >
      {title}
    </Typography>
  );
};

export default CategoryElem;
