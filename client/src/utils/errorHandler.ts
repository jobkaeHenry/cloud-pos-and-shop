import { isAxiosError } from "axios";

const errorHandler = (error: Error) => {
  if (isAxiosError(error)) {
    if (error.response.status === 400) {
      alert("올바르지 않은 입력값입니다");
    }
  }
};

export default errorHandler;
