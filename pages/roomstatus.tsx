import React from "react";
import Layout from "../src/Layout";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Grid from "@material-ui/core/Grid";
import RoomBlock from "../src/components/RoomBlock";
import styles from "../styles/roomStatus.module.scss";
import { gql, useQuery } from "@apollo/client";
import apolloClient from "../src/apolloClient";
import Modal from "@material-ui/core/Modal";

const GET_ROOMS = gql`
  query roomStatusQuery {
    rooms(order_by: {}) {
      roomNum
      status
      type
    }
  }
`;
const testRoomNumber = 101;
const testRoomStat = 3;

const roomStatus = () => {
  const { data } = useQuery(GET_ROOMS, {
    notifyOnNetworkStatusChange: true,
  });

  const [open, setOpen] = React.useState(false);
  const [roomStat, setRoomStat] = React.useState(null);

  function handleOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }

  function clickHandler(event, roomNum, roomStat) {
    console.log("touch me");
    console.log(roomNum, roomStat);
    // Room available
    if (roomStat === 0) {
    }
    // Room occupied
    else if (roomStat === 1) {
    }
    // Room Dirty
    else if (roomStat === 2) {
      handleOpen();
      setRoomStat(2);
    }
    // Room Maintenance
    else if (roomStat === 3) {
      handleOpen();
      setRoomStat(3);
    }
  }

  return (
    <Layout>
      <main>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className={styles.modalContainer}>
            <h1>
              {" "}
              Warning: The room is {roomStat === 2 ? "dirty" : "in maintenance"}
              . Do you want to turn the status to available?{" "}
            </h1>
            <div>
              <Button onClick={handleClose} color="secondary">
                {" "}
                yes{" "}
              </Button>
              <Button onClick={handleClose}> No </Button>
            </div>
          </div>
        </Modal>

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
                    <div className={styles.roomButton}>
                      <button
                        onClick={(event) =>
                          clickHandler(event, testRoomNumber, testRoomStat)
                        }
                      >
                        <Grid key={idx} item>
                          <RoomBlock
                            status={value.status}
                            roomNum={value.roomNum}
                          >
                            {value.type}
                          </RoomBlock>
                        </Grid>
                      </button>
                    </div>
                  ) : null
                )}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={1}>
                {data.rooms.map((value, idx) =>
                  idx % 2 === 1 ? (
                    <div className={styles.roomButton}>
                      <button
                        onClick={(event) =>
                          clickHandler(event, testRoomNumber, testRoomStat)
                        }
                      >
                        <Grid key={idx} item>
                          <RoomBlock
                            status={value.status}
                            roomNum={value.roomNum}
                          >
                            {value.type}
                          </RoomBlock>
                        </Grid>
                      </button>
                    </div>
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
