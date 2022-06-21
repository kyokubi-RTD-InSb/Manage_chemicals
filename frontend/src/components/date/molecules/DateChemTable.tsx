import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";

import { PROPS_ALL_CHEMICALS } from "../../../types/chemical_types";
import { selectMyprofile } from "../../../features/user/userSlice";
import { CustomStyledTableCell } from "./CustomStyledTableCell";
import { AppDispatch } from "../../../app/store";
import {
  asyncDeleteChemical,
  asyncGetAllChemicals,
} from "../../../features/chemical/chemicalSlice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";

interface PROPS_CHEM_TABLE {
  related_chems: Array<PROPS_ALL_CHEMICALS>;
  chem_name: string;
}

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const DateChemTable = (props: PROPS_CHEM_TABLE) => {
  const { related_chems, chem_name } = props;
  const [open, setOpen] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  const myprofile = useSelector(selectMyprofile);

  const handleDelete = async (chem_id: string) => {
    await dispatch(asyncDeleteChemical(chem_id));
    await dispatch(asyncGetAllChemicals());
    await setOpen(false);
  };

  let chem_amount_total = 0;

  return (
    <Box pl={2}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>使用者
              </StyledTableCell>
              <StyledTableCell align="right">使用量&nbsp;(g)</StyledTableCell>
              <StyledTableCell align="right">使用日</StyledTableCell>
              <StyledTableCell align="right">編集</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {related_chems.map((chem) => (
              <StyledTableRow key={chem.id}>
                <td style={{ display: "none" }}>
                  {(chem_amount_total += chem.used_amount)}
                </td>
                <CustomStyledTableCell
                  chemical={chem}
                  is_user={true}
                  is_date={false}
                />
                <StyledTableCell align="right">
                  {chem.used_amount}&nbsp;g
                </StyledTableCell>
                <CustomStyledTableCell
                  chemical={chem}
                  is_user={false}
                  is_date={true}
                />
                <StyledTableCell align="right">
                  {chem.used_user === myprofile[0].userProfile ? (
                    <Box
                      key={chem.id}
                      onClick={() => setOpen(true)}
                      sx={{ cursor: "pointer" }}
                    >
                      <DeleteIcon />
                    </Box>
                  ) : (
                    <p>---</p>
                  )}
                  <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      <Box sx={{ textAlign: "center" }}>
                        <p style={{ fontSize: "23px" }}>本当に削除しますか？</p>
                        <p style={{ fontSize: "13px", color: "red" }}>
                          削除したデータは復元できません
                        </p>
                      </Box>
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                          <p>使用者:&nbsp;</p>
                          <p>{myprofile[0].username}</p>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                          <p>薬品名:&nbsp;</p>
                          <p>{chem_name}</p>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                          <p>使用量:&nbsp;</p>
                          <p>{chem.used_amount}(g)</p>
                        </Box>
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={() => handleDelete(chem.id)}
                        sx={{ color: "red" }}
                      >
                        削除
                      </Button>
                      <Button onClick={() => setOpen(false)}>削除しない</Button>
                    </DialogActions>
                  </Dialog>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Box px={3} py={1} fontSize="18px" fontWeight="600">
            総数
          </Box>
          <Box px={3} py={1} fontSize="18px" fontWeight="700">
            {related_chems.length}&nbsp;件
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Box px={3} py={1} fontSize="18px" fontWeight="600">
            合計
          </Box>
          <Box px={3} py={1} fontSize="18px" fontWeight="700">
            {chem_amount_total}&nbsp;g
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
