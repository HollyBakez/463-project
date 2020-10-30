import React from 'react';
import Layout from '../src/Layout';
import styles from "../styles/profile.module.scss";


export default function Profile() {
    return(
        <Layout>
        
                <div className={styles.header}>
                    <h1> Profile Page</h1>
                </div>
                
                <div className={styles.center}>
                    <div className={styles.avatar}>
                        <img src="/assets/avatar.png" alt="Leo"/>
                    </div>
                    <div className={styles.centertext}>
                        <h3>First Name: <div className={styles.fields}>Leonardo</div></h3> 
                        <h3>Last Name: <div className={styles.fields}>Di Cap-io</div></h3>
                        <h3>Address: <div className={styles.fields}>235 Middle Neck Rd.</div></h3>
                        <h3>E-Mail: <div className={styles.fields}>realjaygatsby@hotmail.com</div></h3>
                        <h3>Phone: <div className={styles.fields}>(626)-123-4444</div></h3>
                        <h3>ID Info: <div className={styles.fields}>CA, L1234562</div></h3>
                        <h3>Vehicle License Plate: <div className={styles.fields}>7TYP290</div></h3>
                    </div>
                </div>
     
        </Layout>
    );

}