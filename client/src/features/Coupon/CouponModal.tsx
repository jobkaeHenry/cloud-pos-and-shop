import { ColumnWrapper } from "../../layouts/Wrapper";
import useModal from "../../hooks/useModal";
import CouponList from "./CouponList";
import { Suspense } from "react";
import { Button } from "@mui/material";

const CouponModal = () => {
  const { closeModal } = useModal();

  return (
    <ColumnWrapper gap={8} className="min-w-[280px] relative justify-between">
      <ColumnWrapper gap={4}>
        {/* 제목 */}
        <ColumnWrapper>
          <span className="font-semibold text-xl">쿠폰 적용하기</span>
          <span>할인쿠폰을 적용해보세요</span>
        </ColumnWrapper>
        {/* 리스트 */}
        <Suspense
          fallback={
            <select>
              <option>쿠폰을 불러오는 중입니다</option>
            </select>
          }
        >
          <CouponList />
        </Suspense>
      </ColumnWrapper>
      {/* 버튼 */}
      <Button onClick={closeModal}>적용</Button>
    </ColumnWrapper>
  );
};
export default CouponModal;
