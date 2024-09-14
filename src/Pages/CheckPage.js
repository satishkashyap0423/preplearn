import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function CheckPage({history}) {
    React.useEffect(() => {
        let teacherDetails = JSON.parse(localStorage.getItem("userDetail"));
        if(teacherDetails!=null && teacherDetails!=undefined){
            setTimeout(() => {
            history.push("/HomePage")
                
            }, 2000);
        }
        else {
            history.push("/LoginPage")
        }
        // setTimeout(() => {
        //     history.push("/LoginPage")
        // }, 3000);
    }, [])
  return (
    <Stack sx={{ color: 'grey.500', height:'100vh', justifyContent:'center', alignItems:'center' }} spacing={2} direction="row">
      <CircularProgress color="success" />
    </Stack>
  );
}
