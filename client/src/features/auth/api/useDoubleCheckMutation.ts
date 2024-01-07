import { useMutation } from "@tanstack/react-query";

import LoginRequestDTO from "../interface/LoginDTO";
import { axiosPrivate } from "../../../libs/axios/axios";
import { DOUBLE_CHECK_PASSWORD } from "../../../const/serverPath";

const useDoubleCheckMutation = () => {
  return useMutation({
    mutationFn: ({ userId, password }: LoginRequestDTO) =>
      doubleCheckPasswordMutateFn({ userId, password }),
  });
};
export const doubleCheckPasswordMutateFn = async ({
  userId,
  password,
}: LoginRequestDTO) => {
  const { data } = await axiosPrivate.post(DOUBLE_CHECK_PASSWORD, {
    userId,
    password,
  });
  return data;
};

export default useDoubleCheckMutation;
