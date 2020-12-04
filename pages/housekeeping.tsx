import React, { useState } from "react";
import Layout from "../src/Layout";
import styles from "../styles/housekeeping.module.scss";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { gql, useMutation, useQuery } from "@apollo/client";
import apolloClient from "../src/apolloClient";

// Gets the housekeeping status (towels, bathroom, etc..) of a GIVEN room

function HouseKeeping() {
  const GET_ROOMS = gql`
    query MyQuery {
      rooms(order_by: { roomNum: asc }) {
        bathroom
        bedsheets
        dusting
        electronics
        towels
        vacuum
        status
        roomNum
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

  const UPDATE_BATHROOM_STATUS = gql`
    mutation MyMutation($roomNum: String!, $bathroom: Boolean!) {
      update_rooms_by_pk(
        pk_columns: { roomNum: $roomNum }
        _set: { bathroom: $bathroom }
      ) {
        status
      }
    }
  `;

  const UPDATE_TOWELS_STATUS = gql`
    mutation MyMutation($roomNum: String!, $towels: Boolean!) {
      update_rooms_by_pk(
        pk_columns: { roomNum: $roomNum }
        _set: { towels: $towels }
      ) {
        status
      }
    }
  `;

  const UPDATE_BEDSHEETS_STATUS = gql`
    mutation MyMutation($roomNum: String!, $bedsheets: Boolean!) {
      update_rooms_by_pk(
        pk_columns: { roomNum: $roomNum }
        _set: { bedsheets: $bedsheets }
      ) {
        status
      }
    }
  `;

  const UPDATE_VACUUM_STATUS = gql`
    mutation MyMutation($roomNum: String!, $vacuum: Boolean!) {
      update_rooms_by_pk(
        pk_columns: { roomNum: $roomNum }
        _set: { vacuum: $vacuum }
      ) {
        status
      }
    }
  `;

  const UPDATE_ELECTRONICS_STATUS = gql`
    mutation MyMutation($roomNum: String!, $electronics: Boolean!) {
      update_rooms_by_pk(
        pk_columns: { roomNum: $roomNum }
        _set: { electronics: $electronics }
      ) {
        status
      }
    }
  `;
  const UPDATE_DUSTING_STATUS = gql`
    mutation MyMutation($roomNum: String!, $dusting: Boolean!) {
      update_rooms_by_pk(
        pk_columns: { roomNum: $roomNum }
        _set: { dusting: $dusting }
      ) {
        status
      }
    }
  `;

  const [updateBathroomStatus] = useMutation(UPDATE_BATHROOM_STATUS, {
    refetchQueries: [{ query: GET_ROOMS }],
  });
  const [updateTowelStatus] = useMutation(UPDATE_TOWELS_STATUS, {
    refetchQueries: [{ query: GET_ROOMS }],
  });
  const [updateBedSheetsStatus] = useMutation(UPDATE_BEDSHEETS_STATUS, {
    refetchQueries: [{ query: GET_ROOMS }],
  });
  const [updateVacuumStatus] = useMutation(UPDATE_VACUUM_STATUS, {
    refetchQueries: [{ query: GET_ROOMS }],
  });
  const [updateDustingStatus] = useMutation(UPDATE_DUSTING_STATUS, {
    refetchQueries: [{ query: GET_ROOMS }],
  });
  const [updateElectronicsStatus] = useMutation(UPDATE_ELECTRONICS_STATUS, {
    refetchQueries: [{ query: GET_ROOMS }],
  });
  const [changeRoomStatus] = useMutation(CHANGE_ROOM_STATUS, {
    refetchQueries: [{ query: GET_ROOMS }],
  });

  const { data } = useQuery(GET_ROOMS, {
    notifyOnNetworkStatusChange: true,
  });
  // Rooms are queried by
  // const data = [
  //   {
  //     roomNum: 101,
  //     houseKeeper: "Bubbaloo",
  //     type: "DQ",
  //     status: "available",
  //     bathroom: true,
  //     towels: false,
  //     bedSheets: false,
  //     vacuum: false,
  //     dusting: false,
  //     electronics: false,

  //   },
  //   {
  //     roomNum: 102,
  //     houseKeeper: "Chief Loober",
  //     type: "K",
  //     status: "unavailable",
  //     houseKeepingStatuses: {
  //       bathroom: true,
  //       towels: false,
  //       bedSheets: false,
  //       vacuum: false,
  //       dusting: false,
  //       electronics: false,
  //     },
  //   },
  //   {
  //     roomNum: 103,
  //     houseKeeper: "Gooby Gober",
  //     type: "K",
  //     status: "occupied",
  //     houseKeepingStatuses: {
  //       bathroom: true,
  //       towels: false,
  //       bedSheets: false,
  //       vacuum: false,
  //       dusting: false,
  //       electronics: false,
  //     },
  //   },
  // ];
  // [TODO]: Needs connection to sqldatabase to update checkboxes statuses directly

  const handleStatusChange = (event, roomNum) => {
    changeRoomStatus({ variables: { roomNum, status: event.target.value } });
  };

  return (
    <Layout>
      <h1 className={styles.header}> House Keeping Manager </h1>
      <div className={styles.mainTableWrapper}>
        <table className={styles.mainTable}>
          <tr>
            <th>
              <h1> Room # </h1>
            </th>
            <th>
              <h1> House Keeper </h1>
            </th>
            <th>
              <h1> Type </h1>
            </th>
            <th>
              <h1> Status </h1>
            </th>
            <th>
              <h1> Bathroom </h1>
            </th>
            <th>
              <h1> Towels </h1>
            </th>
            <th>
              <h1> Bed Sheets</h1>
            </th>
            <th>
              <h1> Vacuum</h1>
            </th>
            <th>
              <h1> Dusting</h1>
            </th>
            <th>
              <h1> Electronics</h1>
            </th>
          </tr>
          {data &&
            data.rooms.map((value) => (
              <tr className={styles.tableContent}>
                <td>
                  <span> {value.roomNum}</span>
                </td>
                <td>
                  <span>Johnny Cage</span>
                </td>
                <td>
                  <span> {value.type}</span>
                </td>
                <td>
                  <FormControl>
                    <Select
                      id="dropDownMenu"
                      value={value.status}
                      onChange={(event) =>
                        handleStatusChange(event, value.roomNum)
                      }
                      displayEmpty
                    >
                      <MenuItem value="0"> Available </MenuItem>
                      <MenuItem value="1"> Occupied </MenuItem>
                      <MenuItem value="2"> Dirty </MenuItem>
                      <MenuItem value="3"> Maintenance </MenuItem>
                    </Select>
                  </FormControl>
                </td>
                <td>
                  <FormControl component="fieldset">
                    <FormGroup>
                      <Checkbox
                        checked={value.bathroom}
                        onChange={(event) => {
                          if (
                            event.target.checked &&
                            value.towels &&
                            value.bedsheets &&
                            value.vacuum &&
                            value.dusting &&
                            value.electronics
                          ) {
                            changeRoomStatus({
                              variables: { roomNum: value.roomNum, status: 0 },
                            });
                          }
                          updateBathroomStatus({
                            variables: {
                              roomNum: value.roomNum,
                              bathroom: event.target.checked,
                            },
                          });
                        }}
                        name="bathroom"
                      />
                    </FormGroup>
                  </FormControl>
                </td>
                <td>
                  <FormControl component="fieldset">
                    <FormGroup>
                      <Checkbox
                        checked={value.towels}
                        onChange={(event) => {
                          if (
                            value.bathroom &&
                            event.target.checked &&
                            value.bedsheets &&
                            value.vacuum &&
                            value.dusting &&
                            value.electronics
                          ) {
                            changeRoomStatus({
                              variables: { roomNum: value.roomNum, status: 0 },
                            });
                          }
                          updateTowelStatus({
                            variables: {
                              roomNum: value.roomNum,
                              towels: event.target.checked,
                            },
                          });
                        }}
                        name="towels"
                      />
                    </FormGroup>
                  </FormControl>
                </td>
                <td>
                  <FormControl component="fieldset">
                    <FormGroup>
                      <Checkbox
                        checked={value.bedsheets}
                        onChange={(event) => {
                          if (
                            value.bathroom &&
                            value.towels &&
                            event.target.checked &&
                            value.vacuum &&
                            value.dusting &&
                            value.electronics
                          ) {
                            changeRoomStatus({
                              variables: { roomNum: value.roomNum, status: 0 },
                            });
                          }
                          updateBedSheetsStatus({
                            variables: {
                              roomNum: value.roomNum,
                              bedsheets: event.target.checked,
                            },
                          });
                        }}
                        name="bedsheets"
                      />
                    </FormGroup>
                  </FormControl>
                </td>
                <td>
                  <FormControl component="fieldset">
                    <FormGroup>
                      <Checkbox
                        checked={value.vacuum}
                        onChange={(event) => {
                          if (
                            value.bathroom &&
                            value.towels &&
                            value.bedsheets &&
                            event.target.checked &&
                            value.dusting &&
                            value.electronics
                          ) {
                            changeRoomStatus({
                              variables: { roomNum: value.roomNum, status: 0 },
                            });
                          }
                          updateVacuumStatus({
                            variables: {
                              roomNum: value.roomNum,
                              vacuum: event.target.checked,
                            },
                          });
                        }}
                        name="vacuum"
                      />
                    </FormGroup>
                  </FormControl>
                </td>
                <td>
                  <FormControl component="fieldset">
                    <FormGroup>
                      <Checkbox
                        checked={value.dusting}
                        onChange={(event) => {
                          if (
                            value.bathroom &&
                            value.towels &&
                            value.bedsheets &&
                            value.vacuum &&
                            event.target.checked &&
                            value.electronics
                          ) {
                            changeRoomStatus({
                              variables: { roomNum: value.roomNum, status: 0 },
                            });
                          }
                          updateDustingStatus({
                            variables: {
                              roomNum: value.roomNum,
                              dusting: event.target.checked,
                            },
                          });
                        }}
                        name="dusting"
                      />
                    </FormGroup>
                  </FormControl>
                </td>
                <td>
                  <FormControl component="fieldset">
                    <FormGroup>
                      <Checkbox
                        checked={value.electronics}
                        onChange={(event) => {
                          if (
                            value.bathroom &&
                            value.towels &&
                            value.bedsheets &&
                            value.vacuum &&
                            value.dusting &&
                            event.target.checked
                          ) {
                            changeRoomStatus({
                              variables: { roomNum: value.roomNum, status: 0 },
                            });
                          }
                          updateElectronicsStatus({
                            variables: {
                              roomNum: value.roomNum,
                              electronics: event.target.checked,
                            },
                          });
                        }}
                        name="electronics"
                      />
                    </FormGroup>
                  </FormControl>
                </td>
              </tr>
            ))}
        </table>
      </div>
    </Layout>
  );
}

export default apolloClient({ ssr: true })(HouseKeeping);
