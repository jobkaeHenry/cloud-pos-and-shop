type Props = {
  message?: string;
};

export const NotifyMessage = ({
  message = "알 수 없는 에러가 발생했습니다",
}: Props) => {
  return (
    <div className="w-fit py-1 px-2 text-gray-400 border border-gray-400 rounded bg-white text-center mx-auto">
      {message}
    </div>
  );
};

const ErrorMessage = ({
  message = "알 수 없는 에러가 발생했습니다",
}: Props) => {
  return (
    <div className="w-fit py-1 px-2 text-red-500 border border-red-500 rounded bg-white text-center mx-auto">
      {message}
    </div>
  );
};

export default ErrorMessage;
