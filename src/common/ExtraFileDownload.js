
import React from 'react'
import {DialogContent, Dialog, CircularProgress} from '@material-ui/core';

const ExtraFileDownload=({showdownload, CloseApplication, enableButton})=>{
    const [valueof, setvalueof] = React.useState(0)
    let a=0;
    for (let i = 1; i <= 10; i++) {
      setTimeout( () =>{
        a=i*10;
        console.log(a)
        document.getElementById('mybar').style.width=`${a}%`;
        document.getElementById('mytext').textContent=`${a}%`;
      }, i * 1000)
    }
    return (
      <div style={{height:'100%'}}>
        <Dialog  
        disableEscapeKeyDown={true}
        disableBackdropClick={true}
        aria-labelledby="simple-LoadingDialog-title" 
        open={showdownload}>
        <DialogContent>
          <div style={{width:500, height:300, textAlign:'center', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center' }}>
              <h1>Download</h1>
              <h4>Please wait for file to get downloaded and don't click the button before the process gets completed</h4>
              <div  style={{ height:25, width:'100%', textAlign:'center',}}>
                <div id='mybar' style={{width:'1%', height:20, textAlign:'center', backgroundColor:'#282c34'}}> 
                  <h6 id='mytext' style={{padding:3, color:'#fff'}}></h6>
                </div>
              </div>
             <div onClick={()=>CloseApplication()} style={{ width:'20%', cursor:'pointer', marginTop:50, borderRadius:10, display:'flex', justifyContent:'center', alignItems:'center', height:30, backgroundColor:'#282c34', color:'#fff'}}>OKAY</div>
          </div>
        </DialogContent>
        </Dialog>
        </div>
      )
  }

  export default ExtraFileDownload