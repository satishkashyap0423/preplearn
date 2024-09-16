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
    width: '200px',
    height: 'auto',
    borderRadius: 0, // Remove circular shape
    backgroundColor: 'transparent', // Remove grey background
    '& img': {
      width: '100%',
      height: '100%',
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
const ColorButton = withStyles((theme) => ({
  root: {
    background: 'linear-gradient(45deg, #ee9254  30%, #ee9254  90%)',
    border: 0,
    borderRadius: 3,
    color: 'white',
    height: 48,
    padding: '0 30px',
    marginTop: '20px'
  },
}))(Button);
const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#ee9254',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#ee9254',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#ee9254',
      },
      '&:hover fieldset': {
        borderColor: '#ee9254',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#ee9254',
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
        let url = 'https://sagclapp.com/preplearn.sdb';
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
      setShowAlert(true)
      setAlertType("error")
      setTimeout(() => {
        setShowAlert(false)
      }, 1500);
      setMessage("Please enter email")
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
          setShowAlert(true)
          setAlertType("error")
          setTimeout(() => {
            setShowAlert(false)
          }, 1500);
          setMessage(data.message);
          return false
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
            setShowAlert(true)
            setAlertType("error")
            setTimeout(() => {
              setShowAlert(false)
            }, 1500);
            setMessage(`You are using an older version of App. Please contact technical desk +917596033310. Latest version of our App is ${data.data.appversion}`)
          }

        }
        else if (data.data.systemstatus === 1 || data.data.systemstatus === '1') {
          // it is for online not for offline user.
          localStorage.setItem("userDetail", JSON.stringify(data.data));
          history.push('/OnlineHomePage')
          
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
    let path = `${driveinfo.Drive}/${userDetail.boardName}`;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
      userDetail["drivePath"] = `${driveinfo.Drive}/preplearn`;
      localStorage.setItem("userDetail", JSON.stringify(userDetail));
      // Wait while feetching User course detail, it takes few mintues.
      let getCourses = await FetchInstance("GET", "", "getAllCourse");
      let getLevels = await FetchInstance("GET", "", "getAllLevel");
      let getBatches = await FetchInstance("GET", "", "getAllBatches");
      let getTopics = await FetchInstance("GET", "", "getAllTopics");
      let getVideos = await FetchInstance("GET", "", "getAllVideos");
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
      localStorage.setItem("userDetail", JSON.stringify(userDetail))
      let getCourses = await FetchInstance("GET", "", "getAllCourse");
      let getLevels = await FetchInstance("GET", "", "getAllLevel");
      let getBatches = await FetchInstance("GET", "", "getAllBatches");
      let getTopics = await FetchInstance("GET", "", "getAllTopics");
      let getVideos = await FetchInstance("GET", "", "getAllVideos");
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
            <Avatar
              sx={{ bgcolor: '#fed008' }}
              className={classes.logo}
              style={{
                width: '200px',
                marginBottom: '30px',
                height: 'auto',
                borderRadius: '0', // Remove circular shape
              }}
            >
              <img
                src={require('../assets/images/ic_launcher.png')}
                alt="Logo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Avatar>
            <Typography component="h6" variant="h15">
              Welcome to PREP LEARN, a leading provider of D2H classes of CA | CMA | CS | B.COM
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container>
                <Grid item xs={12}>
                  <CssTextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <CssTextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <ColorButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                LogIn
              </ColorButton>
              {/* <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid> */}

            </Box>
          </Box>
          {showAlert &&
            <Alert severity={alertType}>
              {message}
            </Alert>
          }
          {showdownload ? <ExtraFileDownload
            showdownload={showdownload}
            CloseApplication={() => CloseApplication()}
            enableButton={enableButton}
          /> : null}
          <Copyright sx={{ mt: 5 }} />
        </Container>
        <DriveInfoDisk State={DiskDrive} Message={DiskDrive.Message} Close={DiskDrive.Open} getInfo={(driveinfo) => getInfo(driveinfo)} CancelModel={() => CancelModel()} />
      </ThemeProvider>
    </div>
  );
}