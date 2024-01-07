import { localStorageKey } from "../../../const/localstorageKey";
import useModal from "../../../hooks/useModal";
import { ColumnWrapper } from "../../../layouts/Wrapper";
import { CartAtom } from "../../../recoil/Cart/Atom/CartAtom";
import { CartItems } from "../../../types/CartItems";
import { getLS } from "../../../utils/localStorage";
import { RowWrapper } from "../../../layouts/Wrapper";
import { useSetRecoilState } from "recoil";
import useCart from "../hooks/useCart";
import { Button } from "@mui/material";

// 추후 confirm Modal 등 으로 재사용이 용이하게 바꾸는 것 도 고려해볼 만 함

const UseSavedCartItemsModal = () => {
  const { closeModal } = useModal();
  const { reset } = useCart();
  const setCartItem = useSetRecoilState(CartAtom);
  return (
    <ColumnWrapper gap={8} className="w-[280px] relative justify-between">
      <ColumnWrapper>
        <span className="font-semibold text-xl">장바구니 불러오기</span>
        <span>이전 장바구니 목록이있습니다 불러오시겠습니까?</span>
      </ColumnWrapper>
      <RowWrapper gap={2}>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => {
            reset();
            closeModal();
          }}
        >
          취소
        </Button>
        <Button
          fullWidth
          onClick={() => {
            setCartItem(getLS<CartItems>(localStorageKey._tempCart));
            closeModal();
          }}
        >
          불러오기
        </Button>
      </RowWrapper>
    </ColumnWrapper>
  );
};

export default UseSavedCartItemsModal;
