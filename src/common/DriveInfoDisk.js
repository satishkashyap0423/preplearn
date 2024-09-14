import React,{useState,useEffect,useRef} from 'react'
import {DialogContent,DialogTitle,Typography,ListItemIcon,DialogActions,
       Button,ListItem,ListItemText,List,Checkbox, DialogContentText, Dialog, CircularProgress} from '@material-ui/core';
import { FolderOpen} from '@material-ui/icons';

const DriveInfoDisk=({State,Message, getInfo, CancelModel})=>{
    //STEAM HERE
    console.info(State)
    const [checked, setChecked] = useState(null);
    const handleToggle=(index)=>{
      setChecked(index)
    }
    return (
      <div style={{height:'100%'}}>
    <Dialog  
    disableEscapeKeyDown={true}
    disableBackdropClick={true}
    aria-labelledby="simple-LoadingDialog-title" 
    open={State.Open}>
         <DialogTitle id="simple-dialog-title">
        <Typography component={'span'} variant={'body2'}
         style={{fontSize:'1.3rem',fontWeight:'bold'}}>{Message}</Typography>
        </DialogTitle>
        <DialogContent style={{padding:0}}>
           {State.DataDisk.map((data,index)=>{
           return  <List key={data.Drive} style={{padding:0}} component="nav" aria-label="main mailbox folders">
                 <ListItem button onClick={()=>handleToggle(index)}>
                <ListItemIcon>
                  <FolderOpen />
                </ListItemIcon>
                <ListItemText primary={`${data.Drive} Drive`} 
                 secondary={`Free Space: ${data.FreeSize} GB`}/>
                <Checkbox
                  edge="end"
                  checked={checked===index}
                  inputProps={{ 'aria-labelledby': data.Drive }}
                />
               </ListItem>
               </List>
           })
           }
        </DialogContent>
        <DialogActions>
            <Button color="secondary" onClick={()=>CancelModel()}>
              Cancel
            </Button>
            <Button variant="contained" color="secondary" onClick={()=> getInfo(State.DataDisk[checked])}>
              Ok
            </Button>
         </DialogActions>
      </Dialog>
      </div>
    )
  }

export default DriveInfoDisk