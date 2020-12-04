import React, { useState } from "react";
import Layout from "../../src/Layout";
import styles from "../../styles/profile.module.scss";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import { useRouter } from "next/router";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { gql, useMutation, useQuery } from "@apollo/client";
import apolloClient from "../../src/apolloClient";

const UPDATE_PROFILE = gql`
  mutation MyMutation(
    $guestId: uuid!
    $firstName: String!
    $lastName: String!
    $streetAddress: String
    $phoneNum: String
    $Email: String
    $licenseId: String
    $vehicleLicensePlate: String
    $zipCode: String
    $city: String
  ) {
    update_guests_by_pk(
      pk_columns: { guestId: $guestId }
      _set: {
        firstName: $firstName
        lastName: $lastName
        streetAddress: $streetAddress
        phoneNum: $phoneNum
        Email: $Email
        licenseId: $licenseId
        vehicleLicensePlate: $vehicleLicensePlate
        zipCode: $zipCode
        state: ""
        profileImage: ""
        city: $city
      }
    ) {
      guestId
    }
  }
`;

const GET_PROFILE = gql`
  query MyQuery($guestId: uuid!) {
    guests_by_pk(guestId: $guestId) {
      Email
      city
      guestId
      firstName
      lastName
      licenseId
      phoneNum
      profileImage
      state
      streetAddress
      vehicleLicensePlate
      zipCode
    }
  }
`;

function Profile() {
  const [fName, setFName] = useState(null);
  const [lName, setLName] = useState(null);
  const [address, setAddress] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNum, setPhoneNum] = useState(null);
  const [idInfo, setIdInfo] = useState(null);
  const [vehicleID, setVehicleID] = useState(null);
  const [zipCode, setZipcode] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const submitHandler = (event) => {
    event.stopPropagation();
    event.preventDefault();
    updateGuest();
    handleClose();
  };

  const initForm = (data: any) => {
    setFName(data.guests_by_pk.firstName || "");
    setLName(data.guests_by_pk.lastName || "");
    setAddress(data.guests_by_pk.streetAddress || "");
    setEmail(data.guests_by_pk.Email || "");
    setPhoneNum(data.guests_by_pk.phoneNum || "");
    setIdInfo(data.guests_by_pk.licenseId || "");
    setVehicleID(data.guests_by_pk.vehicleLicensePlate || "");
    setZipcode(data.guests_by_pk.zipCode || "");
    setCity(data.guests_by_pk.city || "");
    setState(data.guests_by_pk.state || "");
    setProfileImage(data.guests_by_pk.profileImage || "");
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
    if (event.target.id === "zipcode") {
      setZipcode(event.target.value);
    }
    if (event.target.id === "profileimage") {
      setProfileImage(event.target.value);
    }
    if (event.target.id === "city") {
      setCity(event.target.value);
    }
    if (event.target.id === "state") {
      setState(event.target.value);
    }
  };

  const router = useRouter();

  const { guestId } = router.query;

  const { loading, error, data, fetchMore } = useQuery(GET_PROFILE, {
    variables: { guestId },
    onCompleted: (data: any) => {
      initForm(data);
    },
  });

  const [updateGuest] = useMutation(UPDATE_PROFILE, {
    variables: {
      guestId,
      firstName: fName,
      lastName: lName,
      streetAddress: address,
      phoneNum,
      Email: email,
      licenseId: idInfo,
      vehicleLicensePlate: vehicleID,
      zipCode,
      city,
    },
    refetchQueries: [{ query: GET_PROFILE, variables: { guestId } }],
  });

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
      <div id="simple-modal-description">
        {data && (
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
              value={fName}
            />
            <TextField
              fullWidth
              onChange={handleChange}
              id="lastname"
              label="Last Name"
              value={lName}
            />
            <TextField
              fullWidth
              onChange={handleChange}
              id="address"
              label="Street Address"
              value={address}
            />
            <TextField
              fullWidth
              onChange={handleChange}
              id="city"
              label="City"
              value={city}
            />
            <TextField
              fullWidth
              onChange={handleChange}
              id="state"
              label="State"
              value={state}
            />
            <TextField
              fullWidth
              onChange={handleChange}
              id="zipcode"
              label="Zip Code"
              value={zipCode}
            />
            <TextField
              fullWidth
              onChange={handleChange}
              id="phonenum"
              label="Phone Number"
              value={phoneNum}
            />

            <TextField
              fullWidth
              onChange={handleChange}
              id="email"
              label="Email"
              value={email}
            />

            <TextField
              fullWidth
              onChange={handleChange}
              id="idinfo"
              label="ID Info"
              value={vehicleID}
            />
            <TextField
              fullWidth
              onChange={handleChange}
              id="vehicleid"
              label="Vehicle License Plate"
              value={idInfo}
            />
            <TextField
              fullWidth
              onChange={handleChange}
              id="profileimage"
              label="Profile Image URL"
              value={profileImage}
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!fName || !lName}
            >
              Submit Changes
            </Button>
          </form>
        )}
      </div>
    </div>
  );

  return (
    <Layout>
      <div className={styles.header}>
        <h1> Profile Page</h1>
      </div>
      {data && (
        <div className={styles.center}>
          <div className={styles.avatar}>
            <img
              src={
                data.guests_by_pk.profileImage
                  ? data.guests_by_pk.profileImage
                  : "/assets/default-user.png"
              }
              alt="Profile Picture"
            />
          </div>
          <div className={styles.centertext}>
            <h3>
              First Name:{" "}
              <div className={styles.fields}>{data.guests_by_pk.firstName}</div>
            </h3>
            <h3>
              Last Name:{" "}
              <div className={styles.fields}>{data.guests_by_pk.lastName}</div>
            </h3>
            <h3>
              Address:{" "}
              <div
                className={styles.fields}
              >{`${data.guests_by_pk.streetAddress} ${data.guests_by_pk.state}, ${data.guests_by_pk.zipCode}`}</div>
            </h3>
            <h3>
              E-Mail:{" "}
              <div className={styles.fields}>{data.guests_by_pk.Email}</div>
            </h3>
            <h3>
              Phone:{" "}
              <div className={styles.fields}>{data.guests_by_pk.phoneNum}</div>
            </h3>
            <h3>
              ID Info:{" "}
              <div className={styles.fields}>{data.guests_by_pk.licenseId}</div>
            </h3>
            <h3>
              Vehicle License Plate:{" "}
              <div className={styles.fields}>
                {data.guests_by_pk.vehicleLicensePlate}
              </div>
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
      )}
    </Layout>
  );
}

export default apolloClient({ ssr: true })(Profile);

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
