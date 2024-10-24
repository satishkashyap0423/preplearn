import * as React from 'react';
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
import { Tooltip } from '@mui/material';
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
import { FetchInstance } from '../Service/Services';
import { makeStyles, useTheme, emphasize, withStyles, fade } from '@material-ui/core/styles';
import { Avatar, CircularProgress, Typography } from '@material-ui/core';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import clsx from 'clsx';
import Plyr from 'plyr-react'
import "plyr-react/plyr.css"
const crypto = window.require('crypto');
const fs = window.require('fs');
const homedir = window.require('os').homedir();
const drawerWidth = 260;
import { List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { useEffect, useState } from 'react';
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
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
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
function FreeCoursePage({ history }) {
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
  const [loading, setloading] = useState(false)
  const [progressLoading, setprogressLoading] = useState(false)

  const [selectedRemark, setselectedRemark] = useState(remark[0])
  const [logoutPopUP, setlogoutPopUP] = useState(false)
  const [open, setOpen] = React.useState(false);
  const [openError, setopenError] = useState(false)
  const [activeIndex, setactiveIndex] = useState(-1)
  const [isLocked, setIsLocked] = useState(true); // Player is locked by default
  const classes = useStyles();
  const plyrRef = React.useRef(null)
  const [syncProgress, setsyncProgress] = React.useState(1);
  const userData = JSON.parse(localStorage.getItem("userDetail"));
  let local_free_toppics = JSON.parse(localStorage.getItem("AllFreeTopics"));
  let local_free_videos = JSON.parse(localStorage.getItem("AllFreeVideo"));

  React.useEffect(() => {
    document.getElementById('zmmtg-root').style.display = 'none'
  })
  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
    console.log(local_free_videos)
    const filterData = local_free_videos.filter(obj => obj.courseid === event.target.value.courseid && obj.levelid === event.target.value.levelid && obj.batchid === event.target.value.batchid && obj.topicname === event.target.value.topicname);
    console.log(filterData);
    setvideoURL("")
    setactiveIndex(-1)
    setVideosArray(filterData);
  }

  const handleRemarkChange = (event) => {
    console.log(event.target.value.name)
    setselectedRemark(event.target.value);
    const filterData = local_master_toppics.filter(topic =>
      topic.courseid.toString() === selectedBatch.courseid.toString() && topic.levelid.toString() === selectedBatch.levelid.toString() && topic.batchid.toString() === selectedBatch.batchid.toString() && topic.remark.trim().toString() == event.target.value.name.trim().toString()
    );
    console.log(filterData);
    setTopicsArray(filterData)
    setSelectedTopic(filterData[0])
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

        // Filter master_courses based on the course IDs in userData
        // Free course vidos filter on the base of batch id
        const filterTopicsData = local_free_toppics.filter(obj => obj.batchid === userData.freebatchid);
        console.log(filterTopicsData);
        const initialTopic = filterTopicsData[0];
        setTopicsArray(filterTopicsData)
        setSelectedTopic(initialTopic)
        const filterVideosData = local_free_videos.filter(obj => obj.courseid === initialTopic.courseid && obj.levelid === initialTopic.levelid && obj.batchid === initialTopic.batchid && obj.topicname === initialTopic.topicname);
        console.log(filterVideosData);
        if (filterVideosData.length > 0) {
          console.log("hello", filterVideosData);
          fs.exists(videoCountFile, function (exists) {
            if (exists) {
              fs.readFile(videoCountFile, (err, mydata) => {
                if (err) {
                  console.error("Error reading file:", err);
                  return;
                }

                try {
                  const parsedData = JSON.parse(mydata);
                  const mergedArray = mergeArrays(filterVideosData, parsedData);
                  console.log("mergedArray", mergedArray)
                  setVideosArray(mergedArray);

                } catch (error) {
                  console.error("Error parsing JSON data:", error);
                }
              });
            }
            else {
              setVideosArray(filterVideosData);
            }
          });
        }

      } catch (error) {
        console.error('Error reading files:', error);
      }
    };
    fetchData();

  }, []);

  const mergeArrays = (arr1, arr2) => {
    // Create a map from the first array to allow quick lookups
    const map = new Map(arr1.map(item => [item.id, item]));

    // Iterate over the second array
    arr2.forEach(item => {
      if (map.has(item.id)) {
        // If the item exists in the map, merge the properties
        Object.assign(map.get(item.id), item);
      } else {
        // Otherwise, add the new item
        map.set(item.id, item);
      }
    });

    // Return the merged array as an array from the map values
    return Array.from(map.values());
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const DecryptFile = (mydata, filePath, index) => new Promise((resolve, reject) => {
    var arr = [];
    var key = new Buffer('CooL2116NiTh5252');
    var decipher = crypto.createDecipheriv('aes-128-ecb', key, "");
    var infile = fs.createReadStream(filePath);
    var size = fs.statSync(filePath).size;
    // to change color of progress
    // document.getElementById('myBar').style.backgroundColor="#4CAF50";
    // setmaxstdvalue(size)
    infile.on('data', function (mydata) {
      var percentage = parseInt(infile.bytesRead) / parseInt(size);
      console.log(percentage * 100);
      // setprogressstdValue(percentage * 100)

      // setdowmloadProgress(percentage)
      let result = decipher.update(mydata);
      if (result) {
        arr.push(Buffer.from(result))
      }
    });
    infile.on('close', function () {
      var buf = Buffer.concat(arr)
      let blob = new Blob([buf]);
      // setshowProgress(false)
      resolve(blob);
    })
  })

  const handleClose = () => {
    setOpen(false)
  }

  const handleErrorClose = () => {
    setopenError(false)
  }
  const DecryptVideoAndPlay = (data) => {
    console.log(userData, data);
    setvideoURL("")
    // add count against every video on click and write into the file and compare that file data with show count against video
    fs.exists(videoCountFile, function (exists) {
      if (exists) {
        fs.readFile(videoCountFile, (err, mydata) => {
          let userVideoData = JSON.parse(mydata);
          console.log(userVideoData);
          let videoIndex = userVideoData.findIndex(obj => obj.videos == data.videos && obj.batchid === userData.freebatchid && obj.topicname === SelectedTopic.topicname);
          console.log(videoIndex)
          if (videoIndex >= 0) {
            // replce video at that index 
            data["count"] = !data.count ? 1 : data.count + 1;
            userVideoData[videoIndex] = data
            fs.writeFile(videoCountFile, JSON.stringify(userVideoData), function (err) {
              if (err) throw err;
              console.log('Saved!');
            });
          }
          else {
            // add video 
            data["count"] = 1;
            userVideoData[videoIndex] = data
            userVideoData.push(data)
            fs.writeFile(videoCountFile, JSON.stringify(userVideoData), function (err) {
              if (err) throw err;
              console.log('Saved!');
            });
          }
        })
      }
      else {
        let videoArray = [];
        data["count"] = 1;
        videoArray.push(data)
        fs.writeFile(videoCountFile, JSON.stringify(videoArray), function (err) {
          if (err) throw err;
          console.log('Saved!');
        });
      }
    })
    const videoPath = `${userData.drivePath}/${data.coursename}/${data.videos}.encrypted`;
    // console.log(SelectedClaas, SelectedSubject, SelectedChatper);
    fs.readFile(videoPath, (err, mydata) => {
      if (err) {
        console.log(err.stack);
        setOpen(true)
        return;
      }
      if (mydata) {
        DecryptFile(mydata, videoPath, 0).then((DecData) => {
          let Fileurl = URL.createObjectURL(DecData);
          if (Fileurl) {
            setvideoURL(Fileurl)
            setTimeout(() => {
              console.log(plyrRef.current.plyr)
              if (plyrRef.current) {
                plyrRef.current.plyr.play();
              }
            }, 300);
          }
        })
      }
    })
  }

  const Profile = () => {
    history.push('/ProfilePage')
  }
  const Logout = async() => {
    // before logout we have to sync all the data 
    const exists = await fs.promises.access(videoCountFile).then(() => true).catch(() => false);
    if (exists) {
      const mydata = await fs.promises.readFile(videoCountFile);
      let userVideoData = JSON.parse(mydata);
      const totalVideos = userVideoData.length;
      for (let i = 0; i < totalVideos; i++) {
        const video = userVideoData[i];
        let bodydata = {
          userid: userData.userid,
          videoid: video.id,
          batchid: selectedBatch.batchid,
          mode: 'offline',
          currenttime: video.currenttime,
          duration: video.duration,
          counts: video.count
        };
        try {
          const data = await FetchInstance("POST", bodydata, "Analysis_Access");
          console.log(data);

          // Calculate and display progress
          const progressPercentage = Math.round(((i + 1) / totalVideos) * 100);
          console.log(`Progress: ${progressPercentage}%`);
          setsyncProgress(progressPercentage)
          setprogressLoading(true);

          if (i === totalVideos - 1) {
            setTimeout(() => {
              setprogressLoading(false);
              setlogoutPopUP(false)
              localStorage.clear();
              history.push('/LoginPage')
            }, 500);
          }
        } catch (error) {
          console.error("Error in FetchInstance:", error);
        }
      }
    } else {
      console.log("There are no videos to sync");
    }
   
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

  const DecryptOfflineFile = (mydata) => new Promise((resolve, reject) => {
    console.log(mydata)
    const pass = 'CooL2116NiTh5252';
    var algorithm = "aes-128-ecb";
    var key = new Buffer(pass)
    var decipher = crypto.createDecipheriv(algorithm, key, "");
    let result = decipher.update(mydata);
    console.log(result)
    var blob = new Blob([result]);
    console.log(typeof (blob))
    resolve(blob);
  })
  const getNotes = async (item, index) => {
    localStorage.setItem("noteurl", "")
    // console.log(item.topicname.replaceAll(" ", "_"))
    // console.log(`${BASE_URL}notes/${item.topicname.replaceAll(" ", "_")}.pdf`)
    // return false
    let filePath = `${userData.drivePath}/${selectedBatch.batchname}/notes/${SelectedTopic.topicname}.encrypted`;
    console.log(filePath)
    await fs.exists(filePath, (exists) => {
      console.log(exists)
      if (exists) {
        fs.readFile(filePath, (err, mydata) => {
          if (mydata) {
            DecryptOfflineFile(mydata).then((DecData) => {
              let Fileurl = URL.createObjectURL(DecData);
              console.log(Fileurl)
              if (Fileurl.length !== 0) {
                localStorage.setItem("noteurl", Fileurl)
                history.push('/OpenPdfFile', { state: { url: Fileurl } });
              }
            })
          }
        });
      }
      else {
        toast("File not found")
      }
    }
    )

  }
  function CircularProgressWithLabel(props) {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant="determinate" {...props} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="caption"
            component="div"
            sx={{ color: 'text.secondary' }}
          >
            {`${Math.round(props.value)}%`}
          </Typography>
        </Box>
      </Box>
    );
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
       {progressLoading &&
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
          <CircularProgressWithLabel value={syncProgress} />

        </Box>
      }
      <AppBar
        position="fixed"
        style={{ backgroundColor: '#585858', width: '100%', }}
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
                    {/* <Avatar
                      variant="rounded"
                      src={require('../assets/images/ic_launcher.png')}
                      style={{ marginRight: 10 }}
                      className={classes.rounded}
                    /> */}
                    <Breadcrumbs aria-label="breadcrumb">
                    <Tooltip title="Home" placement="bottom">
                      <StyledBreadcrumb
                        component="button"
                        onClick={() => userData.systemstatus === 1 ? history.push('/OnlineHomePage') : history.push('/HomePage')}
                        style={{
                          backgroundColor: '#ffffff',
                          margin: '0 4px', // Add margin for spacing
                          cursor: 'pointer', // Show pointer on hover
                          borderRadius: 4, // Rounded corners for the button
                        }}
                        label="Home"
                        icon={<VerifiedUserIcon fontSize="small" style={{ color: '#f94500' }} />}
                      />
                       </Tooltip>
                    </Breadcrumbs>
                  </div>
                  
                  <div className={classes.search} style={{ display: 'flex', alignItems: 'center' }}>
                    {/* <IconButton onClick={() => Profile()} style={{ color: 'white', marginLeft: 10 }}>
                      <AccountCircle fontSize="small" />
                    </IconButton> */}
                     <Tooltip title="Logout" placement="bottom">
                    <IconButton onClick={() => setlogoutPopUP(true)} style={{ color: 'white', marginLeft: 10 }}>
                      <ExitToAppIcon fontSize="small" />
                    </IconButton>
                    </Tooltip>
                    <Tooltip title="Minimize" placement="bottom"> 
                    <IconButton onClick={() => MinimizeApp()} style={{ color: 'white', marginLeft: 10 }}>
                      <Minimize fontSize="small" />
                    </IconButton>
                    </Tooltip>
                    <Tooltip title="Close App" placement="bottom"> 
                    <IconButton onClick={() => CloseApp()} style={{ color: 'white', marginLeft: 10 }}>
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
              {/* <StyledBreadcrumb
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
              /> */}
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
                      <div key={`item-${sectionId}`} style={{ cursor: 'pointer', marginBottom: '15px', padding: '3px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                        <ListItem
                          button
                          onClick={async () => {
                            if (sectionId.count >= parseInt(sectionId.videowatchlimit)) {
                              // open dialog
                              setopenError(true)
                              return
                            }
                            await DecryptVideoAndPlay(sectionId, index); // Handle decryption logic
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
                            secondary={`views ${sectionId.count ? sectionId.count : ""}`}
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
                <Plyr
                  ref={plyrRef}
                  source={{
                    type: 'video',
                    sources: [{ src: videoURL, type: 'video/mp4' }],
                    poster: require('../assets/images/poster2.jpg'), // Path to the poster image
                  }}
                  options={{
                    controls: isLocked ? [] : [ // Hide controls when locked
                      'play-large',
                      'restart',
                      'rewind',
                      'play',
                      'fast-forward',
                      'progress',
                      'current-time',
                      'duration',
                      'mute',
                      'volume',
                      'settings',
                      'fullscreen',
                    ],
                  }}
                  style={{ width: '100%', height: '550' }} // Fixed height
                />
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
      <Dialog
        fullScreen={fullScreen}
        open={logoutPopUP}
        onClose={handleErrorClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Logout"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>Logout()} color="primary" autoFocus>
            Logout
          </Button>
          <Button onClick={()=>setlogoutPopUP(false)} color="primary" autoFocus>
            cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>

  );
}
export default FreeCoursePage;