import { Button, Modal, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncFetchJWTToken,
  endIsAuthLoading,
  endSignIn,
  endSignUp,
  selectOpenSignIn,
  selectOpenSignUp,
  startIsAuthLoading,
  startSignIn,
  startSignUp,
} from "./authSlice";

import styles from "./auth.module.scss";
import { useState } from "react";
import { AppDispatch } from "../../app/store";
import {
  asyncGetAllUsers,
  asyncGetMyProfile,
  asyncGetMyUser,
  asyncUserCreate,
  selectMyprofile,
} from "../user/userSlice";
import {
  asyncGetAllChemicalNames,
  asyncGetAllChemicals,
  asyncGetAllChemicalShippedFor,
} from "../chemical/chemicalSlice";
import { asyncGetAllDate, asyncGetAllYearAndMonth } from "../date/dateSlice";

export const Auth = () => {
  const openSignIn = useSelector(selectOpenSignIn);
  const openSignUp = useSelector(selectOpenSignUp);
  const dispatch: AppDispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorSignIn, setErrorSignIn] = useState("");
  const [errorSignUp, setErrorSignUp] = useState("");

  const myprofile = useSelector(selectMyprofile);

  const user_info = { username: username, password: password };

  return (
    <>
      <Modal open={openSignIn}>
        <Box className={styles.modal}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "70%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <h3 className={styles.auth__title}>ログイン</h3>
              {errorSignIn !== "" && (
                <span style={{ color: "red", marginBottom: "10px" }}>
                  {errorSignIn}
                </span>
              )}
              <TextField
                type="text"
                variant="standard"
                label="ユーザー名"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                fullWidth
                sx={{ marginBottom: "30px" }}
                error={errorSignIn !== ""}
              />
              <TextField
                type="password"
                variant="standard"
                label="パスワード"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                fullWidth
                sx={{ marginBottom: "30px" }}
                error={errorSignIn !== ""}
              />
              <Button
                variant="contained"
                fullWidth
                sx={{ marginBottom: "20px" }}
                disabled={username === "" || password === ""}
                onClick={async () => {
                  await dispatch(startIsAuthLoading());
                  const res = await dispatch(asyncFetchJWTToken(user_info));
                  if (asyncFetchJWTToken.fulfilled.match(res)) {
                    await dispatch(asyncGetMyProfile());
                    await dispatch(asyncGetMyUser(myprofile[0].userProfile));
                    await dispatch(asyncGetAllYearAndMonth());
                    await dispatch(asyncGetAllDate());
                    await dispatch(asyncGetAllUsers());
                    await dispatch(asyncGetAllChemicalNames());
                    await dispatch(asyncGetAllChemicals());
                    await dispatch(asyncGetAllChemicalShippedFor());
                    await dispatch(endSignIn());
                    await dispatch(endSignUp());
                    await dispatch(endIsAuthLoading());
                  } else if (asyncFetchJWTToken.rejected.match(res)) {
                    await setErrorSignIn("入力情報に誤りがあります");
                    await dispatch(endIsAuthLoading());
                  }
                }}
              >
                ログイン
              </Button>
              <span
                className={styles.auth__tips}
                onClick={async () => {
                  await dispatch(startSignUp());
                  await dispatch(endSignIn());
                }}
              >
                登録はこちら
              </span>
            </Box>
          </Box>
        </Box>
      </Modal>
      <Modal open={openSignUp}>
        <Box className={styles.modal}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "70%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <h3 className={styles.auth__title}>ユーザー登録</h3>
              {errorSignUp !== "" && (
                <span style={{ color: "red", marginBottom: "10px" }}>
                  {errorSignUp}
                </span>
              )}
              <TextField
                type="text"
                variant="standard"
                label="ユーザー名"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                fullWidth
                sx={{ marginBottom: "30px" }}
                error={errorSignUp !== ""}
              />
              <TextField
                type="password"
                variant="standard"
                label="パスワード"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                fullWidth
                sx={{ marginBottom: "30px" }}
                // error={errorSignUp !== ""}
              />
              <Button
                variant="contained"
                fullWidth
                sx={{ marginBottom: "20px" }}
                disabled={username === "" || password === ""}
                onClick={async () => {
                  await dispatch(startIsAuthLoading());
                  const res = await dispatch(asyncUserCreate(user_info));
                  if (asyncUserCreate.fulfilled.match(res)) {
                    await dispatch(asyncFetchJWTToken(user_info));
                    await dispatch(asyncGetMyProfile());
                    await dispatch(asyncGetAllYearAndMonth());
                    await dispatch(asyncGetAllDate());
                    await dispatch(asyncGetAllUsers());
                    await dispatch(asyncGetAllChemicalNames());
                    await dispatch(asyncGetAllChemicals());
                    await dispatch(asyncGetAllChemicalShippedFor());
                    await dispatch(endSignIn());
                    await dispatch(endSignUp());
                    await dispatch(endIsAuthLoading());
                  } else if (asyncUserCreate.rejected.match(res)) {
                    await setErrorSignUp(
                      "このユーザーネームは使用されています"
                    );
                    await dispatch(endIsAuthLoading());
                  }
                }}
              >
                登録
              </Button>
              <span
                className={styles.auth__tips}
                onClick={async () => {
                  await dispatch(startSignIn());
                  await dispatch(endSignUp());
                }}
              >
                アカウントをお持ちですか?
              </span>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
