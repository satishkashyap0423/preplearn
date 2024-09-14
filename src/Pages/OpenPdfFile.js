import React, { useState, useEffect } from 'react'
import { makeStyles, useTheme, emphasize, withStyles, fade } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';;
import Minimize from '@material-ui/icons/RemoveCircle';
import Cancel from '@material-ui/icons/CancelRounded';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import clsx from 'clsx';
import { Avatar, CircularProgress } from '@material-ui/core';
import 'video.js/dist/video-js.css';
import AccountCircle from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import Box from '@material-ui/core/Box';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import Container from '@material-ui/core/Container';
import { Document } from 'react-pdf/dist/esm/entry.webpack';
import { Page } from "react-pdf/dist/esm/entry.webpack";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Grid from '@material-ui/core/Grid';
const fs = window.require('fs');
const crypto = window.require('crypto');

const remote = window.require('electron').remote;
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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
    backgroundColor: '#ffffff',
    padding: theme.spacing(3),
  },
  cardstyle: {
    width: '100%',
    maxWidth: 460,
    borderRadius: 20,

  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  activeTabCSS: {
    backgroundColor: 'white',
    cursor: 'pointer',
  },
  nonactiveTabCSS: {
    backgroundColor: 'gray',
    cursor: 'pointer',
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
export default function OpenPdfFile({ history }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openlist, setOpenlist] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const userData = JSON.parse(localStorage.getItem("userDetail"));
  const pdfurl = localStorage.getItem("noteurl") || ''; // Retrieve the URL from the location state
  console.log(pdfurl, history)
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  }
  const changepagenum = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1)
    }

  }
  const lesspagenum = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1)
    }
  }
  const handleClick = () => {
    setOpenlist(!openlist);
  };


  const page = {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  }
  const section = {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
  const MinimizeApp = () => {
    let window = remote.getCurrentWindow();
    window.minimize();
  }
  const CloseApp = () => {
    let window = remote.getCurrentWindow();
    window.webContents.session.clearCache(function () {
      //some callback.
      window.close();
    });

  }

  const goBack = () => {
    history.push('TopicList')
  }
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const functioncall = () => {
    localStorage.clear()
    history.push('LoginPage')
  }
  const moveToChapterlist = () => {
    history.push('ChapterList')
  }
  const goToHome = () => {
    history.push('HomePage')
  }

  const Logout = () => {
    localStorage.clear();
    history.push('LoginPage')
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        style={{ backgroundColor: '#585858' }}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}>
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
            <Breadcrumbs onClick={()=> history.push('/HomePage')} aria-label="breadcrumb">
              <StyledBreadcrumb
                component="button"
                style={{ backgroundColor: '#ffff' }}
                label={"Home"}
                icon={<VerifiedUserIcon fontSize="small" style={{ color: '#10d50d' }} />}
              />
            </Breadcrumbs>
          </div>
          <div className={classes.search} style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton style={{ color: 'white' }} onClick={() => Profile()}>
              <AccountCircle />
            </IconButton>
            {/* <IconButton style={{ color: 'white' }} onClick={() => history.push('/EncryptedVideos')}>
        <Settings />
      </IconButton> */}
            <IconButton style={{ color: 'white' }} onClick={() => Logout()}>
              <ExitToAppIcon />
            </IconButton>
            <IconButton style={{ color: 'white' }} onClick={() => MinimizeApp()}>
              <Minimize />
            </IconButton>
            <IconButton style={{ color: 'white' }} onClick={() => CloseApp()}>
              <Cancel />
            </IconButton>

          </div>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <Container component="main" maxWidth="xs">
          <Grid container justifyContent="center" style={{ height: '80vh', marginTop: 10 }}>
            <Document
              file={{
                url: pdfurl
              }}
              renderMode="pdf"
              scale={5}
              onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} />
            </Document>
          </Grid>
          <Divider />
          <div style={{ width: '100%' }}>
            <Box alignItems="center" display="flex" p={1} bgcolor="background.paper">
              <Box p={1} flexGrow={1} alignItems="flex-start" bgcolor="grey.300">
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={() => lesspagenum()}
                  color="inherit"
                >
                  <SkipPreviousIcon />
                </IconButton>

              </Box>

              <Box flexGrow={1} p={1} bgcolor="grey.300">
                <p>Page {pageNumber} of {numPages}</p>
              </Box>

              <Box alignSelf="flex-end" p={1} bgcolor="grey.300">
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={() => changepagenum()}
                  color="inherit"
                  edge="end"
                >
                  <SkipNextIcon />
                </IconButton>
              </Box>
            </Box>
          </div>
        </Container>
      </main>
    </div>
  );
}