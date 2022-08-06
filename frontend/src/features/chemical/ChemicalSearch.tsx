import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { ChemSearchTable } from "../../components/chemical/molecules/ChemSearchTable";
import { DateChemCard } from "../../components/date/organisms/DateChemCard";
import { selectAllChemicals } from "./chemicalSlice";

export const ChemicalSearch = () => {
  const allChemicals = useSelector(selectAllChemicals);

  const related_chemicals = allChemicals.filter((chem) => {
    return chem.is_registerd === false;
  });

  return (
    <Box px={4} py={3}>
      <h2>未登録の廃液</h2>
      {related_chemicals.length === 0 ? (
        <Box
          sx={{
            width: "100%",
            height: "85vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box pb={10} fontSize={25}>未登録の廃液はありません</Box>
        </Box>
      ) : (
        <ChemSearchTable related_chems={related_chemicals} />
      )}
    </Box>
  );
};
