import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { axiosPrivate } from "../../../libs/axios/axios";
import { CREATE_WEBSITE } from "../../../const/serverPath";
import { myInfoQueryKey } from "../../auth/api/useMyInfoQuery";
import useFireToast from "../../../hooks/useFireToast";

const useCreateWebsiteMutation = (
  options?: Omit<UseMutationOptions<any, Error, string, unknown>, "mutateFn">
) => {
  const queryClient = useQueryClient();
  const { fireToast } = useFireToast();
  return useMutation({
    mutationFn: (domainName: string) => createWebsiteMuateFn(domainName),
    onSuccess: () => {
      fireToast("웹사이트가 생성되었습니다");
      queryClient.invalidateQueries({ queryKey: myInfoQueryKey });
    },
    ...options,
  });
};

export const createWebsiteMuateFn = async (domainName: string) => {
  const { data } = await axiosPrivate.post(CREATE_WEBSITE, { domainName });
  return data;
};

export default useCreateWebsiteMutation;
