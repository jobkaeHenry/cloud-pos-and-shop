import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../../libs/axios/axios";
import { LOGIN_SERVER_URL } from "../../../const/serverPath";
import LoginRequestDTO, { LoginResponseDTO } from "../interface/LoginDTO";
import { setLS } from "../../../utils/localStorage";
import { ACCESSTOKEN } from "../../../const/localstorageKey";
import { useNaviateToFrom } from "../../../hooks/useNavigateFrom";
import refreshInterceptor from "../../../libs/axios/refreshInterceptor";

const useLoginMutation = () => {
  const navigate = useNaviateToFrom();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginMutateFn,
    onSuccess: ({ accessToken }) => {
      setLS(ACCESSTOKEN, accessToken);
      refreshInterceptor();
      queryClient.clear();
      navigate();
    },
  });
};

export const loginMutateFn = async ({ userId, password }: LoginRequestDTO) => {
  const { data } = await axios.post<LoginResponseDTO>(LOGIN_SERVER_URL, {
    userId,
    password,
  });
  return data;
};
export default useLoginMutation;
