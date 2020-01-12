import React from 'react';
import { List, Drawer, Divider, ListItem, ListItemIcon, ListItemText, makeStyles, Avatar, Typography } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Router from 'next/router';
import Cookies from 'js-cookie';
import { MultifactorAuth } from './MultifactorAuth';
import Axios from 'axios';
import moment from 'moment';
import { ControlPanel } from './ControlPanel';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    appBar: {
      width: `calc(100% - ${240}px)`,
      marginLeft: 240,
    },
    drawer: {
      width: 240,
      flexShrink: 0,
    },
    drawerPaper: {
      width: 240,
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
    avatar: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10,
        paddingTop: 10,
    }
  }));

  
export const Dashboard = (userData) => {
    const classes = useStyles();
    const { data } = userData;
    const user = {
        email: data._id,
        iat: data.iat
    }

    const logout = () => { 
        const date = moment().format('MMMM Do YYYY, h:mm:ss a')
        Axios.post('http://localhost:3001/changedate', `email=${user.email}&date=${date}`)
        Cookies.remove('Authorization');
        Router.push('/index');
    }

    return (
        <div className={classes.root}>
            <Drawer 
            className={classes.drawer}
            variant="permanent"
            classes={{
            paper: classes.drawerPaper,
            }}
            anchor="left">
              <div className={classes.avatar}>
                  <Avatar>
                      <AccountCircleIcon />
                  </Avatar>
                  <Typography>{user.email}</Typography>
              </div>
              <Divider />
              <List>
                <ListItem button onClick={logout}>
                    <ListItemIcon><ExitToAppIcon/></ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
              </List>
            </Drawer>
            <div className="dashboard-data">
              <MultifactorAuth data={userData}></MultifactorAuth>
              <ControlPanel data={userData}></ControlPanel>
            </div>   
        </div>
    )
}