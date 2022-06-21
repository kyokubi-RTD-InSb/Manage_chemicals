import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/store";
import {
  editChemAmount,
  selectChemPostInfo,
} from "../../../features/chemical/chemicalSlice";

export const ChemAmountField = () => {
  const dispatch: AppDispatch = useDispatch();
  const chemPostInfo = useSelector(selectChemPostInfo);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(editChemAmount(Number(event.target.value)));
  };

  return (
    <>
      <TextField
        type="number"
        onChange={handleChange}
        label="使用量[g]"
        // value={chemPostInfo.chemAmount}
        inputProps={{min: 0}}
        sx={{ marginBottom: "20px", width: "150px" }}
      />
    </>
  );
};
