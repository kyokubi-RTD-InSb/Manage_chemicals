import { Box } from "@mui/system";
import { Link } from "react-router-dom";

import styles from "../header.module.scss";

interface PROPS_HEADER_ITEM {
  children: any;
  path: string;
}

export const HeaderItem = (props: PROPS_HEADER_ITEM) => {
  const { children, path } = props;
  return (
    <Box>
      <Link to={path} className={styles.item}>{children}</Link>
    </Box>
  );
};
