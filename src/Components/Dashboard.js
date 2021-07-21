import React, { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DraftsIcon from "@material-ui/icons/Drafts";
import StoreIcon from '@material-ui/icons/Store';
import CategoryIcon from '@material-ui/icons/Category';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import { Redirect } from "react-router-dom";
import  { useHistory } from 'react-router-dom'

import Store from "./StoreStage";
import Category from "./CategoryStage";
import Orders from './OrdersStage';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    backgroundColor: theme.palette.primary.main,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#b3e5fc",
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
}));

export default function ClippedDrawer(props) {
  const classes = useStyles();
  let history = useHistory();

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  useEffect(() => {
    if(!(localStorage.getItem('selectedIndex'))){
      localStorage.setItem("selectedIndex", 0);
    }else{
      setSelectedIndex((localStorage.getItem('selectedIndex')));
    }
  },[]);
  
  if(!(localStorage.getItem('token'))){
    return <Redirect to="/" />;
  }

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    localStorage.setItem("selectedIndex", index);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.title}>
            
          </Typography>
          <Button color="inherit" onClick={()=> {localStorage.clear(); history.push('/');}}>
            <ExitToAppIcon /> &nbsp; Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar>
        <Typography variant="h6" noWrap className={classes.title}>
            SITHRU ADMIN
            </Typography>
        </Toolbar>
        <div className={classes.drawerContainer}>

          <List component="nav" aria-label="main mailbox folders">
        
            <ListItem
              button
              selected={(localStorage.getItem('selectedIndex')) === "0"}
              onClick={(event) => handleListItemClick(event, 0)}
            >
              <ListItemIcon>
                <StoreIcon />
              </ListItemIcon>
              <ListItemText primary="Store" />
            </ListItem>
            <Divider />
            <ListItem
              button
              selected={(localStorage.getItem('selectedIndex')) === "1"}
              onClick={(event) => handleListItemClick(event, 1)}
            >
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary="Category" />
            </ListItem>
            <Divider />
            <ListItem
              button
              selected={(localStorage.getItem('selectedIndex')) === "2"}
              onClick={(event) => handleListItemClick(event, 2)}
            >
              <ListItemIcon>
                <LocalShippingIcon />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItem>
            <Divider />
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        {(localStorage.getItem('selectedIndex')) === "0" ? (
            <Store />
        ) : (localStorage.getItem('selectedIndex')) === "1" ? (
            <Category />
        ) : (
            <Orders />
        )}
      </main>
    </div>
  );
}
