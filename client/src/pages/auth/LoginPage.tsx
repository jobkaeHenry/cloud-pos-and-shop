import useLoginMutation from "./../../features/auth/api/useLoginMutation";
import LoginForm from "../../features/auth/component/login/LoginForm";

const LoginPage = () => {
  const { mutateAsync: loginHandler } = useLoginMutation();

  return (
    <div className="flex flex-row w-full justify-center  bg-gray-100 md:bg-white">
      <div className="flex-grow-1-1 w-full hidden md:block bg-[url('https://cdn.pixabay.com/photo/2016/10/10/22/37/credit-card-1730085_960_720.jpg')] bg-no-repeat bg-cover bg-center" />
      <main className="bg-white p-8 py-24 rounded shadow-md min-h-screen w-full md:max-w-lg">
        <LoginForm onSubmit={loginHandler} />
      </main>
    </div>
  );
};

export default LoginPage;
