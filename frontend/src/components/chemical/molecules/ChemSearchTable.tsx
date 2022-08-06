import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import { useDispatch, useSelector } from "react-redux";

import { PROPS_ALL_CHEMICALS } from "../../../types/chemical_types";
import {
  selectAllUsers,
  selectMyprofile,
} from "../../../features/user/userSlice";
import { AppDispatch } from "../../../app/store";
import {
  asyncDeleteChemical,
  asyncGetAllChemicals,
  editChemPutInfo,
  selectAllChemicalNames,
  selectChemPutInfo,
  startChemEdit,
} from "../../../features/chemical/chemicalSlice";

import { useState } from "react";
import { CustomStyledTableCell } from "../../date/molecules/CustomStyledTableCell";
import { IsRegisterdSwitch } from "../../date/atom/IsRegisterdSwitch";


interface PROPS_CHEM_TABLE {
  related_chems: Array<PROPS_ALL_CHEMICALS>;
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

export const ChemSearchTable = (props: PROPS_CHEM_TABLE) => {
  const { related_chems } = props;
  const [open, setOpen] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  const myprofile = useSelector(selectMyprofile);
  const allUsers = useSelector(selectAllUsers);
  const allChemNames = useSelector(selectAllChemicalNames)

  const getIsEdit = (used_user: string) => {
    const myInfo = allUsers.find(
      (user) => user.id === myprofile[0].userProfile
    );
    return myInfo?.is_admin || myInfo?.id === used_user;
  };

  const initChemEdit = (chem: PROPS_ALL_CHEMICALS) => {
    dispatch(editChemPutInfo(chem));
    dispatch(startChemEdit());
  };

  const getChemName = (name_id: number) => {
    const res = allChemNames.find((chem) => chem.id === name_id)
    return res?.name
  }

  return (
    <Box pl={2}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>使用者</StyledTableCell>
              <StyledTableCell align="right">廃液名</StyledTableCell>
              <StyledTableCell align="right">使用量&nbsp;(g)</StyledTableCell>
              <StyledTableCell align="right">使用日</StyledTableCell>
              <StyledTableCell align="right">登録済み</StyledTableCell>
              <StyledTableCell align="right">廃液先</StyledTableCell>
              <StyledTableCell align="right">編集</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {related_chems.map((chem) => (
              <StyledTableRow key={chem.id}>
                <CustomStyledTableCell
                  chemical={chem}
                  is_user={true}
                  is_date={false}
                  is_registerd={false}
                />
                <StyledTableCell align="right">
                  {getChemName(chem.name)}&nbsp;
                </StyledTableCell>
                <StyledTableCell align="right">
                  {chem.used_amount}&nbsp;g
                </StyledTableCell>
                <CustomStyledTableCell
                  chemical={chem}
                  is_user={false}
                  is_date={true}
                  is_registerd={false}
                />
                <StyledTableCell align="right">
                  <IsRegisterdSwitch
                    is_registerd={chem.is_registerd}
                    is_edit={getIsEdit(chem.used_user)}
                  />
                </StyledTableCell>
                <CustomStyledTableCell
                  chemical={chem}
                  is_user={false}
                  is_date={false}
                  is_registerd={true}
                />
                <StyledTableCell align="right">
                  {getIsEdit(chem.used_user) ? (
                    <Box
                      onClick={() => initChemEdit(chem)}
                      sx={{ cursor: "pointer" }}
                    >
                      <EditIcon color="primary" />
                    </Box>
                  ) : (
                    <DoDisturbIcon color="error" />
                  )}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
