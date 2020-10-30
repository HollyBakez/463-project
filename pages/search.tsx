import React from "react";
import Layout from "../src/Layout";
import styles from "../styles/search.module.scss";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

/*
This screen will allow the user to search for a guest using
any of the following fields: Guest First Name, Guest Last Name, 
Room Number, Phone Number, Street Address, Check In Date, Checkout Date
*/
export default function Search() {
  return (
    <Layout>
      <div className={styles.header}>
        <h1>Search for Guest</h1>
      </div>
      <div className={styles.center}>
        <form noValidate autoComplete="off">
          <TextField fullWidth id="standard-basic" label="First Name" />

          <TextField fullWidth id="standard-basic" label="Last Name" />

          <TextField fullWidth id="standard-basic" label="Room Number" />

          <TextField fullWidth id="standard-basic" label="Phone Number" />

          <TextField fullWidth id="standard-basic" label="Street Number" />

          <TextField fullWidth id="standard-basic" label="Check In Date" />

          <TextField fullWidth id="standard-basic" label="Check Out Date" />
        </form>

      </div>
        <div className={styles.center}>
            <Button variant="contained" color="primary">Search</Button>
        </div>
    </Layout>
  );
}
