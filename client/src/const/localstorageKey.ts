/**
 * 로컬스토리지 키 모음
 */
export const localStorageKey = {
  /**
   * 카트에 아이템과 동기화되는 로컬스토리지 (비정상 종료 등 염두)
   */
  _tempCart: "cartItem_temp" as const,
} as const;

export const ACCESSTOKEN = "accessToken";
