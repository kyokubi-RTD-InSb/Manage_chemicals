import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

import { PROPS_YEAR_AND_MONTH } from "../../types/date_types";
import { selectAllYearAndMonth } from "./dateSlice";

export const Date = () => {
  const allYearAndMonth: Array<PROPS_YEAR_AND_MONTH> = useSelector(
    selectAllYearAndMonth
  );

  const today = new window.Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  return (
    <Box px={4} py={3}>
      <h2>過去の廃液</h2>
      {allYearAndMonth.map((ym) => (
        <Link
          to={`/date/${ym.id}/`}
          key={ym.id}
          style={{ textDecoration: "none" }}
        >
          <Box
            sx={{
              display: "flex",
              color: "black",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            <p>・{ym.create_year}年</p>
            <p>{ym.create_month}月</p>
            {year === ym.create_year && month === ym.create_month && (
              <Box
                sx={{ display: "flex", alignItems: "center", color: "#0065ff" }}
              >
                <KeyboardDoubleArrowLeftIcon />
                <p>今月</p>
              </Box>
            )}
          </Box>
        </Link>
      ))}
    </Box>
  );
};
