import { MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/store";
import {
  editChemName,
  selectAllChemicalNames,
  selectChemPostInfo,
} from "../../../features/chemical/chemicalSlice";

export const ChemNameField = () => {
  const dispatch: AppDispatch = useDispatch();
  const allChemName = useSelector(selectAllChemicalNames);
  const chemPostInfo = useSelector(selectChemPostInfo);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(editChemName(event.target.value));
  };

  return (
    <>
      <TextField
        select
        value={chemPostInfo.chemName}
        onChange={handleChange}
        label="薬品名"
        fullWidth
        sx={{marginBottom: "20px"}}
      >
        {allChemName.map((chem) => (
          <MenuItem key={chem.id} value={chem.id}>
            {chem.name}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
};
