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
function HomePage({ history }) {
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
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setactiveIndex] = useState(-1)
  const [isLocked, setIsLocked] = useState(true); // Player is locked by default
  const classes = useStyles();
  const plyrRef = React.useRef(null)
  const userData = JSON.parse(localStorage.getItem("userDetail"));
  let local_master_courses = JSON.parse(localStorage.getItem("AllCourse"));
  let local_master_level = JSON.parse(localStorage.getItem("AllLevels"));
  let local_master_batches = JSON.parse(localStorage.getItem("AllBatches"));
  let local_master_toppics = JSON.parse(localStorage.getItem("AllTopics"));
  let local_masterupload = JSON.parse(localStorage.getItem("AllVideos"));
  const handleCourseChange = (event) => {
    setselectedCourse(event.target.value);
    const filterlevel = local_master_level.filter(level => level.courseid.toString() === event.target.value.courseid.toString());
    console.log(filterlevel);
    setLevelArray(filterlevel);
    // setSelectedSubject(filterData[0]) 
  };

  const handleLevelChange = (event) => {
    setselectedLevel(event.target.value);
    const filterData = local_master_batches.filter(batch => batch.courseid.toString() === event.target.value.courseid.toString() && batch.levelid.toString() === event.target.value.levelid.toString());
    console.log(filterData);
    setBatchesArray(filterData)
    // setSelectedChatper(filterData[0])
  }
  const handleBatchChange = (event) => {
    setselectedBatch(event.target.value);
    const filterData = local_master_toppics.filter(topic => topic.courseid.toString() === event.target.value.courseid.toString() && topic.levelid.toString() === event.target.value.levelid.toString() && topic.batchid.toString() === event.target.value.batchid.toString());
    console.log(filterData);
    setTopicsArray(filterData)
    setSelectedTopic(filterData[0])
  }
  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
    const filterData = local_masterupload.filter(obj => obj.courseid === event.target.value.courseid && obj.levelid === event.target.value.levelid && obj.batchid === event.target.value.batchid && obj.topicname === event.target.value.topicname);
    console.log(filterData);
    setvideoURL("")
    setactiveIndex(-1)
    setVideosArray(filterData);
  }


  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setVideosArray([]);
        setTopicsArray([]);
        setBatchesArray([]);
        setLevelArray([]);
        setcourseArray([])
        const userCourseIds = await userData.courseid.toString().split(",").map(id => id.trim());
        const userLevelIds = await userData.levelid.toString().split(",").map(id => id.trim());
        const userBatchIds = await userData.batchid.toString().split(",").map(id => id.trim());
        // Filter master_courses based on the course IDs in userData
        const filterCourseData = local_master_courses.filter(objA =>
          userCourseIds.includes(objA.courseid.toString())
        );
        const initialCourse = filterCourseData[0];
        setcourseArray(filterCourseData);
        setselectedCourse(initialCourse);

        const filterLevelData = local_master_level.filter(objA =>
          userLevelIds.includes(objA.levelid.toString())
        );
        const initialLevel = filterLevelData[0];
        setLevelArray(filterLevelData);
        setselectedLevel(initialLevel);

        const filterBatchesData = local_master_batches.filter(objA =>
          userBatchIds.includes(objA.batchid.toString())
        );
        const initialBatch = filterBatchesData[0];
        setBatchesArray(filterBatchesData);
        setselectedBatch(initialBatch);

        const filterTopicsData = local_master_toppics.filter(obj => obj.courseid === initialCourse.courseid && obj.levelid === initialLevel.levelid && obj.batchid === initialBatch.batchid);
        console.log(filterTopicsData);
        const initialTopic = filterTopicsData[0];
        setTopicsArray(filterTopicsData)
        setSelectedTopic(initialTopic)


        const filterVideosData = local_masterupload.filter(obj => obj.courseid === initialCourse.courseid && obj.levelid === initialLevel.levelid && obj.batchid === initialBatch.batchid && obj.topicname === initialTopic.topicname);
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
  const DecryptVideoAndPlay = (data) => {
    console.log(userData, data);
    setvideoURL("")
    // add count against every video on click and write into the file and compare that file data with show count against video
    fs.exists(videoCountFile, function (exists) {
      if (exists) {
        fs.readFile(videoCountFile, (err, mydata) => {
          let userVideoData = JSON.parse(mydata);
          console.log(userVideoData);
          let videoIndex = userVideoData.findIndex(obj => obj.videos == data.videos && obj.courseid === selectedCourse.courseid && obj.levelid === selectedLevel.levelid && obj.batchid === selectedBatch.batchid && obj.topicname === SelectedTopic.topicname);
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

    //return false

    const videoPath = `${userData.drivePath}/${selectedBatch.batchname}/${data.videos}.encrypted`;
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
                style={{ backgroundColor: '#ffff' }}
                label={userData.fullname}
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
        <Container maxWidth="xl" style={{ marginTop: 5 }}>
          <Grid container spacing={2} style={{ marginTop: 5 }}>
            <Grid item xs={6}>
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
            <Grid item xs={6}>
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
          <Grid container spacing={2} style={{ marginTop: 5 }}>
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
    </div>

  );
}
export default HomePage;