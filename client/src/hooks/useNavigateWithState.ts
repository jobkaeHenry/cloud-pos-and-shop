import { useLocation, useNavigate } from "react-router";

/**
 * url과 state를 입력받아 state와 함께 해당 url로 이동하는 함수를 리턴하는 hooks
 * @returns (url,state?=location.pathname)=>void
 */
const useNavigateWithState = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (destination: string, value?: string) =>
    navigate(destination, {
      state: {
        ...location.state,
        from: { pathname: value ? value : location.pathname },
      },
    });
};

export default useNavigateWithState;
