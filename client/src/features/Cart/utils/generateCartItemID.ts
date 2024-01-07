import { Option, Product } from "../../../types/Products";
/**
 * 상품명과 Option배열을 입력받아 CartID 를 리턴하는 함수
 * @param title 상품명
 * @param selectedOptions 선택된 상품옵션 (배열)
 * @returns CartID
 */
export const generateCartItemID = (
  title: Product["title"],
  selectedOptions?: Option[]
) => {
  if (!selectedOptions) {
    return title;
  } else {
    let deepCopiedArr = JSON.parse(JSON.stringify(selectedOptions)) as Option[]; // 원본 배열을 수정하지 않도록 복사
    const sortedOptions = deepCopiedArr
      .sort((a, b) => (a.title < b.title ? -1 : 1)) // 옵션 이름 기준으로 정렬
      .map((option) => option.title)
      .join("-");
    return `${title}${sortedOptions ? `-${sortedOptions}` : ""}`;
  }
};