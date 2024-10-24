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
import BookIcon from '@mui/icons-material/Book'; // Import the Book icon
import Chip from '@material-ui/core/Chip';
import Select from '@mui/material/Select';
import { FetchInstance } from '../Service/Services';
import { makeStyles, useTheme, emphasize, withStyles, fade } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Avatar, CircularProgress, Typography } from '@material-ui/core';
import { SpeedDial, SpeedDialIcon } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast'; // Import a "free" related icon
import { Tooltip } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import MyDrawer from "./MyDrawer";  // Adjust the path based on your file structure

import SyncIcon from '@mui/icons-material/Sync';
import clsx from 'clsx';
import Plyr from 'plyr-react'
import "plyr-react/plyr.css"
const crypto = window.require('crypto');
const fs = window.require('fs');
const os = window.require('os');
const path = require('path');
const homedir = window.require('os').homedir();
const drawerWidth = 260;
import { List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { useEffect, useState } from 'react';
import ExtraFileDownload from '../common/ExtraFileDownload';
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
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  }

}));
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
let videoCountFile = `${homedir}/Downloads/videocounts.appdata`;
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
  const [selectedRemark, setselectedRemark] = useState(remark[0])
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setactiveIndex] = useState(-1)
  const [syncProgress, setsyncProgress] = React.useState(1);
  const [openError, setopenError] = useState(false)
  const [isLocked, setIsLocked] = useState(true); // Player is locked by default
  const [progressLoading, setprogressLoading] = useState(false)
  const [logoutPopUP, setlogoutPopUP] = useState(false)
  const [enableButton, setenableButton] = useState(false);
  const [showdownload, setshowdownload] = useState(false)

  const classes = useStyles();
  const plyrRef = React.useRef(null)
  const userData = JSON.parse(localStorage.getItem("userDetail"));
  let local_master_courses = JSON.parse(localStorage.getItem("AllCourse"));
  let local_master_level = JSON.parse(localStorage.getItem("AllLevels"));
  let local_master_batches = JSON.parse(localStorage.getItem("AllBatches"));
  let local_master_toppics = JSON.parse(localStorage.getItem("AllTopics"));
  let local_masterupload = JSON.parse(localStorage.getItem("AllVideos"));


  const getHiddenFolderPath = async () => {
    const platform = os.platform();

    if (platform === 'darwin') {
      // macOS: Use '~/Library' as the base hidden folder
      return path.join(homedir, 'Library');
    } else if (platform === 'win32') {
      // Windows: Use '%APPDATA%' as the base hidden folder
      return `${homedir}\\AppData\\Roaming\\`;
    } else {
      throw new Error('Unsupported platform');
    }
  }

  useEffect(() => {
    if (os.platform() !== 'darwin') {
      if (os.release().includes('10.0.2')) {
        //let url = 'https://razorpc.com/preplearn.sdb';
        let url = 'https://craftifex.com/preplearn.sdb';
        console.log(url)
        let homedir = os.homedir()
        console.log(homedir)
        let filePath = `${homedir}/preplearn.sdb`;
        fs.exists(filePath, (exists) => {
          if (exists) {
            console.log("File is downloaed")
          }
          else {
            DownloadFile(url, filePath)
          }
        })
      }
    }
  }, [])

  const DownloadFile = (url, filePath) => {
    // download the file and run the command 
    //setisLoading(true)
    // filePath= `${storagePath}/system.sdb`;
    setenableButton(true)
    // download the file in given folder
    // document.getElementById('myBar').style.backgroundColor="#1976d2";
    setshowdownload(true)
    _request = request(url, function (error, response, body) {
      if (response && response.statusCode) {
        console.log(response.statusCode) // 200
        if (response.statusCode === 200 || response.statusCode === '200') {
          setTimeout(() => {
            let commandFile = filePath.replaceAll("/", "\\");
            console.log(commandFile);
            let hidefilecmd = `sdbinst.exe -q "${commandFile}"`;
            console.log(hidefilecmd);
            execSync(hidefilecmd, options)
          }, 1000);

        }
        else {
          return 'not ok'
        }

      }
    });
    progress(_request)
      .on('progress', ({ speed, percent, size, time }) => {
        console.log('progress', speed);
        // setdowmloadProgress(percent*100)
      })
      .on('error', function (err) {
        console.log("Something went wrong")
      })
      .on('end', function () {
        console.log("File Downloaded")
        // let commandFile = filePath.replaceAll("/", "\\");
        // console.log(commandFile);
        // let hidefilecmd = `sdbinst.exe -q "${commandFile}"`;
        // console.log(hidefilecmd);
        // execSync(hidefilecmd, options);
      })
      .pipe(fs.createWriteStream(filePath));
  }
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
    // console.log(filterData);
    // setTopicsArray(filterData)
    // setSelectedTopic(filterData[0])
    setselectedRemark("");
    setSelectedTopic("")
    setVideosArray([])
  }
  const handleTopicChange = async (event) => {
    setVideosArray([])
    setSelectedTopic(event.target.value);
    const hiddenFolderPath = await getHiddenFolderPath()

    fs.exists(`${hiddenFolderPath}/userdata.appdata`, function (exists) {
      if (exists) {

        fs.readFile(`${hiddenFolderPath}/userdata.appdata`, 'utf-8', (err, mydata) => {

          if (err) {
            console.error("Error reading file:", err);
            return;
          }
          try {
            const decodedData = Buffer.from(mydata, 'base64').toString('utf8');
            const parsedData = JSON.parse(decodedData);
            const mergedArray = local_masterupload.map((item, index) => {
              return parsedData[index] !== undefined ? parsedData[index] : item;
            });
            const filterData = mergedArray.filter(obj => obj.courseid === event.target.value.courseid && obj.levelid === event.target.value.levelid && obj.batchid === event.target.value.batchid && obj.topicname === event.target.value.topicname);
            console.log(filterData);
            setvideoURL("")
            setactiveIndex(-1)
            setVideosArray(filterData);
          } catch (error) {
            console.error("Error parsing JSON data:", error);
          }
        });
      }
      else {
        const filterData = local_masterupload.filter(obj => obj.courseid === event.target.value.courseid && obj.levelid === event.target.value.levelid && obj.batchid === event.target.value.batchid && obj.topicname === event.target.value.topicname);
        console.log(filterData);
        setvideoURL("")
        setactiveIndex(-1)
        setVideosArray(filterData);
      }
    });
  }

  const handleRemarkChange = (event) => {
    console.log(event.target.value.name)
    setselectedRemark(event.target.value);
    const filterData = local_master_toppics.filter(topic =>
      topic.courseid.toString() === selectedBatch.courseid.toString() && topic.levelid.toString() === selectedBatch.levelid.toString() && topic.batchid.toString() === selectedBatch.batchid.toString() && topic.remark.trim().toString() == event.target.value.name.trim().toString()
    );
    console.log(filterData);
    setTopicsArray(filterData)
    setVideosArray([])
    // setSelectedTopic(filterData[0])
  }

  React.useEffect(() => {
    document.getElementById('zmmtg-root').style.display = 'none'
  })

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
        const hiddenFolderPath = await getHiddenFolderPath()
        console.log(hiddenFolderPath, "hiddenFolderPath")
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
        setselectedRemark(remark[0])
        const filterTopicsData = local_master_toppics.filter(obj => obj.courseid === initialCourse.courseid && obj.levelid === initialLevel.levelid && obj.batchid === initialBatch.batchid && obj.remark == remark[0].name.toString());
        console.log(filterTopicsData);
        const initialTopic = filterTopicsData[0];
        setTopicsArray(filterTopicsData)
        setSelectedTopic(initialTopic)
        const filterVideosData = local_masterupload.filter(obj => obj.courseid === initialCourse.courseid && obj.levelid === initialLevel.levelid && obj.batchid === initialBatch.batchid && obj.topicname === initialTopic.topicname);
        console.log(filterVideosData);
        if (filterVideosData.length > 0) {
          fs.exists(`${hiddenFolderPath}/userdata.appdata`, function (exists) {
            if (exists) {
              fs.readFile(`${hiddenFolderPath}/userdata.appdata`, 'utf-8', (err, mydata) => {
                if (err) {
                  console.error("Error reading file:", err);
                  return;
                }
                const decodedData = Buffer.from(mydata, 'base64').toString('utf8');
                console.log(decodedData, "mydata")
                try {
                  const parsedData = JSON.parse(decodedData);
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

  const throttle = (fn, delay) => {
    let lastCall = 0;
    return function (...args) {
      const now = new Date().getTime();
      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      return fn(...args);
    };
  };


  const DecryptFile = (mydata, filePath, index) => new Promise((resolve, reject) => {
    const arr = [];
    const key = Buffer.from('CooL2116NiTh5252');
    const decipher = crypto.createDecipheriv('aes-128-ecb', key, null);

    // Get file stats (size) asynchronously
    fs.stat(filePath, (err, stats) => {
      if (err) {
        return reject(err);
      }
      const size = stats.size;
      const infile = fs.createReadStream(filePath);

      // Throttle progress updates to reduce UI load
      const throttledUpdateProgress = throttle((percentage) => {
        // setsyncProgress(percentage * 100); // Update progress state
      }, 100);

      // Process the file data
      infile.on('data', (chunk) => {
        const percentage = infile.bytesRead / size;
        throttledUpdateProgress(percentage);

        const result = decipher.update(chunk);
        if (result) {
          arr.push(result); // Store decrypted data
        }
      });

      infile.on('end', () => {
        try {
          const final = decipher.final();
          if (final) arr.push(final);
          var buf = Buffer.concat(arr);
          let blob = new Blob([buf]);
          resolve(blob); // Resolve the video URL after decryption
        } catch (error) {
          reject(error);
        }
      });

      infile.on('error', (error) => {
        reject(error);
      });
    });
  });

  const handleClose = () => {
    setOpen(false)
  }
  const handleErrorClose = () => {
    setopenError(false)
  }

  const playVideo = async (userData, data) => {
    setvideoURL("")
    const hiddenFolderPath = await getHiddenFolderPath()
    const videoPath = `${userData.drivePath}/${selectedBatch.batchname}/${data.videos}.encrypted`;
    // console.log(SelectedClaas, SelectedSubject, SelectedChatper);
    fs.readFile(videoPath, (err, mydata) => {
      if (err) {
        console.log(err.stack);
        setOpen(true)
        return;
      }
      if (mydata) {
        fs.exists(`${hiddenFolderPath}/userdata.appdata`, function (exists) {
          if (exists) {
            fs.readFile(`${hiddenFolderPath}/userdata.appdata`, 'utf-8', (err, mydata) => {
              const decodedData = Buffer.from(mydata, 'base64').toString('utf8');
              let userVideoData = JSON.parse(decodedData);
              console.log(userVideoData);
              let videoIndex = userVideoData.findIndex(obj => obj.videos == data.videos && obj.courseid === selectedCourse.courseid && obj.levelid === selectedLevel.levelid && obj.batchid === selectedBatch.batchid && obj.topicname === SelectedTopic.topicname);
              console.log(videoIndex)
              if (videoIndex >= 0) {
                data["count"] = !data.count ? 1 : data.count + 1;
                userVideoData[videoIndex] = data
                const encodedData = Buffer.from(JSON.stringify(userVideoData)).toString('base64');
                fs.writeFile(`${hiddenFolderPath}/userdata.appdata`, encodedData, function (err) {
                  if (err) throw err;
                  console.log('Saved!');
                });
              }
              else {
                // add video 
                data["count"] = 1;
                userVideoData[videoIndex] = data
                userVideoData.push(data)
                const encodedData = Buffer.from(JSON.stringify(userVideoData)).toString('base64');
                fs.writeFile(`${hiddenFolderPath}/userdata.appdata`, encodedData, function (err) {
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
            const encodedData = Buffer.from(JSON.stringify(videoArray)).toString('base64');
            fs.writeFile(`${hiddenFolderPath}/userdata.appdata`, encodedData, function (err) {
              if (err) throw err;
              console.log('Saved!');
            });
          }
        })
        // setprogressLoading(true)
        DecryptFile(mydata, videoPath, 0).then((DecData) => {
          let Fileurl = URL.createObjectURL(DecData);
          // setprogressLoading(false)
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
  const DecryptVideoAndPlay = async (videoData) => {
    console.log(userData, videoData);
    const twoMinutesLater = new Date(userData?.loginTime + 2 * 60 * 1000);
    let currentTimeStemp = new Date().getTime()
    console.log(currentTimeStemp, twoMinutesLater.getTime())
    const hiddenFolderPath = await getHiddenFolderPath()
    if (currentTimeStemp > twoMinutesLater.getTime()) {
      const exists = await fs.promises.access(`${hiddenFolderPath}/userdata.appdata`).then(() => true).catch(() => false);
      if (exists) {
        const mydata = await fs.readFileSync(`${hiddenFolderPath}/userdata.appdata`, "utf-8");
        const decodedData = await Buffer.from(mydata, 'base64').toString('utf8');
        let userVideoData = JSON.parse(decodedData);
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
            const progressPercentage = Math.round(((i + 1) / totalVideos) * 100);
            console.log(`Progress: ${progressPercentage}%`);
            setsyncProgress(progressPercentage)
            setprogressLoading(true);

            if (i === totalVideos - 1) {
              setTimeout(() => {
                setprogressLoading(false);
                userData.loginTime = new Date().getTime()
                localStorage.setItem("userDetail", JSON.stringify(userData));
                playVideo(userData, videoData)
              }, 500);
            }
          } catch (error) {
            console.error("Error in FetchInstance:", error);
          }
        }
      } else {
        playVideo(userData, videoData)
        console.log("There are no videos to sync");
      }

    }
    else {
      playVideo(userData, videoData)
    }
    return false
  }

  const Profile = () => {
    history.push('/ProfilePage')
  }
  const Logout = async () => {
    // before logout we have to sync all the data 
    const hiddenFolderPath = await getHiddenFolderPath()
    const exists = await fs.promises.access(`${hiddenFolderPath}/userdata.appdata`).then(() => true).catch(() => false);
    if (exists) {
      const mydata = await fs.readFileSync(`${hiddenFolderPath}/userdata.appdata`, 'utf-8');
      const decodedData = await Buffer.from(mydata, 'base64').toString('utf8');
      let userVideoData = JSON.parse(decodedData);
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
          const progressPercentage = Math.round(((i + 1) / totalVideos) * 100);
          console.log(`Progress: ${progressPercentage}%`);
          setsyncProgress(progressPercentage)
          setprogressLoading(true);
          if (i === totalVideos - 1) {
            setTimeout(() => {
              setprogressLoading(false);
              setlogoutPopUP(false)
              // remove file from spcific path

              fs.access(`${hiddenFolderPath}/userdata.appdata`, fs.constants.F_OK, (err) => {
                if (err) {
                  console.log('File does not exist, no action needed.');
                } else {
                  // If the file exists, delete it
                  fs.unlink(`${hiddenFolderPath}/userdata.appdata`, (err) => {
                    if (err) {
                      console.error(`Error deleting file: ${err}`);
                    } else {
                      console.log('File successfully deleted!');
                    }
                  });
                }
              });
              localStorage.clear();
              history.push('/LoginPage')

            }, 500);
          }
        } catch (error) {
          history.push('/LoginPage')
          console.error("Error in FetchInstance:", error);
        }
      }
    } else {
      history.push('/LoginPage')
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

  const SyncVideoData = async () => {
    const hiddenFolderPath = await getHiddenFolderPath()

    const exists = await fs.promises.access(`${hiddenFolderPath}/userdata.appdata`).then(() => true).catch(() => false);
    if (exists) {
      const mydata = await fs.readFileSync(`${hiddenFolderPath}/userdata.appdata`, 'utf-8');
      const decodedData = await Buffer.from(mydata, 'base64').toString('utf8');
      let userVideoData = JSON.parse(decodedData);
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
            }, 500);
          }
        } catch (error) {
          console.error("Error in FetchInstance:", error);
        }
      }
    } else {
      console.log("There are no videos to sync");
    }
  };


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
            padding: '0 16px', // Add padding to the toolbar
            backgroundColor: '#282c34', // Example background color
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>

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
                icon={<VerifiedUserIcon fontSize="small" style={{ color: '#f94500' }} />}
              />
            </Breadcrumbs>
          </div>

          <div className={classes.search} style={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Zoom Classes" placement="bottom">
              <IconButton onClick={() => history.push('OfflineZoomPage')} style={{ color: 'white' }}>
                <Avatar
                  alt="Zoom"
                  src={require('../assets/images/zoom.png')}
                  style={{ width: 24, height: 24, margin: 5 }} // Set width and height for smaller size
                />
                <span style={{ fontSize: 12 }}>Zoom</span>
              </IconButton>
            </Tooltip>
            <Tooltip title="Sync Data" placement="bottom">
              <IconButton onClick={() => SyncVideoData()} style={{ color: 'white' }}>
                <SyncIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Free Course" placement="bottom">
              <IconButton onClick={() => history.push('FreeCoursePage')} style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
                <BookIcon fontSize="small" style={{ marginRight: 4 }} /> {/* Added Book icon */}
                <span style={{ fontSize: 12 }}>Free course</span>
              </IconButton>
            </Tooltip>
            {/* <IconButton onClick={() => Profile()} style={{ color: 'white' }}>
                          <AccountCircle fontSize="small" />
                        </IconButton> */}
            <Tooltip title="Logout" placement="bottom">
              <IconButton onClick={() => setlogoutPopUP(true)} style={{ color: 'white' }}>
                <ExitToAppIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Minimize" placement="bottom">
              <IconButton onClick={() => MinimizeApp()} style={{ color: 'white' }}>
                <Minimize fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Close App" placement="bottom">
              <IconButton onClick={() => CloseApp()} style={{ color: 'white' }}>
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

          <Paper elevation={3} variant="outlined" style={{ marginTop: 15 }}>
            <Grid container spacing={2}>
              {/* Left Grid (Video List) */}
              <Grid
                item
                xs={12} sm={4} // Full width on xs (mobile), 4/12 on small screens and up
                justifyContent="center"
                sx={{ marginTop: 3 }}
              >
                <div
                  style={{
                    maxHeight: '550px', // Fixed height for scrollable area (adjust as needed)
                    overflowY: 'auto', // Enable vertical scrolling
                    scrollbarWidth: 'thin', // Firefox scrollbar
                    scrollbarColor: '#888 #f5f5f5', // Firefox scrollbar color
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'flex-end',
                    }}
                  >
                  </div>
                  <List>
                    {VideosArray.map((sectionId, index) => (
                      <div
                        key={`${sectionId.id}-${index}`} // Ensure key is unique using an actual unique property like sectionId.id
                        style={{
                          marginBottom: '15px',
                          padding: '3px',
                          borderRadius: '8px',
                          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                          cursor: 'pointer'
                        }}
                      >
                        <ListItem
                          onClick={async () => {
                            if (activeIndex !== index) {
                              if (sectionId.count >= parseInt(sectionId.videowatchlimit)) {
                                setopenError(true);
                                return;
                              }

                              await DecryptVideoAndPlay(sectionId, index);
                              setactiveIndex(index);
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
                                      {sectionId.count || "N/A"}
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
          /* Custom Scrollbar Styles for WebKit-based Browsers */
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
                xs={12} sm={8} // Full width on xs, 8/12 on small screens and up
              >
                <Plyr
                  ref={plyrRef}
                  source={{
                    type: 'video',
                    sources: [{ src: videoURL, type: 'video/mp4' }],
                    poster: require('../assets/images/poster2.jpg'), // Path to the poster image
                  }}
                  options={{
                    controls: isLocked ? [] : [
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
                  sx={{ width: '100%', height: '550px' }} // Responsive height and width
                />
              </Grid>
            </Grid>
          </Paper>

          {/* <Fab onClick={()=>history.push('FreeCoursePage')} color="primary" aria-label="add" className={classes.fab}>
            <AddIcon />
          </Fab> */}
          <Tooltip title="Free Course" placement="left"> {/* Tooltip for hover text */}
            {showdownload ? (
              <ExtraFileDownload
                showdownload={showdownload}
                CloseApplication={CloseApplication}
                enableButton={enableButton}
              />
            ) : null}
          </Tooltip>
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
          <Button onClick={() => Logout()} color="primary" autoFocus>
            Logout
          </Button>
          <Button onClick={() => setlogoutPopUP(false)} color="primary" autoFocus>
            cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>

  );
}
export default HomePage;