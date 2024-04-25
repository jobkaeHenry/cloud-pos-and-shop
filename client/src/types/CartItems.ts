import { Option, Product } from "./Products";
/**
 * 카트아이템 고유 ID와 Quantity가 추가된타입
 */
export interface CartItem extends Product {
  /**
   * 상품명, 옵션명을 직렬화한 ID (카트 내부에서 옵션별로 분리해 관리하기 위한 값)
   */
  cartId: string;
  /**
   * 갯수
   */
  quantity: number;
  /**
   * 옵션을 포함한 최종가격
   */
  totalPrice: number;
  option?: Option[];
}

export type CartItems = CartItem[];
