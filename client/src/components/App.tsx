import Router from "../Router";
import GlobalStyle from "../styles/globalStyle";
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../styles/theme";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";
import { useEffect } from "react";
import { getToken } from "../api/stockApi";

function App() {
  const isDark = useRecoilValue(isDarkAtom);
  useEffect(() => {
    (async () => await getToken())();
  }, []);

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Router />
        <ReactQueryDevtools />
      </ThemeProvider>
    </>
  );
}

export default App;
