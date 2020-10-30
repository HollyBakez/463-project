import React from 'react';
import Layout from '../src/Layout';
import styles from "../styles/profile.module.scss";



export default function Profile() {
    return(
        <Layout>
        <h1> Profile Page </h1>
        <body className={styles.center}>
            <h3>First Name</h3>
            <h3>Last Name</h3>
            <h3>Address</h3>
            <h3>E-Mail</h3>
            <h3>Phone</h3>
            <h3>ID Info</h3>
            <h3>Vehicle License Plate</h3>
        </body>
        </Layout>
    );

}