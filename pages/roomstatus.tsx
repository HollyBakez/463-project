import React from 'react';
import Layout from '../src/Layout';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import RoomBlock from "../src/components/RoomBlock";
import styles from "../styles/roomStatus.module.scss"

const roomStatus = () => {

    const rooms = [{id: 101, type: "DQ", status: 0}, {id: 102, type: "K", status: 1}, {id: 103, type: "DQK", status: 2}, {id: 104, type: "S", status: 3}, {id: 105, type: "S", status: 3}, {id: 106, type: "S", status: 3}, {id: 107, type: "S", status: 3}, {id: 108, type: "S", status: 3}]

    return (
        <Layout>
            <main>
                <div className={styles.btnGroup}>
                    <span>Choose Floor:</span>
                    <ButtonGroup variant="contained" color="primary" aria-label="contained primary floor number button group">
                        <Button>One</Button>
                        <Button>Two</Button>
                        <Button>Three</Button>
                    </ButtonGroup>
                </div>

                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={1}>
                            {rooms.map((value, idx) => (idx % 2 === 0 ?
                                <Grid key={idx} item>
                                    <RoomBlock status={value.status} roomNum={value.id}>
                                        {value.type}
                                    </RoomBlock>
                                </Grid> : null
                            ))}
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={1}>
                            {rooms.map((value, idx) => (idx % 2 === 1 ?
                                <Grid key={idx} item>
                                    <RoomBlock status={value.status} roomNum={value.id}>
                                        {value.type}
                                    </RoomBlock>
                                </Grid> : null
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </main>
        </Layout>
    )
}

export default roomStatus;