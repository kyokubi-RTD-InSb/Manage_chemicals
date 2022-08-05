import { MenuItem, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { editChemShippedFor, selectAllShippedFor, selectChemPostInfo } from "../../../features/chemical/chemicalSlice";

export const ChemShippedFor = () => {
  const dispatch: AppDispatch = useDispatch();
  const chemPostInfo = useSelector(selectChemPostInfo)
  const allShippedFor = useSelector(selectAllShippedFor)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(editChemShippedFor(event.target.value));
  };

  return (
    <>
      <TextField
        select
        value={chemPostInfo.chemShippedFor}
        onChange={handleChange}
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
    </>
  );
};
