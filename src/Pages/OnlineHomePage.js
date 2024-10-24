import * as React from 'react';
import ShakaPlayer from "shaka-player-react";
import shaka from 'shaka-player/dist/shaka-player.ui';
import "shaka-player/dist/controls.css";
import AppBar from '@material-ui/core/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import {Typography } from '@material-ui/core';
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
import BookIcon from '@mui/icons-material/Book'; // Import the Book icon
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
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MyDrawer from "./MyDrawer";  // Adjust the path based on your file structure
import { Tooltip } from '@mui/material';

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
const ColorButton3 = withStyles((theme) => ({
  root: {
    background: 'linear-gradient(45deg, #4492fc  30%, #26b2ee  90%)',
    border: 0,
    borderRadius: 3,
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 12px'
  },
}))(Button);
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
let remark = [
  {
    key: 1,
    name: "Regular Class",
  },
  {
    key: 2,
    name: "Exam Mentoring",
  },
  {
    key: 3,
    name: "Revision Lectures",
  },
  {
    key: 4,
    name: "Practice Lectures"
  }
]
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
  const [openError, setopenError] = useState(false)
  const [loading, setloading] = useState(false)
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setactiveIndex] = useState(-1)
  const [isLocked, setIsLocked] = useState(true); // Player is locked by default
  const [CurrentTime, setCurrentTime] = useState(0)
  const [duration, setduration] = useState(0)
  const [selectedRemark, setselectedRemark] = useState(remark[0])
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
    setselectedBatch(event.target.value)
    setselectedRemark("")
    // let topicBodydata = {

    //   batchid: event.target.value.batchid,
    //   chapterName: "Regular Class"
    // }
    // FetchInstance("POST", topicBodydata, "TopicList").then((topics) => {
    //   setTopicsArray(topics.data)
    //   setSelectedTopic(topics.data[0])
    //   setselectedBatch
    // })
  }
  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
    let videoBodyData = {
      coursetype: 'maincourse',
      userid: userData.userid,
      courseid: userData.courseid,
      batchid: selectedBatch?.batchid,
      subjectname: event.target.value.subjectname,
      topicname: event.target.value.topicname
    }
    FetchInstance("POST", videoBodyData, "Chapterlist").then((videos) => {
      setVideosArray(videos.data);
      setvideoURL("")
      setactiveIndex(-1)
    }
    )

  }

  const handleRemarkChange = (event) => {
    console.log(event.target.value.name)
    setselectedRemark(event.target.value)
    let topicBodydata = {
      batchid: selectedBatch.batchid,
      chapterName: event.target.value.name
    }
    FetchInstance("POST", topicBodydata, "TopicList").then((topics) => {
      setTopicsArray(topics.data)
      // setSelectedTopic(topics.data[0])
      setVideosArray([])
    })
  }

  React.useEffect(() => {
    document.getElementById('zmmtg-root').style.display = 'none'
  })
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // get user course and user level
        let courseArray = [];
        console.log(userData)
        let c1 = userData?.courseid.toString().split(",");
        let c2 = userData?.coursename.toString().split(",");
        if (c1.length === c2.length) {
          courseArray = await c1.map((id, index) => ({
            id: id,
            coursename: c2[index]
          }));
        } else {
          console.error('Arrays have different lengths.');
        }

        setcourseArray(courseArray)
        setselectedCourse(courseArray[0])
        let levelArray = [];
        let l1 = userData.levelid.toString().split(",");
        let l2 = userData.levelname.toString().split(",");
        if (l1.length === l2.length) {
          levelArray = await l1.map((id, index) => ({
            id: id,
            levelname: l2[index]
          }));
        } else {
          console.error('Arrays have different lengths.');
        }
        setLevelArray(levelArray);
        setselectedLevel(levelArray[0])
        let batchesArray = userData.batchname.split(",")
        let bodydata = {
          userid: userData.userid,
          batchnames: batchesArray,
        }
        FetchInstance("POST", bodydata, "getUserBatch").then((data) => {
          if (!data.status) {
            setBatchesArray(data.data)
            setselectedBatch(data.data[0])
            setselectedRemark(remark[0])
            let topicBodydata = {
              batchid: data.data[0].batchid,
              chapterName: "Regular Class"
            }
            FetchInstance("POST", topicBodydata, "TopicList").then((topics) => {
              setTopicsArray(topics.data)
              setSelectedTopic(topics.data[0])
              let videoBodyData = {
                coursetype: 'maincourse',
                userid: userData.userid,
                courseid: userData.courseid,
                batchid: data.data[0]?.batchid,
                subjectname: topics.data[0].subjectname,
                topicname: topics.data[0].topicname
              }
              FetchInstance("POST", videoBodyData, "Chapterlist").then((videos) => {
                setVideosArray(videos.data);
              }
              )
            })
          }
        })
        // get batches of user on the base of course and level
        // get topic on the base of course level or batch as well videos

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
      fetch(`${BASE_URL}${video.videos}/${video.videos}.mpd`)
        .then(response => {
          console.log(response)
          if (response.status == 200) {
            setvideoURL(`${BASE_URL}${video.videos}/${video.videos}.mpd`)

          }
          else {
            setOpen(true)
          }
        })

    })

    // setvideoURL("https://craftifex.com/gpac/prepvideos/01IntroductionTo_IndAs/01IntroductionTo_IndAs.mpd")

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
        style={{ backgroundColor: '#748785', width: '100%', }}
        className={clsx(classes.appBar, { [classes.appBarShift]: open })}
      >
        <Toolbar
                    variant="dense"
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0 16px', // Add padding for better spacing
                      backgroundColor: '#282c34', // Example background color
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <MyDrawer />
                      {/* <Avatar
                        variant="rounded"
                        src={require('../assets/images/ic_launcher.png')}
                        style={{ marginRight: 10 }}
                        className={classes.rounded}
                      /> */}
                      <Breadcrumbs aria-label="breadcrumb">
                        <StyledBreadcrumb
                          component="button"
                          style={{
                            backgroundColor: '#ffffff',
                            margin: '0 4px', // Add margin for spacing
                            cursor: 'pointer', // Show pointer on hover
                            borderRadius: 4, // Rounded corners for the button
                          }}
                          label={userData.fullname}
                          icon={<VerifiedUserIcon fontSize="small" style={{ color: '#10d50d' }} />}
                        />
                      </Breadcrumbs>
                    </div>

                    <div className={classes.search} style={{ display: 'flex', alignItems: 'center' }}>
                    <Tooltip title="Zoom Classes" placement="bottom"> 

                      <IconButton style={{ color: 'white' }} onClick={() => history.push('OnlineZoomPage')}>
                        
                      <Avatar
                        alt="Zoom"
                        src={require('../assets/images/zoom.png')}
                        style={{ width: 24, height: 24, margin: 5 }} // Set width and height for smaller size
                          />
                      <span style={{ fontSize: 12 }}>Zoom</span>
                      </IconButton>
                      </Tooltip>
                      <Tooltip title="Free Course" placement="bottom"> 

                      <IconButton onClick={() => history.push('OnlineFreeCoursePage')} style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
                          <BookIcon fontSize="small" style={{ marginRight: 4 }} /> {/* Added Book icon */}
                          <span style={{ fontSize: 12 }}>Free course</span>
                        </IconButton>

                      {/* <IconButton style={{ color: 'white' }} onClick={() => Profile()}>
                        <AccountCircle fontSize="small" />
                      </IconButton> */}
                       </Tooltip>
                       <Tooltip title="Logout" placement="bottom"> 
                      <IconButton style={{ color: 'white' }} onClick={() => Logout()}>
                        <ExitToAppIcon fontSize="small" />
                      </IconButton>
                      </Tooltip>
                      <Tooltip title="Minimize" placement="bottom"> 
                      <IconButton style={{ color: 'white' }} onClick={() => MinimizeApp()}>
                        <Minimize fontSize="small" />
                      </IconButton>
                      </Tooltip>
                      <Tooltip title="Close App" placement="bottom"> 
                      <IconButton style={{ color: 'white' }} onClick={() => CloseApp()}>
                        <Cancel fontSize="small" />
                      </IconButton>
                      </Tooltip>
                    </div>
                </Toolbar>

      </AppBar>
      <main
        className={classes.content}
        style={{
          marginTop: 5,
          backgroundColor: '#fff',
          minHeight: '100vh', // Minimum height of full viewport
          display: 'flex',    // Flexbox layout for responsiveness
          flexDirection: 'column',  // Stack content vertically
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            mt: 5,  // Margin top
            flex: 1,  // Allow content to grow and fill the space
            px: 2,   // Default padding for smaller screens (equivalent to 16px)
            // Breakpoints for larger screens
            [theme.breakpoints.up('sm')]: {
              px: 3, // Increase padding to 24px for small and larger screens
            },
            [theme.breakpoints.up('md')]: {
              px: 4, // Increase padding to 32px for medium and larger screens
            },
          }}
        >
          <Grid container spacing={2} style={{ marginTop: 5 }}>
            <Grid item xs={6} style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center'
            }}>
              <Grid item xs>
                <FormControl fullWidth size="small">
                  <InputLabel id="class-select-label">Course</InputLabel>
                  <Select
                    labelId="class-select-label"
                    id="class-select"
                    value={selectedCourse}
                    label="Class"
                    onChange={handleCourseChange}
                  >
                    {courseArray.map((item) =>
                      <MenuItem key={item.courseid} value={item}>
                        {item.coursename}
                      </MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs>
                <FormControl fullWidth size="small">
                  <InputLabel id="subject-select-label">Level</InputLabel>
                  <Select
                    labelId="subject-select-label"
                    id="subject-select"
                    value={selectedLevel}
                    label="Subject"
                    onChange={handleLevelChange}
                  >
                    {LevelArray?.map((item) => (
                      <MenuItem key={item.subjectName} value={item}>
                        <em>{item.levelname}</em>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth size="small">
                <InputLabel id="class-select-label">Batch</InputLabel>
                <Select
                  labelId="class-select-label"
                  id="class-select"
                  value={selectedBatch}
                  label="Class"
                  onChange={handleBatchChange}
                >
                  {BatchesArray.map((item) =>
                    <MenuItem key={item.batchid} value={item}>
                      {item.batchname}
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>

          </Grid>
          <Grid container spacing={2} style={{ marginTop: 5 }}>
            <Grid item xs={6}>

              <FormControl fullWidth size="small">
                <InputLabel id="subject-select-label">Class Type</InputLabel>
                <Select
                  labelId="subject-select-label"
                  id="subject-select"
                  value={selectedRemark}
                  label="Class Type"
                  onChange={handleRemarkChange}
                >
                  {remark?.map((item) => (
                    <MenuItem key={item.key} value={item}>
                      <em>{item.name}</em>
                    </MenuItem>
                  ))}

                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
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
                label={selectedCourse ? selectedCourse.coursename : "Couse"}
              // icon={<VerifiedUserIcon fontSize="small" style={{ color: '#10d50d' }} />}
              />
              <StyledBreadcrumb
                component="button"
                style={{ backgroundColor: '#ffff' }}
                label={selectedLevel ? selectedLevel.levelname : "Level"}
              // icon={<VerifiedUserIcon fontSize="small" style={{ color: '#10d50d' }} />}
              />
              <StyledBreadcrumb
                component="button"
                style={{ backgroundColor: '#ffff' }}
                label={selectedBatch ? selectedBatch.batchname : "Batch"}
              // icon={<VerifiedUserIcon fontSize="small" style={{ color: '#10d50d' }} />}
              />
              <StyledBreadcrumb
                component="button"
                style={{ backgroundColor: '#ffff' }}
                label={SelectedTopic ? SelectedTopic.topicname : "Topic"}
              // icon={<VerifiedUserIcon fontSize="small" style={{ color: '#10d50d' }} />}
              />

            </Breadcrumbs>
            {SelectedTopic?.notes == 1 &&
              <IconButton onClick={() => getNotes()}>
                <NoteIcon fontSize="small" style={{ color: '#f1c40f' }} />
              </IconButton>
            }
          </Paper>


          <Paper elevation={3} variant="outlined" style={{ marginTop: 15, padding: '16px' }}>
            <Grid container spacing={2}>
              {/* Left Grid (Video List) */}
              <Grid
                item
                xs={12} sm={4} // Full width on mobile, 4/12 on small screens and up
                sx={{
                  marginTop: 3,
                  paddingRight: { xs: 0, sm: '16px' }, // Add padding for spacing on larger screens
                }}
              >
                <div
                  style={{
                    maxHeight: '550px', // Set fixed height for scrollable area
                    overflowY: 'auto',  // Enable vertical scrolling
                    scrollbarWidth: 'thin', // For Firefox
                    scrollbarColor: '#888 #f5f5f5', // Firefox scrollbar color
                    paddingRight: '8px', // Padding to avoid scrollbar overlapping content
                  }}
                >
                  <List>
                    {VideosArray.map((sectionId, index) => (
                      <div
                        key={`item-${sectionId}`}
                        style={{
                          marginBottom: '15px',
                          padding: '3px',
                          borderRadius: '8px',
                          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                          cursor: 'pointer'
                        }}
                      >
                        <ListItem
                          button
                          onClick={async () => {
                            if(activeIndex !== index){
                              if (sectionId.count >= parseInt(sectionId.videowatchlimit)) {
                                setopenError(true);
                                return;
                              }
                              await PlayVideo(sectionId, index);
                              setactiveIndex(index)
                              setIsLocked(false);
                            }
                            
                          }}
                          sx={{
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
                                width: 40, // Size of Avatar
                                height: 40, // Size of Avatar
                              }}
                            >
                              <OndemandVideoIcon
                                sx={{
                                  color: index === activeIndex ? '#008000' : '#fed008',
                                  fontSize: 32,
                                }}
                              />
                            </Avatar>
                          </ListItemAvatar>
                          
                          <ListItemText
                            primary={`${sectionId.videos}`}
                            primaryTypographyProps={{ fontWeight: 500, fontSize: '1rem' }}
                            secondary={
                              <React.Fragment>
                                <Box
                                  display="flex"
                                  justifyContent="space-between"
                                  alignItems="center"
                                  sx={{
                                    mt: 1,
                                    p: 0.5, // Further reduced padding for a lower height
                                    borderRadius: 2,
                                    backgroundColor: '#f5f8fa', // Light gray background
                                    boxShadow: 1,
                                  }}
                                >
                                  <Box display="flex" alignItems="center">
                                    <VisibilityIcon sx={{ color: '#007BFF', fontSize: 18, mr: 0.25 }} /> {/* Slightly smaller icon */}
                                    <Typography variant="caption" component="span" fontWeight="bold" color="#333" sx={{ mr: 0.25 }}>
                                      Views:
                                    </Typography>
                                    <Typography variant="caption" component="span" sx={{ color: '#555' }}>
                                      {sectionId.watchcount || "N/A"}
                                    </Typography>
                                  </Box>
                                  <Box display="flex" alignItems="center">
                                    <AccessTimeIcon sx={{ color: '#28A745', fontSize: 18, mr: 0.25 }} /> {/* Slightly smaller icon */}
                                    <Typography variant="caption" component="span" fontWeight="bold" color="#333" sx={{ mr: 0.25 }}>
                                      Duration:
                                    </Typography>
                                    <Typography variant="caption" component="span" sx={{ color: '#555' }}>
                                      {sectionId.duration || "N/A"}
                                    </Typography>
                                  </Box>
                                </Box>
                              </React.Fragment>
                              
                            }
                          />
                        </ListItem>
                      </div>
                    ))}
                  </List>
                </div>

                {/* Custom Scrollbar Styles */}
                <style>
                  {`
          div::-webkit-scrollbar {
            width: 8px;
          }
          div::-webkit-scrollbar-track {
            background: #f5f5f5;
          }
          div::-webkit-scrollbar-thumb {
            background: #fed008;
            border-radius: 4px;
          }
          div::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
        `}
                </style>
              </Grid>

              {/* Right Grid (Video Player) */}
              <Grid
                item
                xs={12} sm={8} // Full width on mobile, 8/12 on small screens and up
                sx={{
                  paddingLeft: { xs: 0, sm: '16px' }, // Add padding for spacing on larger screens
                  paddingTop: { xs: '16px', sm: 0 },  // Add top padding on mobile for separation
                }}
              >
                {videoURL !== "" ? (
                  <ShakaPlayer
                    ref={videoRef}
                    id="videoid"
                    autoPlay
                    onTimeUpdate={(e) => getseeking(e)}
                    onLoadStart={(e) => LoadPlayer(e)}
                    width="100%" // Make player fill its container's width
                    height={550} // Fixed height for player
                    poster="https://craftifex.com/preplearn_poster.jpg"
                    src={videoURL}
                    //src="https://preplearn-mpd.s3.ap-south-1.amazonaws.com/01IntroductionTo_IndAs/01IntroductionTo_IndAs.mpd"
                  />
                ) : (
                  <img
                    src="https://craftifex.com/preplearn_poster.jpg"
                    alt="Poster"
                    style={{ width: '100%', height: '550px' }} // Fixed height to match ShakaPlayer
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