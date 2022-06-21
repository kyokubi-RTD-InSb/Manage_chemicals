import { Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import { AppDispatch } from "./app/store";
import { headerHeight } from "./components/header/Header";
import { endSignIn, endSignUp, startSignIn } from "./features/auth/authSlice";
import {
  asyncGetAllChemicalNames,
  asyncGetAllChemicals,
} from "./features/chemical/chemicalSlice";
import {
  asyncGetAllDate,
  asyncGetAllYearAndMonth,
} from "./features/date/dateSlice";
import { asyncGetAllUsers, asyncGetMyProfile } from "./features/user/userSlice";
import { RouterConfig } from "./router/RouterConfig";

function App() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const fetchBootLoader = async () => {
      const res = await dispatch(asyncGetAllDate());
      if (asyncGetAllDate.fulfilled.match(res)) {
        dispatch(asyncGetAllYearAndMonth());
        dispatch(asyncGetMyProfile());
        dispatch(asyncGetAllUsers());
        dispatch(asyncGetAllChemicalNames());
        dispatch(asyncGetAllChemicals());
        dispatch(endSignIn());
        dispatch(endSignUp());
      } else {
        dispatch(startSignIn());
      }
    };
    fetchBootLoader();
  }, [dispatch, window]);

  return (
    <div className="App">
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "white",
          paddingTop: headerHeight,
        }}
      >
        <RouterConfig />
      </Box>
    </div>
  );
}

export default App;
