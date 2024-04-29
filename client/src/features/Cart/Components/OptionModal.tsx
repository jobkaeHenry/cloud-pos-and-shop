import { useCallback, useState } from "react";
import { Option, Product } from "../../../types/Products";
import useCart from "../hooks/useCart";
import useModal from "../../../hooks/useModal";
import RowWrapper from "../../../layouts/Wrapper";
import Checkbox from "../../../components/Atom/Checkbox";
import { Button, Stack, Typography } from "@mui/material";
import ProductImage from "../../ProductList/ProductImage";

type Props = {
  data: Product;
};

const OptionModal = ({ data }: Props) => {
  const [checkedOption, setCheckedOption] = useState([]);
  /**
   * 모달 내부에서만 유효한 상태 (checked Option)을 변경하는 핸들러
   */
  const changeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, option: Option) => {
      if (e.target.checked) {
        setCheckedOption((prev) => [...prev, option]);
      } else if (!e.target.checked) {
        setCheckedOption((prev) => prev.filter((pre) => pre !== option));
      }
    },
    []
  );
  const { add } = useCart();
  const { closeModal } = useModal();

  return (
    <Stack gap={4} className="min-w-[280px] relative justify-between">
      <Stack gap={2}>
        <ProductImage
          src={data.image}
          alt={data.title}
          sx={{ maxHeight: "200px", width: "auto" }}
        />
        <Stack>
          <Typography variant={"subtitle1"} fontWeight={"bold"}>
            {data.title}
          </Typography>
          <Typography variant={"subtitle2"}>
            &#8361; {`${data.price.toLocaleString()}`}
          </Typography>
        </Stack>

        <Typography>{data.description}</Typography>
        <Stack gap={2}>
          {(data.option ?? []).map((option) => {
            return (
              <Checkbox
                label={option.title}
                unit={
                  option.price !== undefined &&
                  `${option.price.toLocaleString()} 원`
                }
                key={option.title}
                onChange={(e) => changeHandler(e, option)}
              />
            );
          })}
        </Stack>
      </Stack>
      {/* 클릭시, 카트아이디 생성, 옵션 소팅, 토탈프라이스 추가 후 모달 닫기 */}
      <Stack gap={1} direction={"row"}>
        <Button variant="outlined" fullWidth onClick={closeModal}>
          취소
        </Button>
        <Button
          fullWidth
          onClick={() => {
            add(data, checkedOption);
            closeModal();
          }}
        >
          추가
        </Button>
      </Stack>
    </Stack>
  );
};

export default OptionModal;
