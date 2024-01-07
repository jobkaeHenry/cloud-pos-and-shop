import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { axiosPrivate } from "../../../libs/axios/axios";
import { CREATE_WEBSITE } from "../../../const/serverPath";
import { myInfoQueryKey } from "../../auth/api/useMyInfoQuery";
import WebsiteSettingInterface from "../interface/websiteSettingInterface";

const usePatcheWebsiteMutation = (
  options?: Omit<
    UseMutationOptions<any, Error, WebsiteSettingInterface, unknown>,
    "mutateFn"
  >
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: WebsiteSettingInterface) => patchWebsiteMuateFn(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: myInfoQueryKey });
    },
    ...options,
  });
};

export const patchWebsiteMuateFn = async (
  patchData: WebsiteSettingInterface
) => {
  const { data } = await axiosPrivate.patch(CREATE_WEBSITE, patchData);
  return data;
};

export default usePatcheWebsiteMutation;
