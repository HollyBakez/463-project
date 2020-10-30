import React from 'react';
import ProTip from '../src/ProTip';
import Link from '../src/Link';
import Copyright from '../src/Copyright';
// Layout 
import Layout from '../src/Layout';
// Material UI Shtuff
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import styles from "../styles/dailyreport.module.scss";

// This screen will show a report of the day’s activity.  It will show a list of rooms that were rented that day and also have the following information for each room: Room Number, Guest Name, Date In, Date Out (If Checked Out), Amount Paid for the room. At the bottom will be a total of dollars paid for rooms that day.



export default function DailyReport() {
    return (
        <Layout>
            <div className={styles.header}>
                <h1>Daily Report</h1>

            </div>

        <div className={styles.mainTableWrapper}> 
            <table className={styles.mainTable}>
                <tr>
                    <th> <h1> Room # </h1> </th>
                    <th> <h1> Guest Name </h1> </th>
                    <th> <h1> Date In </h1></th>
                    <th> <h1> Date Out </h1></th>
                    <th> <h1> Amount Paid </h1></th>
                </tr> 
                <tr>
                    <th> <span> 101 </span> </th>
                    <th> <span> cap no </span> </th>
                    <th> <span> 101010 </span> </th>
                    <th> <span> 101110 </span> </th>
                    <th> <span> 1 cap </span> </th>


                </tr> 
            </table>

        </div>
        <h2 className={styles.header}>Total Dollars: Temp</h2>
        


        </Layout>
    );
}