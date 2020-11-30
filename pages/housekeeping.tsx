import React, { useState } from "react";
import Layout from "../src/Layout";
import styles from "../styles/housekeeping.module.scss";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
// Gets the housekeeping status (towels, bathroom, etc..) of a GIVEN room

export default function RoomStayList() {
  // Rooms are queried by
  const roomsHouseKeeping = [
    {
      roomNum: 101,
      houseKeeper: "Bubbaloo",
      type: "DQ",
      status: "available",
      houseKeepingStatuses: {
        bathroom: true,
        towels: false,
        bedSheets: false,
        vacuum: false,
        dusting: false,
        electronics: false,
      },
    },
    {
      roomNum: 102,
      houseKeeper: "Chief Loober",
      type: "K",
      status: "unavailable",
      houseKeepingStatuses: {
        bathroom: true,
        towels: false,
        bedSheets: false,
        vacuum: false,
        dusting: false,
        electronics: false,
      },
    },
    {
      roomNum: 103,
      houseKeeper: "Gooby Gober",
      type: "K",
      status: "occupied",
      houseKeepingStatuses: {
        bathroom: true,
        towels: false,
        bedSheets: false,
        vacuum: false,
        dusting: false,
        electronics: false,
      },
    },
  ];

  // [TODO]: Needs connection to sqldatabase to update checkboxes statuses directly
  const handleChange = (event, formElement, roomNum) => {
    if (formElement === "checkbox") {
      // The roomNum, the housekeeping status we want to update, the value we want to set it too
      console.log("will send request for id");
      console.log("room Number Id: ", roomNum);
      console.log("house Keeping Status: ", event.target.name);
      console.log("Checkbox Value Status: ", event.target.checked);

      // TODO: Use the 3 parameters above to update the SQL database
    } else if (formElement === "dropDown") {
      // The roomNum, the room status value we want to change it to
      console.log("room Number Id: ", roomNum);
      console.log("Dropdown selected option: ", event.target.value);
    }
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
          {roomsHouseKeeping.map((value) => (
            <tr className={styles.tableContent}>
              <td>
                <span> {value.roomNum}</span>
              </td>
              <td>
                <span> {value.houseKeeper}</span>
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
                      handleChange(event, "dropDown", value.roomNum)
                    }
                    displayEmpty
                  >
                    <MenuItem value="available"> Available </MenuItem>
                    <MenuItem value="unavailable"> Unavailable </MenuItem>
                    <MenuItem value="occupied"> Occupied </MenuItem>
                    <MenuItem value="dirty"> Dirty </MenuItem>
                  </Select>
                </FormControl>
              </td>
              <td>
                <FormControl component="fieldset">
                  <FormGroup>
                    <Checkbox
                      onChange={(event) =>
                        handleChange(event, "checkbox", value.roomNum)
                      }
                      name="bathroom"
                    />
                  </FormGroup>
                </FormControl>
              </td>
              <td>
                <FormControl component="fieldset">
                  <FormGroup>
                    <Checkbox
                      onChange={(event) =>
                        handleChange(event, "checkbox", value.roomNum)
                      }
                      name="towels"
                    />
                  </FormGroup>
                </FormControl>
              </td>
              <td>
                <FormControl component="fieldset">
                  <FormGroup>
                    <Checkbox
                      onChange={(event) =>
                        handleChange(event, "checkbox", value.roomNum)
                      }
                      name="bedSheets"
                    />
                  </FormGroup>
                </FormControl>
              </td>
              <td>
                <FormControl component="fieldset">
                  <FormGroup>
                    <Checkbox
                      onChange={(event) =>
                        handleChange(event, "checkbox", value.roomNum)
                      }
                      name="vacuum"
                    />
                  </FormGroup>
                </FormControl>
              </td>
              <td>
                <FormControl component="fieldset">
                  <FormGroup>
                    <Checkbox
                      onChange={(event) =>
                        handleChange(event, "checkbox", value.roomNum)
                      }
                      name="dusting"
                    />
                  </FormGroup>
                </FormControl>
              </td>
              <td>
                <FormControl component="fieldset">
                  <FormGroup>
                    <Checkbox
                      onChange={(event) =>
                        handleChange(event, "checkbox", value.roomNum)
                      }
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
