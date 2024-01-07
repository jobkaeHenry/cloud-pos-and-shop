import { useSuspenseQuery } from "@tanstack/react-query";
import { MY_INFO_URL } from "../../../const/serverPath";
import MyInfoInterface from "../interface/myInfoInterface";
import { axiosPrivate } from "../../../libs/axios/axios";

const useMyInfoQuery = () => {
  return useSuspenseQuery({
    queryKey: myInfoQueryKey,
    queryFn: myInfoQueryFn,
  });
};

export const myInfoQueryFn = async () => {
  const { data } = await axiosPrivate.get<MyInfoInterface>(MY_INFO_URL);
  return data;
};

export const myInfoQueryKey = ["me"] as const;

export default useMyInfoQuery;
