import React from 'react';
import Grid from '@material-ui/core/Grid';
import Layout from '../src/Layout';
import RoomReservationCard from '../src/components/RoomReservationCard';
import styles from '../styles/reservations.module.scss';

const reservations = () => {

    return (
        <Layout>
            <main className={styles.root}>
                <Grid container direction="column" justify="center" alignItems="center">
                    <Grid item key={0}>
                        <RoomReservationCard roomNum="101" dateMade="1/10/20" dateCheckIn="1/12/20" dateCheckOut="1/23/20" roomType="Q" rate="100" totalCharge="1230" website="trivago.com">Holland Ho</RoomReservationCard>
                        <RoomReservationCard roomNum="103" dateMade="2/10/20" dateCheckIn="2/20/20" dateCheckOut="2/21/20" roomType="K" rate="200" totalCharge="3212" website="hotels.com">Tommy Lee</RoomReservationCard>
                    </Grid>
                </Grid>
            </main>
        </Layout>
    )
}

export default reservations;