import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/store";
import {
  editChemPostAmount,
  selectChemPutInfo,
  selectChemPostInfo,
  editChemPutAmount,
} from "../../../features/chemical/chemicalSlice";

interface PROPS_AMOUNT_FIELD {
  is_edit: boolean;
}

export const ChemAmountField = (props: PROPS_AMOUNT_FIELD) => {
  const { is_edit } = props;

  const dispatch: AppDispatch = useDispatch();
  const chemPostInfo = useSelector(selectChemPostInfo);
  const chemEditInfo = useSelector(selectChemPutInfo)

  const handlePostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(editChemPostAmount(Number(event.target.value)));
  };

  const handlePutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(editChemPutAmount(Number(event.target.value)));
  };

  return (
    <>
      {is_edit ? (
        <TextField
        type="number"
        onChange={handlePutChange}
        label="使用量[g]"
        value={chemEditInfo.used_amount}
        inputProps={{ min: 0 }}
        sx={{ marginBottom: "20px", width: "150px" }}
      />
      ) : (
        <TextField
        type="number"
        onChange={handlePostChange}
        label="使用量[g]"
        value={chemPostInfo.chemAmount}
        inputProps={{ min: 0 }}
        sx={{ marginBottom: "20px", width: "150px" }}
      />
      )}
    </>
  );
};
