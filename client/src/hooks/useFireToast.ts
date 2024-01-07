import { useSetRecoilState } from "recoil";
import SnackbarAtom, {
  SnackbarVariant,
} from "../recoil/Modal/Atom/snackbarAtom";

const useFireToast = () => {
  const setToastValue = useSetRecoilState(SnackbarAtom);

  const fireToast = (message: string, variant: SnackbarVariant = "neutral") => {
    setToastValue({ isOpen: true, message, variant });
  };
  const closeToast = () => {
    setToastValue((prev) => ({ ...prev, message: "", isOpen: false }));
  };
  return { fireToast, closeToast };
};

export default useFireToast;
