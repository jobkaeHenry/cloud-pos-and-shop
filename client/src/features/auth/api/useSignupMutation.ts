import { useMutation } from "@tanstack/react-query";
import axios from "../../../libs/axios/axios";
import SignupRequirement from "../../../types/SignupRequirement";
import useLoginMutation from "./useLoginMutation";
import { isAxiosError } from "axios";
import useFireToast from "../../../hooks/useFireToast";

const useSignupMutation = () => {
  const { mutate: loginHandler } = useLoginMutation();
  const { fireToast } = useFireToast();

  return useMutation({
    mutationFn: async ({ userId, password, shopName }: SignupRequirement) => {
      await axios.post("/auth/signup", {
        userId,
        password,
        shopName,
      });
      return { userId, password };
    },
    onSuccess: async ({ userId, password }) => {
      loginHandler({ userId, password });
    },
    onError: (err) => {
      if (isAxiosError(err) && err.response) {
        fireToast(err.response.data.message, "warning");
        return;
      }
      fireToast("알 수 없는 에러가 발생했습니다", "warning");
    },
  });
};

export default useSignupMutation;
