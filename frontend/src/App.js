import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import PostDisplay from "scenes/postDisplayPage";
import { CircularProgress } from "@mui/material";

function App() {
  const mode = useSelector((state) => state.mode);
  const [isLoading, setIsLoading]=useState(true)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="loading-spinner-container">
      <div className="loading-spinner-content">
        <span className="loading-text">SHARE</span>
        <CircularProgress size={50} thickness={3} />
      </div>
      <p className="loading-moving-text">...making your life count</p>
    </div>
    );
  }


  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
           <Route path="/posts/:postId" element={<PostDisplay /> } />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;




