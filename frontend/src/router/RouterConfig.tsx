import { useLayoutEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Header } from "../components/header/Header";
import { Auth } from "../features/auth/Auth";
import { Chemical } from "../features/chemical/Chemical";
import { ChemicalRegister } from "../features/chemical/ChemicalRegister";
import { Core } from "../features/core/Core";
import { Date } from "../features/date/Date";
import { DateDetail } from "../features/date/DateDetail";
import { User } from "../features/user/User";

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
            <Route path="/chemical/" element={<Chemical />} />
          </Routes>
        </Wrapper>
        <>
          <Auth />
          <ChemicalRegister />
        </>
      </BrowserRouter>
    </>
  );
};
