import {
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import useGetProductQueryByCategory from "../../../ProductList/api/useProductQuery";
import useGetCategoriesQuery from "../../../Categories/api/useCategoriesQuery";
import { useCallback, useState } from "react";
import useModal from "../../../../hooks/useModal";
import MenuEditorModal from "./MenuEditorModal";
import { Product } from "../../../../types/Products";
import MenuTableRow from "./MenuTableRow";

const MenuTable = () => {
  const { data: categories } = useGetCategoriesQuery();

  const [currentCategory, setCurrentCategory] = useState<number | "all">("all");
  const { data: menu } = useGetProductQueryByCategory(currentCategory);
  const { openModal } = useModal();

  const openEditorModal = useCallback(
    (id: Product["id"]) => {
      openModal(<MenuEditorModal productId={id} />);
    },
    [openModal]
  );

  return (
    <>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Select
                value={currentCategory}
                size="small"
                onChange={({ target }) =>
                  setCurrentCategory(() =>
                    target.value === "all" ? target.value : Number(target.value)
                  )
                }
              >
                {categories.map(({ id, title }) => (
                  <MenuItem value={id} key={id}>
                    {title}
                  </MenuItem>
                ))}
              </Select>
            </TableCell>
            <TableCell sx={{ verticalAlign: "middle" }}>제품명</TableCell>
            <TableCell sx={{ verticalAlign: "middle" }}>가격</TableCell>
            <TableCell sx={{ verticalAlign: "middle" }}>설명</TableCell>
            <TableCell align='center' sx={{ verticalAlign: "middle" }}>옵션</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {menu.map((data) => (
            <MenuTableRow
              onClick={() => openEditorModal(data.id)}
              data={data}
              key={data.id}
            />
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default MenuTable;
