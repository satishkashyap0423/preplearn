import * as React from 'react';
import ShakaPlayer from "shaka-player-react";
import shaka from 'shaka-player/dist/shaka-player.ui';
import "shaka-player/dist/controls.css";
import AppBar from '@material-ui/core/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@material-ui/core/Container';
import Button from '@mui/material/Button';
import Paper from '@material-ui/core/Paper';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import AccountCircle from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Minimize from '@material-ui/icons/RemoveCircle';
import Cancel from '@material-ui/icons/CancelRounded';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import FormControl from '@mui/material/FormControl';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import NoteIcon from '@material-ui/icons/Note';
import Chip from '@material-ui/core/Chip';
import Select from '@mui/material/Select';
import { makeStyles, useTheme, emphasize, withStyles, fade } from '@material-ui/core/styles';
import { Avatar, CircularProgress } from '@material-ui/core';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';

import clsx from 'clsx';
import Plyr from 'plyr-react'
import "plyr-react/plyr.css"
const crypto = window.require('crypto');
const fs = window.require('fs');
const homedir = window.require('os').homedir();
const drawerWidth = 260;
import { List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { useEffect, useState } from 'react';
import { BASE_URL, FetchInstance } from '../Service/Services';
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
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
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
    padding: theme.spacing(3),
  },
  cardstyle: {
    minWidth: 275

  },
  logo2: {
    maxWidth: 65,
    height: 65,
    marginRight: '0px'
  },

  logo3: {
    maxWidth: 35,
    height: 35,
    marginRight: '0px'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
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

  avatar: {
    backgroundColor: '#4db1df',
  },

  media1: {
    width: '25%',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  listneshted: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
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
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },

  typo: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
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
    maxWidth: 50,
    height: 50,
    marginRight: '10px'
  },
  media: {
    height: 0,
    paddingTop: '36.25%', // 16:9
  },
  media1: {
    height: 0,
    paddingTop: '26.25%', // 16:9
  },
  myProgress: {
    width: '100%',
    marginTop: 7,
    borderRadius: 10,
    backgroundColor: '#ddd'
  },
  myBar: {
    width: '1%',
    height: 14,
    borderRadius: 10,
    backgroundColor: '#4CAF50'
  },
  label: {
    textAlign: 'center',
    fontSize: 10,
    color: '#fff'
  }

}));
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
let videoCountFile = `${homedir}/Downloads/videocounts.js`;
function OnlineHomePage({ history }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [videoURL, setvideoURL] = React.useState("")
  const [age, setAge] = React.useState('');
  const [SubjectArray, setSubjectArray] = React.useState([]);
  const [ClassArray, setClassArray] = React.useState([]);
  const [courseArray, setcourseArray] = useState([])
  const [LevelArray, setLevelArray] = useState([])
  const [BatchesArray, setBatchesArray] = useState([])
  const [TopicsArray, setTopicsArray] = useState([])
  const [VideosArray, setVideosArray] = useState([])
  const [ChapterArray, setChapterArray] = React.useState([]);
  const [VideoFiles, setVideoFiles] = React.useState([]);
  const [SelectedClaas, setSelectedClaas] = React.useState("")
  const [selectedCourse, setselectedCourse] = useState("")
  const [selectedLevel, setselectedLevel] = useState("")
  const [selectedBatch, setselectedBatch] = useState("")
  const [SelectedTopic, setSelectedTopic] = useState("")
  const [SelectedSubject, setSelectedSubject] = React.useState("")
  const [SelectedChatper, setSelectedChatper] = useState("")
  const [selectedVideo, setselectedVideo] = useState("")
  const [loading, setloading] = useState(false)
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setactiveIndex] = useState(-1)
  const [isLocked, setIsLocked] = useState(true); // Player is locked by default
  const [CurrentTime, setCurrentTime] = useState(0)
  const [duration, setduration] = useState(0)
  const [openError, setopenError] = useState(false)
  const classes = useStyles();
  const plyrRef = React.useRef(null)
  const videoRef = React.useRef(null);

  const userData = JSON.parse(localStorage.getItem("userDetail"));
  let local_master_level = JSON.parse(localStorage.getItem("AllLevels"));
  let local_master_batches = JSON.parse(localStorage.getItem("AllBatches"));
  const handleCourseChange = (event) => {
    setselectedCourse(event.target.value);
    const filterlevel = local_master_level.filter(level => level.courseid.toString() === event.target.value.courseid.toString());
    setLevelArray(filterlevel);
    // setSelectedSubject(filterData[0]) 
  };

  const handleLevelChange = (event) => {
    setselectedLevel(event.target.value);
    const filterData = local_master_batches.filter(batch => batch.courseid.toString() === event.target.value.courseid.toString() && batch.levelid.toString() === event.target.value.levelid.toString());
    ;
    setBatchesArray(filterData)
    // setSelectedChatper(filterData[0])
  }
  const handleBatchChange = (event) => {
    let topicBodydata = {
      batchid: event.target.value.batchid,
      chapterName: "Regular Class"
    }
    FetchInstance("POST", topicBodydata, "TopicList").then((topics) => {
      setTopicsArray(topics.data)
      setSelectedTopic(topics.data[0])
    })
  }
  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
    let videoBodyData = {
      coursetype: 'freecourse',
      userid: userData.userid,
      courseid: event.target.value.courseid,
      batchid: event.target.value.batchid,
      subjectname: event.target.value.subjectname,
      topicname: event.target.value.topicname
    }
    FetchInstance("POST", videoBodyData, "Free_videolist").then((videos) => {
      setVideosArray(videos.data);
    })
  }


  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setVideosArray([]);
        setTopicsArray([]);
        console.log(userData)
        const userCourseIds = await userData.courseid.toString().split(",").map(id => id.trim());
        const userLevelIds = await userData.levelid.toString().split(",").map(id => id.trim());
        const userBatchIds = await userData.batchid.toString().split(",").map(id => id.trim());
        let topicBodydata = {
          freebatchid: userData.freebatchid,
          remark: "Regular Class",
          subjectname: userData.freesubject
        }
        FetchInstance("POST", topicBodydata, "free_topiclist").then((topics) => {
          setTopicsArray(topics.data)
          setSelectedTopic(topics.data[0])
          let videoBodyData = {
            coursetype: 'freecourse',
            userid: userData.userid,
            courseid: topics.data[0].courseid,
            batchid: topics.data[0].batchid,
            subjectname: topics.data[0].subjectname,
            topicname: topics.data[0].topicname
          }
          FetchInstance("POST", videoBodyData, "Free_videolist").then((videos) => {
            setVideosArray(videos.data);
          }
          )
        })

      } catch (error) {
        console.error('Error reading files:', error);
      }
    };
    fetchData();

  }, []);


  const handleClose = () => {
    setOpen(false)
  }

  const handleErrorClose = () => {
    setopenError(false)
  }

  const Profile = () => {
    history.push('/ProfilePage')
  }
  const Logout = () => {
    localStorage.clear();
    history.push('/LoginPage')
  }
  const MinimizeApp = () => {
    let windows = window.require('@electron/remote').getCurrentWindow();
    windows.minimize();
  }
  const CloseApp = async () => {
    let bodydata = {
      userid: userData.userid,
      videoid: selectedVideo.id,
      batchid: selectedBatch.batchid,
      mode: 'online',
      currenttime: CurrentTime,
      duration: duration,
      counts: selectedVideo.watchcount
    }
    await FetchInstance("POST", bodydata, "Analysis_Access").then((data) => {
      if (data.status === 200) {
        let windows = window.require('@electron/remote').getCurrentWindow();
        windows.webContents.session.clearCache();
        windows.close()
      }
    })

  }

  const PlayVideo = async (video, index) => {
    let bodydata = {
      userid: userData.userid,
      videoid: video.id,
      batchid: selectedBatch.batchid,
      mode: 'online',
      currenttime: video.currenttime ? video.currenttime : 0,
      duration: duration,
      counts: video.watchcount === null ? 1 : video.watchcount + 1
    }
    await FetchInstance("POST", bodydata, "Analysis_Access").then((data) => {
      const videos = VideosArray.find(item => item.id === video.id);
      if (videos) {
        videos.watchcount = video.watchcount === null ? 1 : video.watchcount + 1;
      }
      setselectedVideo(video)
      // if(player){
      //   player.getMediaElement().currentTime = videos.currenttime;

      // }
      fetch(`${BASE_URL}${video.videos.replace(/ /g, '_')}/${video.videos.replace(/ /g, '_')}.mpd`)
        .then(response => {
          console.log(response)
          if (response.status == 200) {
            setvideoURL(`${BASE_URL}${video.videos.replace(/ /g, '_')}/${video.videos.replace(/ /g, '_')}.mpd`)

          }
          else {
            setOpen(true)
          }
        })

    })

    // setvideoURL("https://sagclapp.com/gpac/prepvideos/01IntroductionTo_IndAs/01IntroductionTo_IndAs.mpd")

  }
  const DecryptOfflineFile = (mydata) => new Promise((resolve, reject) => {
    const pass = 'CooL2116NiTh5252';
    var algorithm = "aes-128-ecb";
    var key = new Buffer(pass)
    var decipher = crypto.createDecipheriv(algorithm, key, "");
    let result = decipher.update(mydata);
    var blob = new Blob([result]);
    resolve(blob);
  })
  const getNotes = async () => {
    console.log(`${BASE_URL}notes/${SelectedTopic.topicname.replaceAll(" ", "_")}.pdf`);
    localStorage.setItem("noteurl", `${BASE_URL}notes/${SelectedTopic.topicname.replaceAll(" ", "_")}.pdf`)
  }

  const LoadPlayer = (e) => {
    let { player, ui } = videoRef.current;
    player.getMediaElement().currentTime = selectedVideo.currenttime;
    const config = {
      //playbackRates:[0.5, 1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2],
      //'overflowMenuButtons' : ['playback_rate'],
      'overflowMenuButtons': ['playback_rate'],
      'playbackRates': [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
      //controlPanelElements:['rewind', 'fast_forward'],
      enableKeyboardPlaybackControls: true,
      addBigPlayButton: true,
    };
    ui.configure(config);

  }
  const getseeking = (e) => {
    let { player, ui } = videoRef.current;
    if (player) {
      setCurrentTime(e.target.currentTime)
      setduration(e.target.duration)
    }
  }
  return (
    <div className={classes.root}>
      {loading && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)', // Optional: To add a semi-transparent background
            zIndex: 9999, // To make sure it is on top of other elements
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <AppBar
        position="fixed"
        style={{ backgroundColor: '#FF0000', width: '100%', }}
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
                onClick={() => userData.systemstatus == 1 ? history.push('/OnlineHomePage') : history.push('/HomePage')}
                component="button"
                style={{ backgroundColor: '#ffff' }}
                label={"Home"}
                icon={<VerifiedUserIcon fontSize="small" style={{ color: '#10d50d' }} />}
              />
            </Breadcrumbs>
          </div>
          <div className={classes.search} style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton style={{ color: 'white' }} onClick={() => history.push('OnlineFreeCoursePage')}>
              <h1 style={{
                fontSize: 12
              }}>Free course</h1>
            </IconButton>
            <IconButton style={{ color: 'white' }} onClick={() => Profile()}>
              <AccountCircle />
            </IconButton>
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
        <Container maxWidth="xl" style={{ marginTop: 5 }}>
          <Grid container spacing={2} style={{ marginTop: 5 }}>
            <Grid item xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel id="subject-select-label">Topics</InputLabel>
                <Select
                  labelId="subject-select-label"
                  id="subject-select"
                  value={SelectedTopic}
                  label="Subject"
                  onChange={handleTopicChange}
                >
                  {TopicsArray?.map((item) => (
                    <MenuItem key={item.subjectName} value={item}>
                      <em>{item.topicname}</em>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

          </Grid>

          <Paper
            elevation={3}
            variant="outlined"
            style={{
              marginTop: 10,
              padding: '5px',
              backgroundColor: '#f5f5f5',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Breadcrumbs aria-label="breadcrumb">
              <StyledBreadcrumb
                component="button"
                style={{ backgroundColor: '#ffff' }}
                label={SelectedTopic ? SelectedTopic.topicname : "Topic"}
              // icon={<VerifiedUserIcon fontSize="small" style={{ color: '#10d50d' }} />}
              />

            </Breadcrumbs>
            {SelectedTopic.notes == 1 &&
              <IconButton onClick={() => getNotes()}>
                <NoteIcon fontSize="small" style={{ color: '#f1c40f' }} />
              </IconButton>
            }
          </Paper>


          <Paper elevation={3} variant="outlined" style={{ marginTop: 15 }}>
            <Grid container spacing={2} >
              <Grid item xs={4} justifyContent='center' spacing={3} style={{ marginTop: 3 }}>
                <div style={{
                  maxHeight: 'auto',
                  overflowY: 'auto',
                  scrollbarWidth: 'thin', /* For Firefox */
                  scrollbarColor: '#888 #f5f5f5' /* For Firefox */
                }}>
                  <div style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-end'
                  }}>
                  </div>
                  <List>
                    {VideosArray.map((sectionId, index) => (
                      <div key={`item-${sectionId}`} style={{ marginBottom: '15px', padding: '3px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                        <ListItem
                          button
                          onClick={async () => {
                            if (sectionId.count >= parseInt(sectionId.videowatchlimit)) {
                              // open dialog
                              setopenError(true)
                              return
                            }
                            await PlayVideo(sectionId, index);
                            setIsLocked(false); // Unlock the player after decryption
                          }}
                          style={{
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            backgroundColor: '#fff',
                            padding: '5px',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                            transition: 'background-color 0.3s, box-shadow 0.3s',
                            '&:hover': {
                              backgroundColor: '#f0f0f0',
                              boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
                            },
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar
                              style={{
                                backgroundColor: '#fff', // Background color of Avatar
                                borderRadius: '50%', // Ensures circular Avatar
                                width: 48, // Size of Avatar
                                height: 48, // Size of Avatar
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // Optional shadow for Avatar
                              }}
                            >
                              <OndemandVideoIcon
                                style={{
                                  color: index === activeIndex ? '#008000' : '#efa112', // Color of the icon
                                  fontSize: 32, // Size of the icon
                                }}
                              />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={`${sectionId.videos}`}
                            primaryTypographyProps={{ fontWeight: '500', fontSize: '1rem' }}
                            secondary={`views ${sectionId.watchcount ? sectionId.watchcount : ""}`}
                          />
                        </ListItem>
                      </div>
                    ))}
                  </List>

                </div>
                <style>
                  {`
          /* Custom Scrollbar Styles for WebKit-based Browsers */
          div::-webkit-scrollbar {
            width: 8px;
          }
          div::-webkit-scrollbar-track {
            background: #f5f5f5;
          }
          div::-webkit-scrollbar-thumb {
            background: #ee9254;
            border-radius: 4px;
          }
          div::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
        `}
                </style>
              </Grid>
              <Grid item xs={8}>
                {videoURL !== "" ? (
                  <ShakaPlayer
                    ref={videoRef}
                    id='videoid'
                    autoPlay
                    onTimeUpdate={e => getseeking(e)}
                    onLoadStart={(e) => LoadPlayer(e)}
                    width={window.require('@electron/remote').getCurrentWindow().webContents.getOwnerBrowserWindow().getBounds().width - 150}
                    height={window.require('@electron/remote').getCurrentWindow().webContents.getOwnerBrowserWindow().getBounds().height - 110}
                    poster="https://sagclapp.com/preplearn_poster.jpg"
                    src={videoURL}
                    style={{ width: '100%', height: '550' }} // Fixed height
                  />
                ) : (
                  <img
                    src="https://sagclapp.com/preplearn_poster.jpg"
                    alt="Poster"
                    style={{ width: '100%', height: '550' }} // Fixed height to match ShakaPlayer
                  />
                )}

              </Grid>

            </Grid>
          </Paper>
        </Container>
      </main>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Video File Error"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Video file not found at the specified path. Please verify the location and try again
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullScreen={fullScreen}
        open={openError}
        onClose={handleErrorClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Video File Error"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your video limit has been exceeded. Please contact the administrator.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleErrorClose} color="primary" autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </div>

  );
}
export default OnlineHomePage;