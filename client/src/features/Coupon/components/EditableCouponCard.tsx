import { useState } from "react";
import CouponCard from "./CouponCard";
import CouponCardEditor, { CouponData } from "./CouponCardEditor";
import useDeleteCouponMutation from "../api/useDeleteCouponMutation";
import usePatchCouponMutation from "../api/useDeleteCouponMutation copy";

const EditableCouponCard = ({ id, title, type, amount }: CouponData) => {
  const [isEditing, setIsEditing] = useState(false);
  const { mutateAsync: deleteHandler } = useDeleteCouponMutation();
  const { mutateAsync: patchHandler } = usePatchCouponMutation();

  return isEditing ? (
    <CouponCardEditor
      id={id}
      title={title}
      type={type}
      amount={amount}
      onSubmit={async (dataWithoutId) => {
        await patchHandler({ ...dataWithoutId, id });
        setIsEditing(false);
      }}
    />
  ) : (
    <CouponCard
      onEdit={() => setIsEditing(true)}
      onDelete={(id) => {
        if (window.confirm("삭제하시겠습니까?")) {
          deleteHandler(id);
        }
      }}
      id={Number(id)}
      title={title}
      type={type}
      amount={Number(amount)}
    />
  );
};

export default EditableCouponCard;
