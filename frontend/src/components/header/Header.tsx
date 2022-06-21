import { Box } from "@mui/system";
import { HeaderItems } from "./organisms/HeaderItems";
import { HeaderTitle } from "./organisms/HeaderTitle";

export const headerHeight = "65px";

export const Header = () => {
  return (
    <Box
      height={headerHeight}
      sx={{
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
      }}
    >
      <Box
        sx={{
          position: "fixed",
          backgroundColor: "#ffffffcc",
          width: "100%",
          height: headerHeight,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: 'solid 1px #c3c3c3',
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "95%",
          }}
        >
          <HeaderTitle />
          <HeaderItems />
        </Box>
      </Box>
    </Box>
  );
};
