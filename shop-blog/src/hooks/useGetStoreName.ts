"use client";

import { useParams } from "next/navigation";

/**
 * 접속한 페이지의 storeName (URL) 을 리턴하는 훅
 * @returns
 */
const useGetStoreName = () => {
  const params = useParams();
  return params?.shopName;
};

export default useGetStoreName;
