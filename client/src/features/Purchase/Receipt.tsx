import { ColumnWrapper } from "../../layouts/Wrapper";
import { OrderedItem } from "../../types/Orders";
import { CartElemContent } from "../Cart/Components/CartElemContent";

interface ReceiptProps {
  items: OrderedItem[];
  discountablePrice?: number;
  priceToPurchase?: number;
}

const Receipt = ({
  items,
  discountablePrice,
  priceToPurchase,
}: ReceiptProps) => {
  return (
    <ColumnWrapper
      gap={4}
      className="w-[320px] h-fit max-h-[70vh] overflow-y-auto p-8 border border-gray-400"
    >
      <span className="text-2xl font-bold text-center">주문내역</span>
      <ul className="flex flex-col gap-9 mt-4">
        {items.map((cartItem, i) => (
          <li key={i}>
            <CartElemContent data={cartItem} />
          </li>
        ))}
      </ul>
      <hr />
      {discountablePrice > 0 && discountablePrice !== undefined && (
        <div className="flex flex-row justify-between items-center w-full">
          <span className="text-lg font-bold">금액 할인</span>
          <span className="text-lg font-bold">{`${discountablePrice.toLocaleString()} 원`}</span>
        </div>
      )}
      {priceToPurchase !== undefined && (
        <span className="text-2xl font-bold text-right">{`합계 ${priceToPurchase.toLocaleString()}원`}</span>
      )}
    </ColumnWrapper>
  );
};

export default Receipt;
