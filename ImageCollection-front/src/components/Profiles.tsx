import {
    Container, InputBase,
    makeStyles,
    Paper,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    Theme,
    TableRow,
    withStyles, Tooltip, Fab,MenuItem
} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import {TileImageResponse, UserResponse} from "../model/dto";
import {RouteComponentProps, withRouter} from "react-router";
import SearchIcon from "@material-ui/icons/Search";
import Images from "./images/Images";
import AccountComponent from "./AccountComponent";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    useParams, useRouteMatch, Link
} from 'react-router-dom';
import {getUsersList } from "./../actions/loginRegister";
import TablePaginationComponent from "./PagintionComponent";

type Props = RouteComponentProps & {}
export const Profiles = (props: Props) => {
    const classes = useStyles();
    const [profiles, setprofiles] = useState<UserResponse[]>();
    const [searchedProfiles, setSearchedProfiles] = useState<UserResponse[]>();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    let {url, path} = useRouteMatch();

    useEffect(() => {
        getUsersList().then((response: UserResponse[]) => {
            console.log(url);
            setprofiles(response);
            setSearchedProfiles(response);
            console.log(searchedProfiles);
        })
    }, []);
    const handleOpenProfile = (rowData: UserResponse) => {
        props.history.push(url+rowData.id);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    // @ts-ignore
    return (
        <Paper>
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell colSpan={2} >
                        <div>
                                <SearchIcon/>
                            <InputBase
                                placeholder="Search…"
                                inputProps={{'aria-label': 'search'}}
                                classes ={{
                                   root: classes.inputRoot,
                                    input: classes.inputInput
                                }}
                                onChange={event => {
                                    let newList = profiles?.filter(item => {
                                        return item.nickname.toLowerCase().includes(event.target.value.toLowerCase());
                                    })
                                    setSearchedProfiles(newList);
                                }}
                            />
                        </div></StyledTableCell>
                    </TableRow>
                <TableRow >
                        <StyledTableCell colSpan={2} align={'center'}>Users profiles</StyledTableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {searchedProfiles?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(row => (
                        <StyledTableRow key={row.icon}>
                               <Tooltip aria-setsize={23} title="Enter profile">
                               <StyledTableCell align={'center'}><Link to={url+row.nickname}  style={{ textDecoration: 'none' }} >
                                   <MenuItem  style={{ paddingLeft:13, marginLeft: "200", color: "black"}}>  <AccessibilityNewIcon  style={{marginRight:20, marginLeft:10}}></AccessibilityNewIcon>{row.nickname} </MenuItem></Link>
                               </StyledTableCell>
                               </Tooltip>
                           </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 15, {label: 'All', value: -1}]}
                colSpan={12}
                count={searchedProfiles?.length ?? 0}
                width={1000}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                    inputProps: {'aria-label': 'rows per page'},
                    native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationComponent}
            />
        </Paper>
    );
}

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontSize:20,

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
    searchBar:{
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

const useStyles = makeStyles((theme) =>({
    table: {
        minWidth: 700,
    },
    full: {
        width: '200%' ,
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
const getProfiles = async (): Promise<UserResponse[]> => {
    {
        return [
            {id:1, icon:undefined, nickname:"Nick_1", email:"some@mail.com", isAdmin:false},
            {id:2, icon:undefined, nickname:"Nick_2", email:"some2@mail.com", isAdmin: false},
            {id:3, icon:undefined, nickname:"Nick_3", email:"some3@mail.com", isAdmin:false},
        ];
    };
    }

    export default withRouter(Profiles);


