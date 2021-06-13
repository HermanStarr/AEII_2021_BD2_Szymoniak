import {
  InputBase,
  makeStyles,
  Paper,
  Table, TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  withStyles, Tooltip, MenuItem, Avatar
} from "@material-ui/core";
import React, { useEffect, useState} from "react";
import {PaginatedResult, UserPublicResponse} from "../model/dto";
import {withRouter} from "react-router";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from 'react-router-dom';
import {getUsers} from "../actions/user";
import {PROFILES} from "../shared/Routes";
import {CustomPagination} from "../shared/CustomPagination";

export const Profiles = () => {
  const classes = useStyles();
  const [profiles, setProfiles] = useState<PaginatedResult<UserPublicResponse>>({items: [], elementCount: 0});
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchName, setSearchName] = useState<string>('');

  useEffect(() => {
    getUsers(`pageSize=${rowsPerPage}&pageNumber=${page}&search=nickname%3A${searchName}`).then(response=> {
      setProfiles(response);
    })
  }, [page, rowsPerPage, searchName]);

  return (
    <Paper>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell colSpan={2}>
                <div>
                  <SearchIcon/>
                  <InputBase
                    placeholder="Search…"
                    inputProps={{'aria-label': 'search'}}
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput
                    }}
                    onChange={event => setSearchName(event.target.value.toLowerCase())}
                  />
                </div>
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell colSpan={2} align={'center'}>Users profiles</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {profiles.items.map(row => (
              <StyledTableRow key={row.id}>
                <Tooltip aria-setsize={23} title="Enter profile">
                  <StyledTableCell align={'center'}>
                    <Link to={PROFILES + '/' + row.nickname} style={{textDecoration: 'none'}}>
                      <MenuItem style={{paddingLeft: 13, marginLeft: "200", color: "black"}}>
                        <Avatar
                          alt="User"
                          src={`data:image/jpeg;base64,${row.icon}`}
                          style={{
                            marginRight: 20,
                            marginLeft: 10
                          }}
                        />
                        {row.nickname}
                      </MenuItem>
                    </Link>
                  </StyledTableCell>
                </Tooltip>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomPagination
        onPageChange={setPage}
        onPageSizeChange={setRowsPerPage}
        elementCount={profiles.elementCount}
        pageSizes={[5, 10, 15, {label: 'All', value: -1}]}/>
    </Paper>
  );
}

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 20,

  },
  body: {
    fontSize: 14,
  },

}))(TableCell);


const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  searchBar: {
    color: 'white',
  },
  searchIcon: {
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  full: {
    width: '200%',
    span: 2,
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


export default withRouter(Profiles);


