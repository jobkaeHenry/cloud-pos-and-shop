interface getPriceToPurchaseInterface {
  totalPrice: number;
  discountablePrice: number;
}
const getPriceToPurchase = ({
  totalPrice,
  discountablePrice,
}: getPriceToPurchaseInterface) => {
  const priceToPurChase = totalPrice - discountablePrice;
  return priceToPurChase > 0 ? priceToPurChase : 0;
};

export default getPriceToPurchase;
