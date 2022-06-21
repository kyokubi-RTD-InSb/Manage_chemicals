import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/store";
import {
  editDay,
  editMonth,
  editYear,
  selectChemPostInfo,
} from "../../../features/chemical/chemicalSlice";

export const ChemDateField = () => {
  const dispatch: AppDispatch = useDispatch();

  const chemPostInfo = useSelector(selectChemPostInfo);

  const getFormatedMonth = () =>
    chemPostInfo.month < 10 ? `0${chemPostInfo.month}` : chemPostInfo.month;
  const getFormatedDay = () =>
    chemPostInfo.day < 10 ? `0${chemPostInfo.day}` : chemPostInfo.day;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value.split("-");
    dispatch(editYear(Number(date[0])));
    dispatch(editMonth(Number(date[1])));
    dispatch(editDay(Number(date[2])));
  };

  return (
    <>
      <input
        type="date"
        defaultValue={`${
          chemPostInfo.year
        }-${getFormatedMonth()}-${getFormatedDay()}`}
        onChange={handleChange}
        style={{
          padding: '5px 10px',
          width: '120px',
          height: "40px",
          fontSize: "14px",
          fontWeight: "600",
          marginBottom: "20px",
        }}
      />
    </>
  );
};
