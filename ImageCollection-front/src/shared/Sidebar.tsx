import React, {FC} from "react";
import {
  ListItemIcon, ListItemText, MenuList,
  MenuItem, Drawer, AppBar, IconButton,
  Toolbar, Divider, Container, SvgIconTypeMap, Button, CssBaseline, makeStyles, Typography
} from '@material-ui/core';
import {Link, Redirect, Route, RouteComponentProps, Switch, withRouter} from "react-router-dom";
import Routes, {HOME, LOGIN, REGISTER} from "./Routes";
import {OverridableComponent} from "@material-ui/core/OverridableComponent";
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Login from "../components/signInUp/Login";
import Registration from "../components/signInUp/Registration";

type Props = {
  location: { pathname: string },
  //isLoggedIn: boolean,
} & RouteComponentProps

const drawerWidth = 240;


const Sidebar: FC<Props> = (props) => {

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  function activeRoute(routeName: string) {
    return props.location.pathname.indexOf(routeName) > -1;
  }

  // const info = useContext(UserContext);

  // function logout() {
  //   if (info.userInfo) {
  //     info.userInfo = null
  //     props.history.replace(`${HOME}`)
  //   }
  // }

  return (
    <div className={classes.root}>
      <CssBaseline/>
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon/>
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          {/*  {info.userInfo ? 'User: ' : 'Image Collection '}*/}
          {/*  {info.userInfo ? info.userInfo?.firstName + ' ' : ''}*/}
          {/*  {info.userInfo ? info.userInfo.lastName : ''}*/}
            IMIE NAZWISKO
          </Typography>
          {/*{info.userInfo &&*/}
          <Button
              variant="contained"  color="secondary"
              // onClick={logout}
              startIcon= {<ExitToAppOutlinedIcon />}
          >
              Logout
          </Button>
          {/*}*/}

        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon/>
          </IconButton>
        </div>
        <Divider/>
        <MenuList>
          {/*Filtering order:
          1. Not logged in (quest)
          2. Reviewer, but not author
          3. Author, but not reviewer
          4. Author and reviewer
          */}
          {Routes
            .map((prop: { path: string, sidebarName: string, icon: OverridableComponent<SvgIconTypeMap> }, key: number) => {
              return (
                <Link to={prop.path} style={{textDecoration: 'none'}} key={key}>
                  <MenuItem selected={activeRoute(prop.path)}>
                    <ListItemIcon>
                      <prop.icon/>
                    </ListItemIcon>
                    <ListItemText primary={prop.sidebarName}/>
                  </MenuItem>
                </Link>
              );
            })}
        </MenuList>
        <Divider/>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer}/>
        <Container maxWidth="lg" className={classes.container}>
          <Route path={LOGIN} exact component={Login}/>
          <Route path={REGISTER} exact component={Registration}/>
          <Switch>
            <Route
              exact
              path="/"
              render= {() => {
                return <Redirect to={HOME}/>
              }} />
          </Switch>
        </Container>
      </main>
    </div>
  );
}

export default withRouter(Sidebar);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));
