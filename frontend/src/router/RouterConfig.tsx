import { useLayoutEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Header } from "../components/header/Header";
import { Auth } from "../features/auth/Auth";
import { ChemicalSearch } from "../features/chemical/ChemicalSearch";
import { ChemicalEdit } from "../features/chemical/ChemicalEdit";
import { ChemicalRegister } from "../features/chemical/ChemicalRegister";
import { Core } from "../features/core/Core";
import { Date } from "../features/date/Date";
import { DateDetail } from "../features/date/DateDetail";

export const RouterConfig = () => {
  const Wrapper = (props: any) => {
    const { children } = props;
    const location = useLocation();
    useLayoutEffect(() => {
      document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children;
  };

  return (
    <>
      <BrowserRouter>
        <Header />
        <Wrapper>
          <Routes>
            <Route index element={<Core />} />
            <Route path="/date/" element={<Date />} />
            <Route
              path="/date/:date_id/"
              element={<DateDetail use_top_page={false} />}
            />
            <Route path="/search/" element={<ChemicalSearch />} />
          </Routes>
        </Wrapper>
        <>
          <Auth />
          <ChemicalRegister />
          <ChemicalEdit />
        </>
      </BrowserRouter>
    </>
  );
};
