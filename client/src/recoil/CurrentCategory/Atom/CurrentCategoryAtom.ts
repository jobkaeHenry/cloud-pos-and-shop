import { atom } from "recoil";
import { Category } from "../../../types/Categories";
/**
 * 유저가 선택한 카테고리 아톰
 */
const CurrentCategoryAtom = atom<Category["id"]>({
  key: "CurrentCategoryAtom",
  default: "all" as any,
});
export default CurrentCategoryAtom;