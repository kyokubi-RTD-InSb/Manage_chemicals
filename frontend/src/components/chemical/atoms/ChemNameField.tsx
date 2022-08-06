import { MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/store";
import {
  editChemPostName,
  selectAllChemicalNames,
  selectChemPutInfo,
  selectChemPostInfo,
  editChemPutName,
} from "../../../features/chemical/chemicalSlice";

interface PROPS_NAME_FIELD {
  is_edit: boolean;
}

export const ChemNameField = (props: PROPS_NAME_FIELD) => {
  const { is_edit } = props;

  const dispatch: AppDispatch = useDispatch();
  const allChemName = useSelector(selectAllChemicalNames);
  const chemPostInfo = useSelector(selectChemPostInfo);
  const chemEditInfo = useSelector(selectChemPutInfo);

  const handlePostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(editChemPostName(event.target.value));
  };

  const handlePutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(editChemPutName(event.target.value));
  };

  return (
    <>
      {is_edit ? (
        <TextField
          select
          value={chemEditInfo.name}
          onChange={handlePutChange}
          label="薬品名"
          fullWidth
          sx={{ marginBottom: "20px" }}
        >
          {allChemName.map((chem) => (
            <MenuItem key={chem.id} value={chem.id}>
              {chem.name}
            </MenuItem>
          ))}
        </TextField>
      ) : (
        <TextField
          select
          value={chemPostInfo.chemName}
          onChange={handlePostChange}
          label="薬品名"
          fullWidth
          sx={{ marginBottom: "20px" }}
        >
          {allChemName.map((chem) => (
            <MenuItem key={chem.id} value={chem.id}>
              {chem.name}
            </MenuItem>
          ))}
        </TextField>
      )}
    </>
  );
};
