import { Box } from "@mui/system";
import { PROPS_ALL_CHEMICALS } from "../../../types/chemical_types";
import { DateChemTable } from "../molecules/DateChemTable";

interface PROPS_DATE_CHEM_TITLE {
  chem_name: string;
  chem_name_id: number;
  this_month_chems: Array<PROPS_ALL_CHEMICALS>;
}

export const DateChemCard = (props: PROPS_DATE_CHEM_TITLE) => {
  const { chem_name, chem_name_id, this_month_chems } = props;

  const relatedChems = this_month_chems.filter((chem) => {
    return chem.name === chem_name_id;
  });

  return (
    <Box
      my={2}
      py={2}
      px={1}
      sx={{ backgroundColor: "rgb(0 165 255 / 12%)", borderRadius: "20px" }}
    >
      <h3 style={{ padding: "0 0 20px 20px", letterSpacing: '1px', 'fontWeight': '100', fontSize: '20px' }}>{chem_name}</h3>
      <DateChemTable related_chems={relatedChems} chem_name={chem_name} />
    </Box>
  );
};
