import { atom } from "recoil";

export type SnackbarVariant = "neutral" | "success" | "danger" | "warning";

const SnackbarAtom = atom({
  key: "SnackbarAtomKey",
  default: {
    isOpen: false,
    message: "",
    variant: "neutral" as SnackbarVariant,
  },
});

export default SnackbarAtom;
