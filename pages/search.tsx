import React, { useState } from "react";
import Layout from "../src/Layout";
import styles from "../styles/search.module.scss";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useRouter } from "next/router";
/*
This screen will allow the user to search for a guest using
any of the following fields: Guest First Name, Guest Last Name, 
Room Number, Phone Number, Street Address, Check In Date, Checkout Date
*/
export default function Search() {
  const [fName, setFName] = useState(null);
  const [lName, setLName] = useState(null);
  const [roomNum, setRoomNum] = useState(null);
  const [phoneNum, setPhoneNum] = useState(null);
  const [streetNum, setStreetNum] = useState(null);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  const router = useRouter();

  const submitHandler = (event) => {
    event.stopPropagation();
    event.preventDefault();
    router.push({
      pathname: "/searchresults",
      query: {
        fName,
        lName,
        roomNum,
        phoneNum,
        streetNum,
        checkIn,
        checkOut,
      },
    });
  };

  const handleChange = (event) => {
    // if to find
    if (event.target.id === "firstname") {
      setFName(event.target.value);
    } else if (event.target.id === "lastname") {
      setLName(event.target.value);
    } else if (event.target.id === "roomnum") {
      setRoomNum(event.target.value);
    } else if (event.target.id === "phonenum") {
      setPhoneNum(event.target.value);
    } else if (event.target.id === "streetnum") {
      setStreetNum(event.target.value);
    } else if (event.target.id === "checkindate") {
      setCheckIn(event.target.value);
    } else if (event.target.id === "checkoutdate") {
      setCheckOut(event.target.value);
    }
  };

  return (
    <Layout>
      <div className={styles.header}>
        <h1>Search for Guest</h1>
      </div>
      <div className={styles.center}>
        <form
          noValidate
          autoComplete="off"
          method="post"
          onSubmit={submitHandler}
        >
          <TextField
            fullWidth
            onChange={handleChange}
            id="firstname"
            label="First Name"
          />

          <TextField
            fullWidth
            onChange={handleChange}
            id="lastname"
            label="Last Name"
          />

          <TextField
            fullWidth
            onChange={handleChange}
            id="roomnum"
            label="Room Number"
          />

          <TextField
            fullWidth
            onChange={handleChange}
            id="phonenum"
            label="Phone Number"
          />

          <TextField
            fullWidth
            onChange={handleChange}
            id="streetnum"
            label="Street Number"
          />

          <TextField
            fullWidth
            onChange={handleChange}
            id="checkindate"
            label="Check In Date"
          />

          <TextField
            fullWidth
            onChange={handleChange}
            id="checkoutdate"
            label="Check Out Date"
          />

          <Button variant="contained" color="primary" type="submit">
            Search
          </Button>
        </form>
      </div>
    </Layout>
  );
}
