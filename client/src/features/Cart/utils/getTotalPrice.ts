import { Option } from "../../../types/Products";
/**
 * 옵션 배열을 받아 해당 옵션의 가격을 모두 더해주는 함수
 * @param option 옵션배열
 * @returns 해당배열의 price 값의 합
 */
export const getOptionPrice = (option: Option[]) => {
  const sum = option.reduce((acc, cur) => {
    return acc + (cur?.price ?? 0);
  }, 0);
  return sum;
};
