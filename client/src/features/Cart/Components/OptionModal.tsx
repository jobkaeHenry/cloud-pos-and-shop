import { useCallback, useState } from "react";
import { Option, Product } from "../../../types/Products";
import useCart from "../hooks/useCart";
import useModal from "../../../hooks/useModal";
import RowWrapper, { ColumnWrapper } from "../../../layouts/Wrapper";
import Checkbox from "../../../components/Atom/Checkbox";
import { Button } from "@mui/material";

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
    <ColumnWrapper gap={8} className="min-w-[280px] relative justify-between">
      <ColumnWrapper gap={4}>
        <ColumnWrapper>
          <span className="font-semibold text-2xl">{data.title}</span>
          <span className="text-xl">{`${data.price.toLocaleString()} 원`}</span>
        </ColumnWrapper>
        <ColumnWrapper gap={4}>
          {data.option.map((option) => {
            return (
              <Checkbox
                label={option.title}
                unit={option.price && `${option.price.toLocaleString()} 원`}
                key={option.title}
                onChange={(e) => changeHandler(e, option)}
              />
            );
          })}
        </ColumnWrapper>
      </ColumnWrapper>
      {/* 클릭시, 카트아이디 생성, 옵션 소팅, 토탈프라이스 추가 후 모달 닫기 */}
      <RowWrapper gap={2}>
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
      </RowWrapper>
    </ColumnWrapper>
  );
};

export default OptionModal;
