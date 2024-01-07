import {
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Product } from "../../../../types/Products";
import { useState } from "react";
import ParsePrice from "../../../Coupon/utils/ParsePrice";

interface MenuTableRowProps {
  onClick?: (id: number) => void;
  data: Product;
}

const MenuTableRow = ({ data, onClick }: MenuTableRowProps) => {
  const { id, title, description, price, category, option } = data;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <TableRow
        onClick={() => onClick && onClick(id)}
        key={id}
        hover
        sx={{ cursor: "pointer" }}
      >
        <TableCell>{category.title}</TableCell>
        <TableCell>{title}</TableCell>
        <TableCell>{ParsePrice(price, "amount")}</TableCell>
        <TableCell>{description}</TableCell>
        <TableCell align="center">
          {option ? (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
            >
              {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          ) : (
            <></>
          )}
        </TableCell>
      </TableRow>
      {option && (
        <TableRow>
          <TableCell sx={{ padding: 0 }} colSpan={5}>
            <Collapse in={isOpen} timeout={"auto"} unmountOnExit>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>옵션명</TableCell>
                    <TableCell>가격</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {option.map(({ title, price, id }) => (
                    <TableRow key={id}>
                      <TableCell>{title}</TableCell>
                      <TableCell>{ParsePrice(price, "amount")}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default MenuTableRow;
