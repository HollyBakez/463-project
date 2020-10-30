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
                    <th> <h1> House Keeper </h1> </th>
                    <th> <h1> Type </h1></th>
                    <th> <h1> Status </h1></th>
                    <th> <h1> Bathroom </h1></th>
                    <th> <h1> Bed Sheets</h1></th>
                    <th> <h1> Vacuum</h1></th>
                    <th> <h1> Dusting</h1></th>
                    <th> <h1> Towels </h1></th>
                    <th> <h1> Electronics</h1></th>
                </tr> 
                <tr>
                    <th> <span> 101 </span> </th>
                    <th> <span> B chung </span> </th>
                    <th> <span> QWERTY </span> </th>
                    <th> <span> Single </span></th>
                    <th> <span> Peepee poopoo </span></th>
                    <th> <span> White </span></th>
                    <th> <span> Dyson </span> </th>
                    <th> <span> Feather Duster </span></th>
                    <th> <span> Wet Towels </span> </th>
                    <th> <span> Best Buy</span> </th>
                </tr> 
                <tr>
                    <th> <span> 420 </span> </th>
                    <th> <span> Hollando </span> </th>
                    <th> <span> QWERTY </span> </th>
                    <th> <span> Single </span></th>
                    <th> <span> poopoo </span></th>
                    <th> <span> Gray </span></th>
                    <th> <span> Great Value </span> </th>
                    <th> <span> No </span></th>
                    <th> <span> Wet Towels </span> </th>
                    <th> <span> Frys</span> </th>
                </tr> 
                <tr>
                    <th> <span> 69 </span> </th>
                    <th> <span> B chung </span> </th>
                    <th> <span> QWERTY </span> </th>
                    <th> <span> Single </span></th>
                    <th> <span> Peepee poopoo </span></th>
                    <th> <span> White </span></th>
                    <th> <span> Dyson </span> </th>
                    <th> <span> Yes </span></th>
                    <th> <span> Dry Towels </span> </th>
                    <th> <span> Laptop</span> </th>
                </tr>
            </table>
        </div>
        </Layout>
    );
}