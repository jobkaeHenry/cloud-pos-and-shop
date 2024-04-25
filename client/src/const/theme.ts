import { createTheme } from "@mui/material";
//@ts-ignore
import Pretendard from "../assets/PretendardVariable.woff2";
import { BorderRight } from "@mui/icons-material";

const theme = createTheme({
  typography: {
    allVariants: {
      letterSpacing: "-0.01em",
      fontWeight: 400,
      fontFamily: "pretendard",
    },
    h1: {
      fontSize: "24px",
      lineHeight: "40px",
      letterSpacing: "0em",
    },
    h2: {
      fontSize: "22px",
      lineHeight: "32px",
    },
    subtitle1: {
      fontSize: "20px",
      lineHeight: "32px",
    },
    subtitle2: {
      fontSize: "18px",
      lineHeight: "24px",
    },
    body1: {
      fontSize: "16px",
      lineHeight: "18px",
    },
    button: {
      fontSize: "16px",
    },
    label: {
      fontSize: "14px",
      lineHeight: "16px",
      letterSpacing: "0em",
    },
    caption1: {
      fontSize: "12px",
      lineHeight: "16px",
    },
    caption2: {
      fontSize: "10px",
      lineHeight: "12px",
      letterSpacing: "0em",
    },

    fontWeightRegular: 400,
    fontWeightBold: 700,

    h4: undefined,
    h3: undefined,
    h5: undefined,
    h6: undefined,
    body2: undefined,
  },
  palette: {
    mode: "light",
    primary: {
      main: "#b61a85",
      light: "#e51994",
      dark: "#8e1879",
    },
    secondary: {
      main: "#0090a0",
    },
    error: {
      main: "#b61a37",
    },
    success: {
      main: "#85b61a",
    },
    warning: {
      main: "#ec6526",
    },
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
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "0 16px",
        },
      },
    },
    MuiCardMedia: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: "0 16px",
          backgroundColor: theme.palette.grey[200],
        }),
      },
    },
    MuiButtonBase: {
      styleOverrides: { root: { gap: 4, borderRadius: 8 } },
    },
    MuiSvgIcon: {
      styleOverrides: { root: { color: "#8A8A8A" } },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          color: "#1C1C1C",
          backgroundColor: "#fefefe",
        },
      },
      defaultProps: {
        elevation: 0,
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          cursor: "pointer",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          verticalAlign: "top",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'pretendard', sans-serif;
          src: url(${Pretendard}), format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
  },
});

declare module "@mui/material/styles" {
  interface TypographyVariants {
    label: React.CSSProperties;
    caption1: React.CSSProperties;
    caption2: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    label?: React.CSSProperties;
    caption1?: React.CSSProperties;
    caption2?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    label: true;
    caption1: true;
    caption2: true;
    h3: false;
    h4: false;
    h5: false;
    h6: false;
    caption: false;
    body2: false;
  }
}

export default theme;
