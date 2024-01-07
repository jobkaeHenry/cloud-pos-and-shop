interface GetThemeOptionInteface {
  primaryColor?: string;
  secondaryColor?: string;
}
/**
 * PrimaryColor와 Secondary Color 을 입력받아 ThemeOptions 을 Return하는 훅
 */
const getThemeOption = ({
  primaryColor = "#00a5ba",
  secondaryColor = "#b61a84",
}: GetThemeOptionInteface) => {
  return {
    palette: {
      primary: {
        main: primaryColor,
        contrastText: "#fff",
      },
      secondary: {
        main: secondaryColor,
      },
      background: {
        default: "#F5F5F5",
        paper: "#fefefe",
      },
    },
  };
};

export default getThemeOption;
