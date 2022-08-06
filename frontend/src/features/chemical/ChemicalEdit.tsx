import { Button, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { AppDispatch } from "../../app/store";
import {
  asyncDeleteChemical,
  asyncGetAllChemicals,
  asyncPutChemical,
  endChemEdit,
  endChemLoading,
  selectAllChemicalNames,
  selectAllShippedFor,
  selectChemPutInfo,
  selectIsChemLoading,
  selectOpenChemEdit,
  startChemLoading,
} from "./chemicalSlice";
import styles from "../chemical/chemical.module.scss";
import { ChemNameField } from "../../components/chemical/atoms/ChemNameField";
import { ChemShippedFor } from "../../components/chemical/atoms/ChemShippedFor";
import { ChemAmountField } from "../../components/chemical/atoms/ChemAmountField";
import { ChemDateField } from "../../components/chemical/atoms/ChemDateField";
import { IsRegisterdSwitch } from "../../components/date/atom/IsRegisterdSwitch";
import { selectAllUsers, selectMyprofile } from "../user/userSlice";
import { useState } from "react";
import { selectAllDate, selectAllYearAndMonth } from "../date/dateSlice";

export const ChemicalEdit = () => {
  const [errorMsg, editErrorMsg] = useState("");
  const [open, setOpen] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const openChemEdit = useSelector(selectOpenChemEdit);
  const isChemLoading = useSelector(selectIsChemLoading);
  const chemPutInfo = useSelector(selectChemPutInfo);
  const allUsers = useSelector(selectAllUsers);
  const myprofile = useSelector(selectMyprofile);
  const allChemName = useSelector(selectAllChemicalNames);
  const allShippedFor = useSelector(selectAllShippedFor);
  const allDate = useSelector(selectAllDate);
  const allYearAndMonth = useSelector(selectAllYearAndMonth);

  const related_user = allUsers.find(
    (user) => user.id === chemPutInfo.used_user
  );

  const related_chemName = allChemName.find(
    (chem) => chem.id === chemPutInfo.name
  );
  const related_sihppedFor = allShippedFor.find(
    (sp) => sp.id === chemPutInfo.shipped_for
  );
  const related_date = allDate.find(
    (date) => date.id === chemPutInfo.used_date
  );
  const related_yearAndMonth = allYearAndMonth.find(
    (ym) => ym.id === related_date?.year_and_month
  );

  const onPutSubmit = async () => {
    await dispatch(startChemLoading());
    const res = await dispatch(asyncPutChemical(chemPutInfo));
    if (asyncPutChemical.fulfilled.match(res)) {
      await dispatch(asyncGetAllChemicals());
      await dispatch(endChemLoading());
      await dispatch(endChemEdit());
    } else {
      editErrorMsg("予期せぬエラーが発生しました。");
      console.log(errorMsg);
    }
  };

  const handleDelete = async (chem_id: string) => {
    await dispatch(asyncDeleteChemical(chem_id));
    await dispatch(asyncGetAllChemicals());
    await setOpen(false);
    await dispatch(endChemEdit());
  };

  return (
    <>
      <Modal open={openChemEdit}>
        <Box className={styles.modal}>
          <Box
            sx={{ cursor: "pointer" }}
            onClick={() => dispatch(endChemEdit())}
          >
            <CloseIcon />
          </Box>
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
                height: "100%",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <h3 style={{ paddingBottom: "40px" }}>廃液情報変更</h3>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  borderBottom: "solid 1px black",
                  paddingBottom: "10px",
                  marginBottom: "10px",
                }}
              >
                <Box sx={{ fontSize: "20px", fontWeight: "700" }} mr={2}>
                  使用者
                </Box>
                <Box sx={{ fontSize: "17px", fontWeight: "600" }}>
                  {related_user?.username}
                </Box>
              </Box>
              <ChemNameField is_edit={true} />
              <ChemShippedFor is_edit={true} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-around",
                  width: "100%",
                }}
              >
                <ChemAmountField is_edit={true} />
                <Box>
                  <p>登録済み</p>
                  <IsRegisterdSwitch
                    is_registerd={chemPutInfo.is_registerd}
                    is_edit={true}
                  />
                </Box>
              </Box>
              <Button
                variant="contained"
                fullWidth
                onClick={onPutSubmit}
                disabled={chemPutInfo.used_amount <= 0}
              >
                {isChemLoading ? <CircularProgress /> : <p>変更する</p>}
              </Button>
              <Button
                variant="contained"
                fullWidth
                color="error"
                onClick={() => setOpen(!open)}
                disabled={chemPutInfo.used_amount <= 0}
              >
                {isChemLoading ? <CircularProgress /> : <p>削除する</p>}
              </Button>
              <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  <Box sx={{ textAlign: "center" }}>
                    <p style={{ fontSize: "23px" }}>本当に削除しますか？</p>
                    <p style={{ fontSize: "13px", color: "red" }}>
                      削除したデータは復元できません
                    </p>
                  </Box>
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <p>使用者:&nbsp;</p>
                      <p>{myprofile[0].username}</p>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <p>薬品名:&nbsp;</p>
                      <p>{related_chemName?.name}</p>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <p>廃液先:&nbsp;</p>
                      <p>{related_sihppedFor?.shipped_for}</p>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <p>使用量:&nbsp;</p>
                      <p>{chemPutInfo.used_amount}(g)</p>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <p>使用日時:&nbsp;</p>
                      <p>
                        {related_yearAndMonth?.create_year}年
                        {related_yearAndMonth?.create_month}月{related_date?.create_day}日
                      </p>
                    </Box>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => handleDelete(chemPutInfo.id)}
                    sx={{ color: "red" }}
                  >
                    削除
                  </Button>
                  <Button onClick={() => setOpen(false)}>削除しない</Button>
                </DialogActions>
              </Dialog>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
