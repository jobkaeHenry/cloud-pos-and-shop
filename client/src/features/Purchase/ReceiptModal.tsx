import { ColumnWrapper } from "../../layouts/Wrapper";
import useModal from "../../hooks/useModal";
import useResetStatus from "./hooks/useResetStatus";
import Receipt from "./Receipt";
import CompleteLottie from "../../components/Loading/CompleteLottie";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@mui/material";

const RecieptModal = () => {
  useResetStatus();
  const { closeModal } = useModal();
  const [isCompleted, setIsCompleted] = useState(false); //Lottie가 로딩완료됬는지 여부

  return (
    <>
      <AnimatePresence mode={"popLayout"}>
        {isCompleted ? (
          <motion.div
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            layout
          >
            <ColumnWrapper gap={4}>
              <Receipt />
              <Button
                onClick={closeModal}
                variant="outlined"
                color="inherit"
                sx={{ color: "text.secondary" }}
              >
                확인 후 닫기
              </Button>
            </ColumnWrapper>
          </motion.div>
        ) : (
          <>
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                style={{ width: 200, height: 200 }}
                layout
              >
                <CompleteLottie onComplete={() => setIsCompleted(true)} />
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default RecieptModal;
