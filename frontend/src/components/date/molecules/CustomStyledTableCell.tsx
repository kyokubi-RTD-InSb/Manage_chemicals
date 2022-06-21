import { useSelector } from "react-redux";
import {
  selectAllDate,
  selectAllYearAndMonth,
} from "../../../features/date/dateSlice";
import { selectAllUsers } from "../../../features/user/userSlice";
import { PROPS_ALL_CHEMICALS } from "../../../types/chemical_types";
import { StyledTableCell } from "./DateChemTable";

interface PROPS_CUSTOM_CELL {
  chemical: PROPS_ALL_CHEMICALS;
  is_user: boolean;
  is_date: boolean;
}

export const CustomStyledTableCell = (props: PROPS_CUSTOM_CELL) => {
  const { chemical, is_user, is_date } = props;

  const allUsers = useSelector(selectAllUsers);
  const allDates = useSelector(selectAllDate);
  const allYearAndMonth = useSelector(selectAllYearAndMonth);

  const relatedUser = allUsers.find((user) => {
    return chemical.used_user === user.id;
  });

  const relatedDate = allDates.find((date) => {
    return chemical.used_date === date.id;
  });

  const relatedYearAndMonth = allYearAndMonth.find(
    (ym) => ym.id === relatedDate?.year_and_month
  );

  return (
    <>
      {is_user && (
        <StyledTableCell component="th" scope="row">
          {relatedUser?.username}
        </StyledTableCell>
      )}
      {is_date && (
        <StyledTableCell align="right">
          {`${relatedYearAndMonth?.create_month}月${relatedDate?.create_day}日`}
        </StyledTableCell>
      )}
    </>
  );
};
