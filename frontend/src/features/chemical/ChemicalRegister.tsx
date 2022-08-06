import { Button, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";

import { ChemAmountField } from "../../components/chemical/atoms/ChemAmountField";
import { ChemNameField } from "../../components/chemical/atoms/ChemNameField";
import styles from "../chemical/chemical.module.scss";
import {
  asyncCreateChemical,
  asyncGetAllChemicals,
  endChemLoading,
  endChemPost,
  resetChemPostInfo,
  selectChemPostInfo,
  selectIsChemLoading,
  selectOpenChemPost,
  startChemLoading,
} from "./chemicalSlice";
import { AppDispatch } from "../../app/store";
import { ChemDateField } from "../../components/chemical/atoms/ChemDateField";
import {
  asyncCreateDate,
  asyncCreateYearAndMonth,
  asyncGetAllDate,
  asyncGetAllYearAndMonth,
  selectAllDate,
  selectAllYearAndMonth,
} from "../date/dateSlice";
import { PROPS_POST_CHEMICAL } from "../../types/chemical_types";
import { selectMyprofile } from "../user/userSlice";
import { ChemShippedFor } from "../../components/chemical/atoms/ChemShippedFor";

export const ChemicalRegister = () => {
  const dispatch: AppDispatch = useDispatch();

  const openChemPost = useSelector(selectOpenChemPost);
  const chemPostInfo = useSelector(selectChemPostInfo);
  const allYearAndMonth = useSelector(selectAllYearAndMonth);
  const allDates = useSelector(selectAllDate);
  const myprofile = useSelector(selectMyprofile);
  const isChemLoading = useSelector(selectIsChemLoading);

  const getRelatedYearAndMonth = async (year: number, month: number) => {
    const relatedYearAndMonth = allYearAndMonth.find(
      (ym) => ym.create_year === year && ym.create_month === month
    );

    // yearとmonthがなかったら、作製する。
    if (relatedYearAndMonth === undefined) {
      const resYearAndMonth = await dispatch(
        asyncCreateYearAndMonth({
          create_year: year,
          create_month: month,
        })
      );
      //作製成功時
      if (asyncCreateYearAndMonth.fulfilled.match(resYearAndMonth)) {
        // 関数内での実行のためredux stateが更新されないため
        const newAllYearAndMonth = await dispatch(asyncGetAllYearAndMonth());
        const result = newAllYearAndMonth.payload.find(
          (ym: any) => ym.create_year === year && ym.create_month === month
        );
        return result;
      }
    }
    return relatedYearAndMonth;
  };

  const getRelatedDate = async (ym_id: number, day: number) => {
    const relatedDate = allDates.find(
      (date) => date.year_and_month === ym_id && date.create_day === day
    );

    // ym_idとdayの組み合わせが無いとき、作製する。
    if (relatedDate === undefined) {
      const resDate = await dispatch(
        asyncCreateDate({ year_and_month: ym_id, create_day: day })
      );
      //作製成功時
      if (asyncCreateDate.fulfilled.match(resDate)) {
        // 関数内での実行のためredux stateが更新されないため
        const newAllDate = await dispatch(asyncGetAllDate());
        const result = newAllDate.payload.find(
          (date: any) =>
            date.year_and_month === ym_id && date.create_day === day
        );
        return result;
      }
    }
    return relatedDate;
  };

  const onSubmit = async () => {
    await dispatch(startChemLoading());
    // yearとmonthを取得
    const relatedYearAndMonth = await getRelatedYearAndMonth(
      chemPostInfo.year,
      chemPostInfo.month
    );
    // Dateを取得
    const relatedDate =
      relatedYearAndMonth !== undefined &&
      (await getRelatedDate(relatedYearAndMonth?.id, chemPostInfo.day));

    const postData: PROPS_POST_CHEMICAL = {
      name: chemPostInfo.chemName,
      used_amount: chemPostInfo.chemAmount,
      used_date: relatedDate.id,
      used_user: myprofile[0].userProfile,
      shipped_for: chemPostInfo.chemShippedFor,
    };

    const res = await dispatch(asyncCreateChemical(postData));

    if (asyncCreateChemical.fulfilled.match(res)) {
      await dispatch(asyncGetAllYearAndMonth());
      await dispatch(asyncGetAllDate());
      await dispatch(asyncGetAllChemicals());
      await dispatch(resetChemPostInfo());
      await dispatch(endChemLoading());
      await dispatch(endChemPost());
    }
  };

  return (
    <>
      <Modal open={openChemPost}>
        <Box className={styles.modal}>
          <Box
            sx={{ cursor: "pointer" }}
            onClick={() => dispatch(endChemPost())}
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
              <h3 style={{ paddingBottom: "40px" }}>廃液登録</h3>
              <ChemNameField is_edit={false} />
              <ChemShippedFor is_edit={false} />
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
                <ChemAmountField is_edit={false} />
                <ChemDateField />
              </Box>
              <Button
                variant="contained"
                fullWidth
                onClick={onSubmit}
                disabled={chemPostInfo.chemAmount <= 0}
              >
                {isChemLoading ? <CircularProgress /> : <p>登録</p>}
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
