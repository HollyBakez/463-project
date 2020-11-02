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
import Grid from '@material-ui/core/Grid';

import styles from "../styles/roomStayList.module.scss";
import DayColumn from "../src/components/DayColumn";
export default function RoomStayList() {

  const rooms = [
    {date:"October 30", roomOccupyList:[{roomNum:101, guestName:"Bob Sanchez"},{roomNum:102, guestName:"Clarisee Patiss"}]},
    {date:"October 31", roomOccupyList:[{roomNum:101, guestName:"Paul Snowfalke"},{roomNum:102, guestName:"John Govena"}]},
    {date:"October 32", roomOccupyList:[{roomNum:101, guestName:"Chrono Statsis"},{roomNum:102, guestName:"Prep Lasagner"}]},
    {date:"October 33", roomOccupyList:[{roomNum:101, guestName:"Tron Tronner"},{roomNum:102, guestName:"Fizz Gazoochi"}]},
    {date:"October 34", roomOccupyList:[{roomNum:101, guestName:""},{roomNum:102, guestName:"Shawn Leboo"}]},
    {date:"October 35", roomOccupyList:[{roomNum:101, guestName:"Blotis Mitus"},{roomNum:102, guestName:"Welter Belcher"}]},
    {date:"October 36", roomOccupyList:[{roomNum:101, guestName:"Galactic Gooer"},{roomNum:102, guestName:"Goofy Goober"}]},
  ]

    return (
        <Layout>
        <h1 className={styles.header}> Room Stay List </h1>
        <Grid container justify="center" spacing={4}>
            {
              rooms.map((value) => (
                <Grid item>
                  <DayColumn roomOccupyList={value.roomOccupyList}>
                    {value.date} 
                  </DayColumn>
                </Grid>
              ))
            }
        </Grid>

        </Layout>
    );
}
