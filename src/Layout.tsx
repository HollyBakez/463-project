import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import styles from "../styles/components/Layout.module.scss"

export default function Layout({ children }) {

  return (
    <div className={styles.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" className={styles.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={styles.title}>
            NO-CAP 🧢 HOTEL
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      { children }
    </div>
  );
}