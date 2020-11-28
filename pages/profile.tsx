import React, { useState } from "react";
import Layout from "../src/Layout";
import styles from "../styles/profile.module.scss";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import { useRouter } from "next/router";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export default function Profile() {
  const [fName, setFName] = useState(null);
  const [lName, setLName] = useState(null);
  const [address, setAddress] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNum, setPhoneNum] = useState(null);
  const [idInfo, setIdInfo] = useState(null);
  const [vehicleID, setVehicleID] = useState(null);

  //placeholder info to fill in with info from the db, where Lb means label
  var profilePicSrc = "/assets/avatar.png";
  var firstNameLb = "Leo";
  var lastNameLb = "Di-Capio";
  var addressLb = "12345 Jay Gatsby's House Way";
  var emailLb = "realjaygatsby@hotmail.com";
  var phoneLb = "626-123-4456";
  var idLb = "CA, L1234562";
  var licensePlateLb = "6TRJ244";

  const submitHandler = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const handleChange = (event) => {
    // if to find
    if (event.target.id === "firstname") {
      setFName(event.target.value);
    }
    if (event.target.id === "lastname") {
      setLName(event.target.value);
    }
    if (event.target.id === "address") {
      setAddress(event.target.value);
    }
    if (event.target.id === "phonenum") {
      setPhoneNum(event.target.value);
    }
    if (event.target.id === "email") {
      setEmail(event.target.value);
    }
    if (event.target.id === "idinfo") {
      setIdInfo(event.target.value);
    }
    if (event.target.id === "vehicleid") {
      setVehicleID(event.target.value);
    }
  };
  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      paper: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
    })
  );
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Edit Profile</h2>
      <p id="simple-modal-description">
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
            id="address"
            label="Address"
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
            id="email"
            label="Email"
          />

          <TextField
            fullWidth
            onChange={handleChange}
            id="idinfo"
            label="ID Info"
          />
          <TextField
            fullWidth
            onChange={handleChange}
            id="vehicleid"
            label="Vehicle License Plate"
          />

          <Button variant="contained" color="primary" type="submit">
            Submit Changes
          </Button>
        </form>
      </p>
    </div>
  );

  return (
    <Layout>
      <div className={styles.header}>
        <h1> Profile Page</h1>
      </div>

      <div className={styles.center}>
        <div className={styles.avatar}>
          <img src={profilePicSrc} alt="Leo" />
        </div>
        <div className={styles.centertext}>
          <h3>
            First Name: <div className={styles.fields}>{firstNameLb}</div>
          </h3>
          <h3>
            Last Name: <div className={styles.fields}>{lastNameLb}</div>
          </h3>
          <h3>
            Address: <div className={styles.fields}>{addressLb}</div>
          </h3>
          <h3>
            E-Mail: <div className={styles.fields}>{emailLb}</div>
          </h3>
          <h3>
            Phone: <div className={styles.fields}>{phoneLb}</div>
          </h3>
          <h3>
            ID Info: <div className={styles.fields}>{idLb}</div>
          </h3>
          <h3>
            Vehicle License Plate:{" "}
            <div className={styles.fields}>{licensePlateLb}</div>
          </h3>

          <Button variant="contained" color="primary" onClick={handleOpen}>
            Edit Profile
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {body}
          </Modal>
        </div>
      </div>
    </Layout>
  );
}

/*

<form>
  <label for="fname">First Name: </label>
  <input type="text" id="fname" name="fname"></input>
  <br></br>
  <label for="lname">Last Name: </label>
  <input type="text" id="lname" name="lname"></input>
  <br></br>
  <label for="address">Address: </label>
  <input type="text" id="address" name="address"></input>
  <br></br>
  <label for="email">E-Mail: </label>
  <input type="text" id="email" name="email"></input>
  <br></br>
  <label for="phone">Phone: </label>
  <input type="text" id="phone" name="phone"></input>
  <br></br>
  <label for="idinfo">ID Info: </label>
  <input type="text" id="idinfo" name="idinfo"></input>
  <br></br>
  <label for="licenseplate">Vehicle License Plate: </label>
  <input type="text" id="licenseplate" name="licenseplate"></input>
  <br></br>
</form>;


*/
