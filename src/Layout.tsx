import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import styles from "../styles/components/Layout.module.scss";
import Link from "@material-ui/core/Link";

export default function Layout({ children }) {
  return (
    <div className={styles.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={styles.title}>
            <Link href="/" color="inherit">
              {"HotelX"}
            </Link>
          </Typography>
          <Button href="/roomstatus" color="inherit">
            Room Status ☑️
          </Button>
          <Button href="/roomStayList" color="inherit">
            Room Stay List 🗺️
          </Button>
          <Button href="/reservations" color="inherit">
            Reservations ⌚
          </Button>
          <Button href="/housekeeping" color="inherit">
            House Keeping 🧹
          </Button>
          <Button href="/search" color="inherit">
            Search 🔎
          </Button>
          <Button href="/dailyreport" color="inherit">
            Daily Report 📰
          </Button>
        </Toolbar>
      </AppBar>
      {children}
    </div>
  );
}
