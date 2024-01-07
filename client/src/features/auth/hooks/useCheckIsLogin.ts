import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { myInfoQueryFn, myInfoQueryKey } from "../api/useMyInfoQuery";
import { LOGIN_URL } from "../../../const/clientPath";
import useNavigateWithState from "../../../hooks/useNavigateWithState";

const useCheckIsLogin = () => {
  const navigate = useNavigateWithState();
  const queryclient = useQueryClient();

  useEffect(() => {
    const checkIsLogin = async () => {
      try {
        const userInfo = await myInfoQueryFn();
        queryclient.setQueryData(myInfoQueryKey, userInfo);
      } catch (err) {
        navigate(LOGIN_URL);
      }
    };
    checkIsLogin();
  }, []);
};

export default useCheckIsLogin;
