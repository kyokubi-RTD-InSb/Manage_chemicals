import { Box } from "@mui/system";
import { Link } from "react-router-dom";

import styles from "../header.module.scss";

export const HeaderTitle = () => {
  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <h3>
        <Link to="/" className={styles.title}>
          廃液管理画面
        </Link>
      </h3>
    </Box>
  );
};
