"use client";

import {
  CssBaseline,
  GlobalStyles,
  ThemeOptions,
  ThemeProvider,
  createTheme,
} from "@mui/material";

import { ReactNode } from "react";
import OverrideCSS from "@/const/overrideCSS";
import DefaultThemeOption from "@/feature/theme/const/DefaultThemeOption";

type Props = {
  themeOptions: ThemeOptions;
  children: ReactNode;
};

const CustomThemeProvider = ({ themeOptions, children }: Props) => {
  const theme = createTheme({
    ...DefaultThemeOption,
    ...themeOptions,
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={OverrideCSS} />
      {children}
    </ThemeProvider>
  );
};

export default CustomThemeProvider;
