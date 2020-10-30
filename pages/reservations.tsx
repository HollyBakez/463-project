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
                        <RoomReservationCard roomNum="101" dateMade="1/10/20" dateCheckIn="1/12/20" dateCheckOut="1/23/20" roomType="Q" rate="100" totalCharge="1230" website="trivago.com">Hollland Ho</RoomReservationCard>
                    </Grid>
                </Grid>
            </main>
        </Layout>
    )
}

export default reservations;