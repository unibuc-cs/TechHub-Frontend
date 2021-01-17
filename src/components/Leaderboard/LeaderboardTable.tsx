import React from "react";
import styled from "styled-components";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { UserDetails } from "../../store/store";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const Container = styled.div`
  margin-bottom: 8px;
`;

const LeaderboardTable: React.FC<{ data: UserDetails[] }> = ({ data }) => {
  const classes = useStyles();

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <StyledTableCell>User</StyledTableCell>
              <StyledTableCell align="center">Total points</StyledTableCell>
              <StyledTableCell align="center">Trophies</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((user: UserDetails) => (
              <StyledTableRow key={user.email}>
                <StyledTableCell component="th" scope="row">
                  {user.username}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {user.totalPoints}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {user.trophies}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default LeaderboardTable;
