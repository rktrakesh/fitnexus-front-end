import { useContext, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router";
import { AuthContext } from "react-oauth2-code-pkce";
import { setCredentials } from "./store/authSlice";
import { Box } from "@mui/material";
import ActivityForm from "./conponent/ActivityForm";
import { ActivityList } from "./conponent/ActivityList";
import ActivityDetail from "./conponent/ActivityDetail";
import "./app.css";

const ActivityBody = () => {
  return (
    <Box component="section" sx={{ p: 2, border: "1px dashed grey" }}>
      <ActivityForm onAcrivityAdded={() => window.location.reload()} />
      <ActivityList />
    </Box>
  );
};

function App() {
  const { token, tokenData, logIn, logOut, isAuthenticated } =
    useContext(AuthContext);
  const dispatch = useDispatch();
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(setCredentials({ token, user: tokenData }));
      setAuthReady(true);
      localStorage.setItem("user", JSON.stringify(tokenData));
      localStorage.setItem("token", token);
      localStorage.setItem("userId", tokenData.sub);
    } else {
      logOut();
    }
  }, [token, tokenData, dispatch]);

  return (
    <>
      <h1>FitNexus</h1>
      <Router>
        {!token ? (
          <Button
            variant="contained"
            sx={{ backgroundColor: "#696969" }}
            onClick={() => {
              logIn();
            }}
          >
            LogIn
          </Button>
        ) : (
          <div>
            {/* <pre>{JSON.stringify(tokenData, null, 2)}</pre>
          <pre>{JSON.stringify(tokenData.sub, null, 2)}</pre> */}
            <Box component="section" sx={{ p: 2, border: "1px dashed grey" }}>
              <Routes>
                <Route path="/activities" element={<ActivityBody />} />
                <Route path="/activities/:id" element={<ActivityDetail />} />
                <Route
                  path="/"
                  element={
                    token ? (
                      <Navigate to="/activities" replace />
                    ) : (
                      <div>Welcome, Please login.</div>
                    )
                  }
                />
              </Routes>
            </Box>
          </div>
        )}
      </Router>
    </>
  );
}

export default App;
