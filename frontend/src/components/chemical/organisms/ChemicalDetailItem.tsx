import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { selectAllDate } from "../../../features/date/dateSlice";
import { selectAllUsers } from "../../../features/user/userSlice";
import { PROPS_ALL_CHEMICALS } from "../../../types/chemical_types";
import { Item } from "../atoms/Item";

export const ChemicalDetailItem = (props: PROPS_ALL_CHEMICALS) => {
  const { name, used_date, used_user, used_amount, updated_at, created_at } =
    props;

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      
    </Box>
  );
};
