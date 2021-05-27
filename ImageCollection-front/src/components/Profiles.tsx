import {
    Container, InputBase,
    makeStyles,
    Paper,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    Theme,
    TableRow,
    withStyles
} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import {TileImageResponse, UserResponse} from "../model/dto";
import {withRouter} from "react-router";
import SearchIcon from "@material-ui/icons/Search";
import Images from "./images/Images";
import AccountComponent from "./AccountComponent";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    useParams, useRouteMatch, Link
} from 'react-router-dom'


export const Profiles = () => {
    const classes = useStyles();
    const [profiles, setprofiles] = useState<UserResponse[]>();
    let {url, path} = useRouteMatch();

    useEffect(() => {
        getProfiles().then((response: UserResponse[]) => {
            setprofiles(response);
            console.log("url", url);
            console.log('path', path);
        })
    }, []);

    // @ts-ignore
    return (
        <Paper>
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow >
                        <StyledTableCell colSpan={2} >
                        <div>
                                <SearchIcon/>
                            <InputBase
                                placeholder="Search…"
                                onChange={event => {}}
                                inputProps={{'aria-label': 'search'}}
                                classes ={{
                                   root: classes.inputRoot,
                                    input: classes.inputInput
                                }}
                            />
                        </div></StyledTableCell>
                    </TableRow>
                <TableRow >
                        <StyledTableCell>Icon</StyledTableCell>
                        <StyledTableCell >Nick</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                    {profiles?.map((row) => (

                           <StyledTableRow key={row.icon}>
                            <StyledTableCell component="th" scope="row">
                                <AccessibilityNewIcon></AccessibilityNewIcon>
                            </StyledTableCell>
                               <StyledTableCell><Link to={url+row.id} >{row.nickname}</Link></StyledTableCell>
                        </StyledTableRow>


                    ))}

                </TableBody>
            </Table>
        </TableContainer>
            <Route path={'/profiles/1'}>
                <h1> Profile nickname</h1>
                <AccountComponent></AccountComponent>
                <Images></Images>
            </Route>

        </Paper>
    );
}

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

/*
function userGallery()
{
    const {url, path} = useRouteMatch();
    const {userId} = useParams();
    const [profiles, setprofiles] = useState<UserResponse[]>();

    useEffect(() => {
        getProfiles().then((response: UserResponse[]) => {
            setprofiles(response);
        })
    }, []);

    const user= profiles?.find(({id}) => id == userId);

    return(
        <div>
            <h2>{user.name}</h2>
        </div>
    )

}
 */

