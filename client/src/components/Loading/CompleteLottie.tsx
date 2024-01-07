import completeLottie from "../../assets/completeLottie.json";
import Lottie, { LottieComponentProps } from "lottie-react";

interface Props extends Omit<LottieComponentProps, "animationData"> {}

const CompleteLottie = ({ loop = false, ...otherProps }: Props) => {
  return <Lottie animationData={completeLottie} loop={loop} {...otherProps} />;
};

export default CompleteLottie;
