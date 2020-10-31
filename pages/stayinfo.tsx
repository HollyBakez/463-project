import React from 'react';
import Layout from '../src/Layout';
import styles from "../styles/profile.module.scss";
import Card from '@material-ui/core/Card';

export default function StayInfo() {
    return(
        <Layout>
        
                <div className={styles.header}>
                    <h1>Stay Info</h1>
                </div >
                <div style={{display: "flex", justifyContent: "center"}}>
                <Card style={{width:700 }}>
                    <div className={styles.avatar}>
                        <img src="/assets/avatar.png" alt="Leo"/>
                    </div>
                    <div className={styles.centertext}>
                        <h1>Guest Name: <div className={styles.fields}>Leonardo Di Cap-io</div></h1> 
                        <h3>Check-In Date: <div className={styles.fields}>10/31/20</div></h3>
                        <h3>Check-In Time: <div className={styles.fields}>9:00 AM</div></h3>
                        <h3>Expected Check-Out Date: <div className={styles.fields}>11/05/20</div></h3>
                        <h3>Expected Check-Out Time: <div className={styles.fields}>11:00 AM</div></h3>
                        <h3>Room Type: <div className={styles.fields}>DQ</div></h3>
                        <h3>Room Number: <div className={styles.fields}>101</div></h3>
                        <h3>Room Rate ($/Day): <div className={styles.fields}>$50.00</div></h3>
                        <h3>Total Charge: <div className={styles.fields}>$250.00</div></h3>
                        <h3>Payments Made: <div className={styles.fields}>$100.00</div></h3>
                        <h3>Balance: <div className={styles.fields}>$150.00</div></h3>
                    </div>
                </Card>
        </div>
        </Layout>
    );

}