import React from "react";
import Layout from "../src/Layout";
import styles from "../styles/profile.module.scss";
import Card from "@material-ui/core/Card";

// Capability 6

export default function StayInfo() {
  const info = {
    guestName: "Leonardo",
    checkInDate: "10/31/20",
    checkInTime: "10:00 AM",
    expCheckOutDate: "11/05/20",
    expCheckOutTime: "11:00 AM",
    roomType: "DQ",
    roomNumber: "101",
    roomRate: "$50.00",
    totalCharge: "$250.00",
    paymentMade: "$100.00",
    balance: "$150.00",
  };

  return (
    <Layout>
      <div className={styles.header}>
        <h1>Stay Info</h1>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card style={{ width: 700 }}>
          <div className={styles.avatar}>
            <img src="/assets/avatar.png" alt="Leo" />
          </div>
          <div className={styles.centertext}>
            <h1>
              Guest Name: <div className={styles.fields}>{info.guestName}</div>
            </h1>
            <h3>
              Check-In Date:{" "}
              <div className={styles.fields}>{info.checkInDate}</div>
            </h3>
            <h3>
              Check-In Time:{" "}
              <div className={styles.fields}>{info.checkInTime}</div>
            </h3>
            <h3>
              Expected Check-Out Date:{" "}
              <div className={styles.fields}>{info.expCheckOutDate}</div>
            </h3>
            <h3>
              Expected Check-Out Time:{" "}
              <div className={styles.fields}>{info.expCheckOutTime}</div>
            </h3>
            <h3>
              Room Type: <div className={styles.fields}>{info.roomType}</div>
            </h3>
            <h3>
              Room Number:{" "}
              <div className={styles.fields}>{info.roomNumber}</div>
            </h3>
            <h3>
              Room Rate ($/Day):{" "}
              <div className={styles.fields}>{info.roomRate}</div>
            </h3>
            <h3>
              Total Charge:{" "}
              <div className={styles.fields}>{info.totalCharge}</div>
            </h3>
            <h3>
              Payments Made:{" "}
              <div className={styles.fields}>{info.paymentMade}</div>
            </h3>
            <h3>
              Balance: <div className={styles.fields}>{info.balance}</div>
            </h3>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
