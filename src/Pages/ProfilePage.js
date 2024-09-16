import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import HomeIcon from '@material-ui/icons/Home';
import Minimize from '@material-ui/icons/RemoveCircle';
import Cancel from '@material-ui/icons/CancelRounded';
import 'react-toastify/dist/ReactToastify.css';
import Container from '@material-ui/core/Container';
import clsx from 'clsx';
import { makeStyles, useTheme, emphasize, withStyles, fade } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import AccountCircle from '@material-ui/icons/Person';
import Email from '@material-ui/icons/Email';
import Box from '@material-ui/core/Box';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import Call from '@material-ui/icons/Call';
import ViewModule from '@material-ui/icons/ViewModule';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import LineWeight from '@material-ui/icons/LineWeight';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import ConfirmationNumberOutlinedIcon from '@material-ui/icons/ConfirmationNumberOutlined';
import moment from 'moment/moment';
const remote = window.require('electron').remote;
const fs = window.require('fs');
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    paddingTop: 70,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: theme.spacing(3),
  },
  cardstyle: {
    width: '100%',
    maxWidth: 460,
    borderRadius: 20,

  },
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  media: {
    width: '30%',
  },
  listClass: {
    width: '100%',
    maxWidth: 460,
    display: 'flex',
    flexDirection: 'column'
  },
  large: {
    width: 50,
    height: 50,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  logo: {
    maxWidth: 40,
    marginRight: '10px'
  },
}));
const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(3),
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.grey[300],
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12),
    },
  },
}))(Chip);
// let ;
let profileDetails = JSON.parse(localStorage.getItem("userDetail"));
export default function ProfilePage({ history }) {
  const classes = useStyles();
  const theme = useTheme();

  const Logout = () => {
    localStorage.clear();
    history.push('/LoginPage')
  }
  const MinimizeApp = () => {
    let windows = window.require('@electron/remote').getCurrentWindow();
    windows.minimize();
  }
  const CloseApp = () => {
    let windows = window.require('@electron/remote').getCurrentWindow();
    console.log(windows.webContents.session.clearCache)
    windows.webContents.session.clearCache();
    windows.close()
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        style={{ backgroundColor: '#585858', width: '100%', }}
        className={clsx(classes.appBar, { [classes.appBarShift]: open })}
      >
        <Toolbar
          variant="dense"
          style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Avatar
              variant="rounded"
              src={require('../assets/images/ic_launcher.png')}
              style={{ marginRight: 10 }}
              className={classes.rounded}
            />
            <Breadcrumbs aria-label="breadcrumb">
              <StyledBreadcrumb
                component="button"
                onClick={() => profileDetails.systemstatus == 1 ? history.push('/OnlineHomePage') : history.push('/HomePage')}
                style={{ backgroundColor: '#ffff' }}
                label="Home"
              // icon={<VerifiedUserIcon fontSize="small" style={{ color: '#10d50d' }} />}
              />
              <StyledBreadcrumb
                component="button"
                style={{ backgroundColor: '#ffff' }}
                label="Profile"
              // icon={<VerifiedUserIcon fontSize="small" style={{ color: '#10d50d' }} />}
              />
            </Breadcrumbs>
          </div>
          <div className={classes.search} style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" onClick={() => Profile()}>
              <AccountCircle />
            </IconButton>
            <IconButton color="inherit" onClick={() => Logout()}>
              <ExitToAppIcon />
            </IconButton>
            <IconButton color="inherit" onClick={() => MinimizeApp()}>
              <Minimize />
            </IconButton>
            <IconButton color="inherit" onClick={() => CloseApp()}>
              <Cancel />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      <main className={classes.content}>
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <Avatar className={classes.avatar} style={{ backgroundColor: '#ffb05c' }}>
              <AccountCircleOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Profile
            </Typography>
          </div>
          <Box display="flex" justifyContent="center" m={1} p={1} bgcolor="background.paper">
            <Card className={classes.cardstyle}>
              <CardContent>
                <List className={classes.listClass}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar style={{ backgroundColor: '#585858' }}>
                        <VerifiedUserIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={profileDetails.userName} secondary="Name" />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar style={{ backgroundColor: '#585858' }}>
                        <Email />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={profileDetails.email} secondary="E-mail" />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar style={{ backgroundColor: '#585858' }}>
                        <Call />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={profileDetails.mobileNumber} secondary="Mobile Number" />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar style={{ backgroundColor: '#585858' }}>
                        <LineWeight />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={profileDetails.boardName} secondary="Board" />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar style={{ backgroundColor: '#585858' }}>
                        <ViewModule />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={moment(profileDetails.membershipStartDate).format("DD-MM-yyyy")} secondary="Start Date" />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar style={{ backgroundColor: '#585858' }}>
                        <LibraryBooks />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={moment(profileDetails.membershipStartDate).format("DD-MM-yyyy")} secondary="Subscribed Course" />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar style={{ backgroundColor: '#585858' }}>
                        <LibraryBooks />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={moment(profileDetails.membershipEndDate).format("DD-MM-yyyy")} secondary="Expiry" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </main>
    </div>
  );
}