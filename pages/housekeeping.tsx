import React from 'react';
import Layout from '../src/Layout';
import styles from "../styles/housekeeping.module.scss";

export default function RoomStayList() {
    return (
        <Layout>
        <h1 className={styles.header}> House Keeping Manager </h1>
        <div className={styles.mainTableWrapper}>
            <table className={styles.mainTable}>
                <tr>
                    <th> <h1> Room # </h1> </th>
                    <th> <h1> House Keeper </h1> </th>
                    <th> <h1> Type </h1></th>
                    <th> <h1> Status </h1></th>
                    <th> <h1> Bathroom </h1></th>
                    <th> <h1> Towels </h1></th>
                    <th> <h1> Bed Sheets</h1></th>
                    <th> <h1> Vacuum</h1></th>
                    <th> <h1> Dusting</h1></th>
                    <th> <h1> Electronics</h1></th>
                </tr>
                <tr className={styles.tableContent}>
                    <td> <span> 101 </span> </td>
                    <td> <span> Bob Sanchez </span> </td>
                    <td> <span> K </span> </td>
                    <td> <span> Clean </span></td>
                    <td> <span> Done </span></td>
                    <td> <span> Done </span></td>
                    <td> <span> Done </span> </td>
                    <td> <span> Done </span></td>
                    <td> <span> Done </span> </td>
                    <td> <span> Clean</span> </td>
                </tr>
                <tr className={styles.tableContent}>
                    <td> <span> 102 </span> </td>
                    <td> <span> Don Cappucino </span> </td>
                    <td> <span> DQ </span> </td>
                    <td> <span> Dirty </span></td>
                    <td> <span> Not Done </span></td>
                    <td> <span> Not Done </span></td>
                    <td> <span> Not Done </span> </td>
                    <td> <span> Not Done </span></td>
                    <td> <span> Not Done </span> </td>
                    <td> <span> Dirty </span> </td>
                </tr>
                <tr className={styles.tableContent}>
                    <td> <span> 103 </span> </td>
                    <td> <span> B chung </span> </td>
                    <td> <span> DQK </span> </td>
                    <td> <span> Dirty </span></td>
                    <td> <span> Not Done </span></td>
                    <td> <span> Not Done </span></td>
                    <td> <span> Not Done </span> </td>
                    <td> <span> Not Done </span></td>
                    <td> <span> Not Done </span> </td>
                    <td> <span> Dirty </span> </td>
                </tr>
                <tr className={styles.tableContent}>
                    <td> <span> 104 </span> </td>
                    <td> <span> Al Capone </span> </td>
                    <td> <span> S </span> </td>
                    <td> <span> Clean </span></td>
                    <td> <span> Done </span></td>
                    <td> <span> Done </span></td>
                    <td> <span> Done </span> </td>
                    <td> <span> Done </span></td>
                    <td> <span> Done </span> </td>
                    <td> <span> Clean</span> </td>
                </tr>
            </table>
        </div>
        </Layout>
    );
}
