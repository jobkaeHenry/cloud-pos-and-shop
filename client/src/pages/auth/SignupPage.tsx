import { ChangeEvent, useCallback, useState } from "react";
import useMultistepForm from "../../hooks/useMultistepForm";
import SignupRequirement from "../../types/SignupRequirement";
import SignupPageContext from "../../features/auth/context/SignupContext";
import { LinearProgress } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FixedBottomCTA from "../../components/Atom/FixedBottomCTA";
import CustomContainer from "../../components/Layout/CustomContainer";
import CustomAppbar from "../../components/Layout/CustomAppbar";
import { useNavigate } from "react-router";
import useSignupMutation from "../../features/auth/api/useSignupMutation";
import UserIdStep from "../../features/auth/component/signupStepElement/UserIdStep";
import PasswordStep from "../../features/auth/component/signupStepElement/PasswordStep";
import DoubleCheckPasswordStep from "../../features/auth/component/signupStepElement/DoubleCheckPasswordStep";
import ShopNameStep from "../../features/auth/component/signupStepElement/ShopNameStep";

const SignupPage = () => {
  const [disableBtn, setDisableBtn] = useState(false);
  const [formData, setFormData] = useState<SignupRequirement>({
    userId: "",
    password: "",
    shopName: "",
  });

  const [doubleCheckPassword, setDoubleCheckPassword] = useState<string>("");

  const changeHandler = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [target.name]: target.value }));
    },
    []
  );

  const navigate = useNavigate();

  const { mutateAsync: signupHandler } = useSignupMutation();
  const submitHandler = useCallback(async (data: SignupRequirement) => {
    try {
      await signupHandler(data);
    } catch (err) {
      goTo(0);
    }
  }, []);

  const {
    MultistepForm,
    currentIndex,
    totalPageNum,
    isLastStep,
    isFirstStep,
    next,
    goTo,
  } = useMultistepForm(
    [
      <UserIdStep onChange={changeHandler} value={formData.userId} />,
      <PasswordStep onChange={changeHandler} value={formData.password} />,
      <DoubleCheckPasswordStep
        onChange={({ target }) => setDoubleCheckPassword(target.value)}
        value={doubleCheckPassword}
        error={
          doubleCheckPassword
            ? !new RegExp(
                /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
              ).test(doubleCheckPassword) ||
              doubleCheckPassword !== formData.password
            : undefined
        }
      />,
      <ShopNameStep onChange={changeHandler} value={formData.shopName} />,
    ],
    0
  );

  return (
    <SignupPageContext.Provider
      value={{ formData, setFormData, disableBtn, setDisableBtn }}
    >
      <CustomContainer>
        <CustomAppbar
          appendButton={"취소"}
          prependButton={isFirstStep ? <HomeIcon sx={{ p: 0 }} /> : undefined}
          onClickPrepend={() => (isFirstStep ? navigate("/") : navigate(-1))}
          onClickAppend={() => navigate("/")}
        />
        <LinearProgress
          variant="determinate"
          value={(currentIndex / (totalPageNum - 1)) * 100}
        />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            !isLastStep ? next() : submitHandler(formData);
          }}
        >
          {MultistepForm}
          <FixedBottomCTA type="submit" size="large" disabled={disableBtn}>
            {!isLastStep ? "다음" : "클라우드 포스 시작하기"}
          </FixedBottomCTA>
        </form>
      </CustomContainer>
    </SignupPageContext.Provider>
  );
};

export default SignupPage;
