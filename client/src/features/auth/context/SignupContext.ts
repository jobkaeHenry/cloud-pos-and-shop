import { Dispatch, SetStateAction, createContext } from "react";
import SignupRequirement from "../../../types/SignupRequirement";

interface SignupPageContextInterface {
  formData: SignupRequirement;
  setFormData: Dispatch<SetStateAction<SignupRequirement>>;
  disableBtn: boolean;
  setDisableBtn: Dispatch<SetStateAction<boolean>>;
}

const SignupPageContext = createContext<SignupPageContextInterface>({
  formData: {
    userId: "",
    password: "",
    shopName: "",
  },
  setFormData: () => {},
  disableBtn: false,
  setDisableBtn: () => {},
});

export default SignupPageContext;
