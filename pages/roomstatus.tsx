import React from "react";
import Layout from "../src/Layout";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import RoomBlock from "../src/components/RoomBlock";
import styles from "../styles/roomStatus.module.scss";
import { gql, useQuery, useMutation } from "@apollo/client";
import apolloClient from "../src/apolloClient";
import Modal from "@material-ui/core/Modal";
import { useRouter } from "next/router";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const currDate = new Date().toISOString();

const GET_ROOMS = gql`
  query roomStatusQuery($currDate: date!) {
    rooms(order_by: { roomNum: asc }) {
      reservations(
        where: {
          _and: {
            dateCheckIn: { _lte: $currDate }
            dateCheckOut: { _gte: $currDate }
          }
        }
      ) {
        reservationId
        guest {
          firstName
          lastName
        }
      }
      roomNum
      status
      type
    }
  }
`;
const CHANGE_ROOM_STATUS = gql`
  mutation MyMutation($roomNum: String!, $status: numeric!) {
    update_rooms_by_pk(
      pk_columns: { roomNum: $roomNum }
      _set: { status: $status }
    ) {
      status
    }
  }
`;

const roomStatus = () => {
  const router = useRouter();

  const { data } = useQuery(GET_ROOMS, {
    notifyOnNetworkStatusChange: true,
    variables: { currDate: currDate },
  });
  function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      paper: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
    })
  );
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [roomStat, setRoomStat] = React.useState(null);
  const [currentRoomNum, setCurrentRoomNum] = React.useState(null);

  const [changeRoomStatus] = useMutation(CHANGE_ROOM_STATUS, {
    refetchQueries: [{ query: GET_ROOMS, variables: { currDate } }],
  });

  function handleOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
    changeRoomStatus({ variables: { roomNum: currentRoomNum, status: 0 } });
  }

  function clickHandler(event, roomNum, roomStat, reservations) {
    // Room available
    // redirect to add reservation
    if (roomStat === 0) {
      router.push("/stayinfo/newCheckIn");
    }
    // Room occupied
    // redirect to current reservation id for room
    else if (roomStat === 1) {
      if (reservations.length > 0) {
        const reservationId = reservations[0].reservationId;
        router.push(`/stayinfo/${reservationId}`);
      }
      // Use roomNum to access
    }
    // Room Dirty
    // warn that room is dirty, set room to available if press yes, then redirect to add reservation
    else if (roomStat === 2) {
      setRoomStat(2);
      setCurrentRoomNum(roomNum);
      handleOpen();
    }
    // Room Maintenance
    // warn that room in maintenance, set room to available if press yes, then redirect to add reservation
    else if (roomStat === 3) {
      setRoomStat(3);
      setCurrentRoomNum(roomNum);
      handleOpen();
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
          <div style={modalStyle} className={classes.paper}>
            <div className={styles.modalContainer}>
              <h1>
                {" "}
                Warning: The room is{" "}
                {roomStat === 2 ? "dirty" : "in maintenance"}. Do you want to
                turn the status to available?{" "}
              </h1>
              <div>
                <Button onClick={handleClose} color="secondary">
                  {" "}
                  yes{" "}
                </Button>
                <Button onClick={handleClose}> No </Button>
              </div>
            </div>
          </div>
        </Modal>

        <div className={styles.btnGroup}></div>
        {data && (
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={1}>
                {data.rooms.map((value, idx) =>
                  idx % 2 === 0 ? (
                    <div className={styles.roomButton} key={idx}>
                      <button
                        onClick={(event) =>
                          clickHandler(
                            event,
                            value.roomNum,
                            value.status,
                            value.reservations
                          )
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
                    <div className={styles.roomButton} key={idx}>
                      <button
                        onClick={(event) =>
                          clickHandler(
                            event,
                            value.roomNum,
                            value.status,
                            value.reservations
                          )
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
