import Pretendard from "@/assets/font/Pretendard";

const DefaultThemeOption = {
  typography: {
    fontFamily: Pretendard.style.fontFamily,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        variant: "contained",
      },
      styleOverrides: {
        contained: {
          ":disabled": {
            backgroundColor: "#F5F5F5",
            color: "#8A8A8A",
          },
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: { root: { gap: 4, borderRadius: 8 } },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          color: "#1C1C1C",
          backgroundColor: "#fefefe",
        },
      },
      defaultProps: {
        elevation: 1,
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          cursor: "pointer",
        },
      },
    },
  },
} as const;

export default DefaultThemeOption;
