import React from "react";
import Layout from "../src/Layout";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Grid from "@material-ui/core/Grid";
import RoomBlock from "../src/components/RoomBlock";
import styles from "../styles/roomStatus.module.scss";
import { gql, useQuery } from "@apollo/client";
import apolloClient from "../src/apolloClient";

const GET_ROOMS = gql`
  query roomStatusQuery {
    rooms(order_by: {}) {
      roomNum
      status
      type
    }
  }
`;

const roomStatus = () => {
  const { data } = useQuery(GET_ROOMS, {
    notifyOnNetworkStatusChange: true,
  });

  return (
    <Layout>
      <main>
        <div className={styles.btnGroup}>
          <span>Choose Floor:</span>
          <ButtonGroup
            variant="contained"
            color="primary"
            aria-label="contained primary floor number button group"
          >
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        </div>
        {data && (
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={1}>
                {data.rooms.map((value, idx) =>
                  idx % 2 === 0 ? (
                    <Grid key={idx} item>
                      <RoomBlock status={value.status} roomNum={value.roomNum}>
                        {value.type}
                      </RoomBlock>
                    </Grid>
                  ) : null
                )}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={1}>
                {data.rooms.map((value, idx) =>
                  idx % 2 === 1 ? (
                    <Grid key={idx} item>
                      <RoomBlock status={value.status} roomNum={value.roomNum}>
                        {value.type}
                      </RoomBlock>
                    </Grid>
                  ) : null
                )}
              </Grid>
            </Grid>
          </Grid>
        )}
      </main>
    </Layout>
  );
};

export default apolloClient({ ssr: true })(roomStatus);
