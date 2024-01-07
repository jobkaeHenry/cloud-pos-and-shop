import ReactDOM from "react-dom/client";
import App from "./App";

import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { 분 } from "./const/time";
import { RecoilRoot } from "recoil";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import OverrideCSS from "./const/overrideCss";
import theme from "./const/theme";
import GlobalToast from "./components/Modal/GlobalToast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: 5 * 분,
    },
  },
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles styles={OverrideCSS} />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalToast />
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </RecoilRoot>
);
