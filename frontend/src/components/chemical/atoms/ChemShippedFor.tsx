import { MenuItem, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/store";
import {
  editChemPostShippedFor,
  selectAllShippedFor,
  selectChemPutInfo,
  selectChemPostInfo,
  editChemPutShippedFor,
} from "../../../features/chemical/chemicalSlice";


interface PROPS_SHIP_FIELD {
  is_edit: boolean;
}

export const ChemShippedFor = (props: PROPS_SHIP_FIELD) => {
  const { is_edit } = props;

  const dispatch: AppDispatch = useDispatch();
  const chemPostInfo = useSelector(selectChemPostInfo);
  const chemEditInfo = useSelector(selectChemPutInfo)
  const allShippedFor = useSelector(selectAllShippedFor);

  const handlePostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(editChemPostShippedFor(event.target.value));
  };

  const handlePutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(editChemPutShippedFor(event.target.value));
  };

  return (
    <>
      {is_edit ? (
        <TextField
        select
        value={chemEditInfo.shipped_for}
        onChange={handlePutChange}
        label="廃液先"
        fullWidth
        sx={{ marginBottom: "20px" }}
      >
        {allShippedFor.map((chem) => (
          <MenuItem key={chem.id} value={chem.id}>
            {chem.shipped_for}
          </MenuItem>
        ))}
      </TextField>
      ) : (
        <TextField
        select
        value={chemPostInfo.chemShippedFor}
        onChange={handlePostChange}
        label="廃液先"
        fullWidth
        sx={{ marginBottom: "20px" }}
      >
        {allShippedFor.map((chem) => (
          <MenuItem key={chem.id} value={chem.id}>
            {chem.shipped_for}
          </MenuItem>
        ))}
      </TextField>
      )}
    </>
  );
};
