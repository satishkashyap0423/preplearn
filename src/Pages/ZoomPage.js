import React, {useState, useEffect} from 'react'
import HomeIcon from '@material-ui/icons/Home';
import AccountCircle from '@material-ui/icons/Person';
import Container from '@material-ui/core/Container';
import CardHeader from '@material-ui/core/CardHeader';
import 'react-toastify/dist/ReactToastify.css';
import FormHelperText from '@material-ui/core/FormHelperText';
import clsx from 'clsx';
import { makeStyles, useTheme, emphasize, withStyles, fade } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import CardActions from '@material-ui/core/CardActions';
import ScheduleIcon from '@material-ui/icons/Schedule';
import Minimize from '@material-ui/icons/RemoveCircle';
import Cancel from '@material-ui/icons/CancelRounded';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import Tooltip from '@material-ui/core/Tooltip'
import NativeSelect from '@material-ui/core/NativeSelect';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import FormControl from '@material-ui/core/FormControl';
import { useSelector, useDispatch } from 'react-redux';
import { FetchInstance } from '../Service/Services';
import { ToastContainer, toast } from 'react-toastify';
import packageJson from '../../package.json';
import { RelatedFreeTopicList, RelatedTopicList, SelectUserBatch } from '../Redux-Folder/Actions/action';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { ZoomMtg } from '@zoomus/websdk';
import Loader from '../Common/Loader';
const path = window.require('path');
const request = window.require('request');
const progress = window.require('request-progress');
const os = window.require('os');
const fs = window.require('fs');
const shell = window.require('electron').shell;
const execSync = window.require('child_process').execSync;
const options = {
    encoding: 'utf8'
}


ZoomMtg.setZoomJSLib('https://source.zoom.us/2.17.0/lib', '/av');

ZoomMtg.preLoadWasm()
ZoomMtg.prepareWebSDK()

// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('en-US')
ZoomMtg.i18n.reload('en-US')



const drawerWidth = 260;
const ColorButton = withStyles((theme) => ({
  root: {
    background: 'linear-gradient(45deg, #fed008  30%, #fed0089c  90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px'
  },
}))(Button);

const ColorButton2 = withStyles((theme) => ({
  root: {
    background: 'linear-gradient(45deg, #f50057  30%, #ff4f8e  90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px'
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
    paddingTop:70,
    backgroundColor:'#f5f5f5',
    padding: theme.spacing(3),
  },
  cardstyle:{
    minWidth: 275
    
  },
  logo2: {
    maxWidth: 65,
    height:65,
    marginRight: '0px'
  },

  logo3: {
    maxWidth: 35,
    height:35,
    marginRight: '0px'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
activeTabCSS : {
        backgroundColor:'white',
        cursor:'pointer',
    },
    nonactiveTabCSS : { 
        backgroundColor:'gray', 
        cursor:'pointer',
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
    listneshted:{
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
      height:50,
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
      marginTop:7,
      borderRadius:10,
      backgroundColor: '#ddd'
    },
    myBar: {
      width: '1%',
      height: 14,
      borderRadius:10,
      backgroundColor: '#4CAF50'
    },
    label:{
      textAlign:'center',
      fontSize:10,
      color:'#fff'
    }
    
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

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <strong>Version : {packageJson.version}</strong>
    </Typography>
  );
}

let homedir =os.homedir();
var drivepath = homedir.replaceAll("\\", "/")
console.log(homedir.replaceAll("\\", "/"))

//C:\Users\Designer
function ZoomPage({history}) {
    //console.log(`file:///${drivepath}/AppData/Local/Programs/preplearn/resources/app.asar/build/index.html#/HomePage`)
    var signatureEndpoint = 'https://craftifex.com/preplearn/zoomeeting'
    // This Sample App has been updated to use SDK App type credentials https://marketplace.zoom.us/docs/guides/build/sdk-app
    var sdkKey = '2eHXwRi2fHjsyAnvRi1P24IToGtenWHNGDTK'
    var meetingNumber = '9400493185'
    var role = 0
    //var leaveUrl = 'http://localhost:3000'
    var leaveUrl = `file:///${drivepath}/AppData/Local/Programs/preplearn/resources/app.asar/build/index.html#/HomePage`
    //var leaveUrl = "file:///Applications/preplearn.app/Contents/Resources/app.asar/build/index.html#/HomePage"
    var userName = JSON.parse(localStorage.getItem("userDetail")).fullname
    var userEmail = ''
    var passWord = '8QTWHc'

    // pass in the registrant's token if your meeting or webinar requires registration. More info here:
    // Meetings: https://marketplace.zoom.us/docs/sdk/native-sdks/web/client-view/meetings#join-registered
    // Webinars: https://marketplace.zoom.us/docs/sdk/native-sdks/web/client-view/webinars#join-registered
    var registrantToken = ''
    const classes = useStyles();
    React.useEffect(() => {
      document.getElementById('zmmtg-root').style.display = 'none'
      
      getSignature()
    }, [])
    
    function getSignature() {
      fetch(signatureEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          meetingNumber: meetingNumber,
          role: role
        })
      }).then(res => res.json())
      .then(response => {
        startMeeting(response.signature)
      }).catch(error => {
        console.error(error)
      })
    }

    function startMeeting(signature) {
        document.getElementById('zmmtg-root').style.display = 'block'
        ZoomMtg.init({
          leaveUrl: leaveUrl,
          disableRecord:true,
          //disableJoinAudio:true,
          screenShare:false,
          isSupportChat:true,
          isSupportAV:true,
          isSupportCC:true,
          success: (success) => {
            console.log(success)
            ZoomMtg.join({
              signature: signature,
              meetingNumber: meetingNumber,
              userName: userName,
              sdkKey: sdkKey,
              userEmail: userEmail,
              passWord: passWord,
              tk: registrantToken,
              success: (success) => {
                console.log(success)
              },
              error: (error) => {
                console.log(error)
              }
            })
    
          },
          error: (error) => {
            console.log(error)
          }
        })

        // ZoomMtg.inMeetingServiceListener('onMeetingStatus', function (data) {
        //   console.log('inMeetingServiceListener onUserJoin', "*", data);
        //   if(data.meetingStatus==3){
        //       history.push('HomePage')
        //     // ZoomMtg.leaveMeeting({})
        //   }
        // });
      }
      const CloseApp=()=>{
        ZoomMtg.leaveMeeting({})
        //history.push('HomePage')
        // document.getElementById('zmmtg-root').style.display = 'none'
        
        // let windows =  window.require('@electron/remote').getCurrentWindow();
        // console.log(windows.webContents.session.clearCache)
        // windows.webContents.session.clearCache();
        // windows.close()
      }

  return (
     <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        style={{ backgroundColor: '#fed008', width:'100%' }}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar variant="dense" style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
          <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
            {/* <img src={require('../assets/Images/ic_launcher.png')} alt="Aswini" className={classes.logo} /> */}
            <Breadcrumbs aria-label="breadcrumb">
              <StyledBreadcrumb
                component="button"
                style={{ backgroundColor: '#72fb40' }}
                label="Home"
                icon={<HomeIcon fontSize="small" />}
              />
            </Breadcrumbs>
          </div>
          <div className={classes.search}>
          <IconButton color="inherit" onClick={()=>CloseApp()}>
                  <Cancel />
          </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <main className={classes.content} bgcolor="background.paper"> 

      <Container maxWidth="xl" style={{marginTop:40}}>
      {/* <div style={{width:'100%', height:'100vh', display:'flex', flex:1, justifyContent:'center', alignItems:'center' }}>
        <div onClick={getSignature} style={{width:300, height:70, display:'flex',justifyContent:'center', alignItems:'center',  backgroundColor:'red' }}>
          <h3 style={{color:'#fff'}}>Zoom Page</h3>
        </div>
    </div> */}
      </Container>
      </main>
    </div>
  )
}

export default ZoomPage