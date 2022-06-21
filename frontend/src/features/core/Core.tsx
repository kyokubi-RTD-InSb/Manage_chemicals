import { List, ListItemButton, ListItemText } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import { ChemicalCard } from "../../components/chemical/organisms/ChemicalCard";
import { selectAllChemicals } from "../chemical/chemicalSlice";
import { DateDetail } from "../date/DateDetail";
import { selectAllDate } from "../date/dateSlice";

export const Core = () => {
  const today = new window.Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1;
  const day = today.getDate()

  return (
    <>
      <Box px={4} pt={3}>
        <h2>今月の廃液</h2>
        <p>{`${year}年${month}月${day}日`}</p>
      </Box>
      <DateDetail use_top_page={true} />
    </>
  );
};
