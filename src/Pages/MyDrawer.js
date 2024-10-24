import React, { useState } from "react";
import { Box, Drawer, List, ListItem, ListItemText, Avatar, IconButton, Divider, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import LineWeightIcon from "@mui/icons-material/LineWeight";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { deepPurple } from "@mui/material/colors";
import moment from "moment";  // Ensure moment.js is installed
import { Tooltip } from '@mui/material';

const drawerWidth = 280;  // Adjust width for more Gmail-like drawer

const MyDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setIsDrawerOpen(open);
  };

  let profileDetails = JSON.parse(localStorage.getItem("userDetail"));

  const drawerItems = (
   
    <Box sx={{ width: drawerWidth }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
       
      {/* Top Avatar and Name Section */}
      <Box sx={{ textAlign: "center", padding: 2, marginTop: 10 }}>
        <Avatar 
          sx={{ 
            bgcolor: deepPurple[500], 
            width: 64, 
            height: 64, 
            margin: "0 auto", 
            fontSize: "1.5rem" 
          }}
        >
        </Avatar>
        <Typography variant="h6" sx={{ marginTop: 1 }}>{profileDetails.userName}</Typography>
        <Typography variant="body2" color="textSecondary">{profileDetails.email}</Typography>
      </Box>

      <Divider sx={{ marginY: 2 }} />  {/* Spacing between avatar and list items */}

      {/* List of Profile Details */}
      <List sx={{ paddingX: 2 }}>  {/* Added horizontal padding for better alignment */}
        
        <ListItem sx={{ paddingY: 1 }}>
          <VerifiedUserIcon sx={{ marginRight: 2 }} />
          <ListItemText primary={profileDetails.fullname} secondary="Name" />
        </ListItem>
        <Divider sx={{ marginY: 1 }} />

        <ListItem sx={{ paddingY: 1 }}>
          <EmailIcon sx={{ marginRight: 2 }} />
          <ListItemText primary={profileDetails.email} secondary="E-mail" />
        </ListItem>
        <Divider sx={{ marginY: 1 }} />

        <ListItem sx={{ paddingY: 1 }}>
          <CallIcon sx={{ marginRight: 2 }} />
          <ListItemText primary={profileDetails.mobile} secondary="Mobile Number" />
        </ListItem>
        <Divider sx={{ marginY: 1 }} />

        <ListItem sx={{ paddingY: 1 }}>
          <LineWeightIcon sx={{ marginRight: 2 }} />
          <ListItemText primary={profileDetails.levelname} secondary="level" />
        </ListItem>
        <Divider sx={{ marginY: 1 }} />
        <ListItem sx={{ paddingY: 1 }}>
          <LibraryBooksIcon sx={{ marginRight: 2 }} />
          <ListItemText primary={profileDetails.batchname} secondary="Batch" />
        </ListItem>
        <Divider sx={{ marginY: 1 }} />
        <ListItem sx={{ paddingY: 1 }}>
          <ViewModuleIcon sx={{ marginRight: 2 }} />
          <ListItemText primary="Start Date" secondary={moment(profileDetails.membershipStartDate).format("DD-MM-yyyy")} />
        </ListItem>
        <Divider sx={{ marginY: 1 }} />
        <ListItem sx={{ paddingY: 1 }}>
          <LibraryBooksIcon sx={{ marginRight: 2 }} />
          <ListItemText primary="Expiry" secondary={moment(profileDetails.membershipEndDate).format("DD-MM-yyyy")} />
        </ListItem>

      </List>
    </Box>
  );

  return (
    <div>
        <Tooltip title="Profile" placement="bottom"> 
      <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      </Tooltip>
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        {drawerItems}
      </Drawer>
    </div>
  );
};

export default MyDrawer;
