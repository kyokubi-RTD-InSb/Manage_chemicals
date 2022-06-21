import { Box } from "@mui/system";

interface PROPS_ITEM {
  children: any;
}

export const Item = (props: PROPS_ITEM) => {
  const { children } = props;
  return (
    <Box
      width="200px"
      minHeight="100%"
      display="flex"
      alignItems="center"
      py={1}
    >
      <p>{children}</p>
    </Box>
  );
};
