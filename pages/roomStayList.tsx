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
import styles from "../styles/roomStayList.module.scss";

export default function RoomStayList() {
    return (
        <Layout>
        <div className={styles.mainTableWrapper}> 
        <table className={styles.mainTable}>
            <tr>
                <th> <h1> Room # </h1> </th>
                <th> <h1> Monday </h1> </th>
                <th> <h1> Tuesday </h1></th>
                <th> <h1> Wednesday </h1></th>
                <th> <h1>Thursday </h1></th>
                <th> <h1>Friday</h1></th>
                <th> <h1>Saturday</h1></th>
                <th> <h1>Sunday</h1></th>
            </tr> 
            <tr>
                <th> 
                    <span> 101 </span>
                </th>
                <th> 
                    <span> Brian Chung</span>
                </th>
                <th> </th>
                <th> 
                    <span> Hollando Hoo</span>
                </th>
                <th> </th>
                <th></th>
                <th> 
                    <span>Jason Jose</span>
                </th>
                <th></th>
            </tr> 
            <tr>
                <th>
                    <span> 420 </span>
                </th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th> Ben Dover </th>
                <th> Mike Hunt</th>
            </tr> 
        </table>
        </div>
        </Layout>
    );
}