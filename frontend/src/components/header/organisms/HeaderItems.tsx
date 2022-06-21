import { IconButton, Menu, MenuItem } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";

import { HeaderItem } from "../molecules/HeaderItem";
import { selectMyprofile } from "../../../features/user/userSlice";
import styles from "../header.module.scss";
import { AppDispatch } from "../../../app/store";
import { startChemPost } from "../../../features/chemical/chemicalSlice";

export const HeaderItems = () => {
  const dispatch: AppDispatch = useDispatch();
  const myprofile = useSelector(selectMyprofile);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    localStorage.localJWT = "";
    window.location.href = "/";
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <Box className={styles.item} onClick={() => dispatch(startChemPost())}>
        廃液登録
      </Box>
      <HeaderItem path="/chemical/">薬品一覧</HeaderItem>
      <HeaderItem path="/date/">過去の廃液</HeaderItem>
      <div>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem disabled>{myprofile[0].username}でログイン中</MenuItem>
          <MenuItem onClick={handleLogout}>ログアウト</MenuItem>
        </Menu>
      </div>
    </Box>
  );
};
