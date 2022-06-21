import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../app/store";
import { DateChemCard } from "../../components/date/organisms/DateChemCard";
import {
  selectAllChemicalNames,
  selectAllChemicals,
} from "../chemical/chemicalSlice";
import { selectAllDate, selectAllYearAndMonth } from "./dateSlice";

interface PROPS_DATE_DETAIL {
  use_top_page: boolean;
}

export const DateDetail = (props: PROPS_DATE_DETAIL) => {
  const { use_top_page } = props;

  const today = new window.Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  //指定月の年、月のプライマリーキー
  const yearAndMonthPk = Number(useParams().date_id);

  const allYearAndMonth = useSelector(selectAllYearAndMonth);
  const allDates = useSelector(selectAllDate);
  const allChemicals = useSelector(selectAllChemicals);
  const allChemNames = useSelector(selectAllChemicalNames);

  // 指定月の西暦と月
  const relatedMonthYearAndMonth = allYearAndMonth.find((ym) => {
    if (use_top_page) {
      return ym.create_year === year && ym.create_month === month;
    }
    return ym.id === yearAndMonthPk;
  });

  // 指定月の全日にち
  const relatedMonthDates = allDates.filter((date) => {
    return date.year_and_month === relatedMonthYearAndMonth?.id;
  });

  // 指定月の全日にちのプライマリーキー
  const relatedMonthDatesPk = relatedMonthDates.map((date) => {
    return date.id;
  });

  //　指定月の全廃液
  const relatedMonthChemicals = allChemicals.filter((chem) => {
    return relatedMonthDatesPk.includes(chem.used_date);
  });

  // 指定月の薬品名のリスト。つまり、使用された薬品名のプライマリーキー
  const usedChemPk = relatedMonthChemicals.map((chem) => {
    return chem.name;
  });

  const usedChemNames = allChemNames.filter((name) => {
    return usedChemPk.includes(name.id);
  });

  return (
    <Box px={4} py={3}>
      {!use_top_page && (
        <h2>
          {relatedMonthYearAndMonth?.create_year}年
          {relatedMonthYearAndMonth?.create_month}月の廃液
        </h2>
      )}
      {usedChemNames.length === 0 ? (
        <>
          {use_top_page ? (
            <Box
              sx={{
                width: "100%",
                height: "50vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h2>今月の廃液データはまだありません</h2>
            </Box>
          ) : (
            <Box
              sx={{
                width: "100%",
                height: "50vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h2>この月の廃液データはまだありません</h2>
            </Box>
          )}
        </>
      ) : (
        <>
          {usedChemNames.map((name) => (
            <DateChemCard
              key={name.id}
              chem_name={name.name}
              chem_name_id={name.id}
              this_month_chems={relatedMonthChemicals}
            />
          ))}
        </>
      )}
      {/* {usedChemNames.map((name) => (
        <DateChemCard
          key={name.id}
          chem_name={name.name}
          chem_name_id={name.id}
          this_month_chems={relatedMonthChemicals}
        />
      ))} */}
    </Box>
  );
};
