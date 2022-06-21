import { Collapse, ListItemButton, ListItemText } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectAllChemicals } from "../../../features/chemical/chemicalSlice";
import { selectAllDate } from "../../../features/date/dateSlice";
import { ChemicalDetailItem } from "./ChemicalDetailItem";

interface PROPS_CHEMICAL_CARD {
  chem_name: string;
}

export const ChemicalCard = (props: PROPS_CHEMICAL_CARD) => {
  const { chem_name } = props;

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();


  return (
    <Box pb={3}>
      
    </Box>
  );
};
