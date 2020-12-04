import React from "react";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import styles from "../../styles/components/RoomReservationCard.module.scss";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";

const RoomReservationCard = ({
  roomNum,
  dateMade,
  dateCheckIn,
  dateCheckOut,
  roomType,
  rate,
  totalCharge,
  website,
  children,
  handleDelete,
  reservationId,
  status,
}) => {
  const router = useRouter();

  const handleReservationClick = (event) => {
    router.push({
      pathname: "/stayinfo/[reservationId]",
      query: {
        reservationId,
      },
    });
  };

  return (
    <Card
      className={styles.root}
      onClick={handleReservationClick}
      style={{ backgroundColor: status === 3 ? "yellow" : null }}
    >
      <CardContent>
        <div className={styles.topSection}>
          {status === 3 && (
            <div className={styles.maintenanceIcon}>Under Maintenance!</div>
          )}
          <Typography variant="h5" component="h3">
            {roomNum}
          </Typography>
          <div className={styles.dateFields}>
            <div className={styles.dateField}>
              <Typography>Date Made</Typography>
              <Typography color="textSecondary">{dateMade}</Typography>
            </div>
            <div className={styles.dateField}>
              <Typography>Date Check-In</Typography>
              <Typography color="textSecondary">{dateCheckIn}</Typography>
            </div>
            <div className={styles.dateField}>
              <Typography>Date Check-Out</Typography>
              <Typography color="textSecondary">{dateCheckOut}</Typography>
            </div>
          </div>
        </div>
        <div className={styles.bottomHalf}>
          <div>
            <Typography variant="h4" component="h2">
              {children}
            </Typography>
            <div className={styles.webReservationField}>
              <Typography>Web Reservation:</Typography>
              <Typography
                color="textSecondary"
                className={styles.webReservationURLField}
              >
                {website}
              </Typography>
            </div>
          </div>
          <div>
            <div className={styles.textField}>
              <Typography>Room Type:</Typography>
              <Typography
                color="textSecondary"
                className={styles.textFieldValue}
              >
                {roomType}
              </Typography>
            </div>
            <div className={styles.textField}>
              <Typography>Rate:</Typography>
              <Typography
                color="textSecondary"
                className={styles.textFieldValue}
              >
                {rate}
              </Typography>
            </div>
            <div className={styles.textField}>
              <Typography>Total Charge:</Typography>
              <Typography
                color="textSecondary"
                className={styles.textFieldValue}
              >
                {totalCharge}
              </Typography>
            </div>
          </div>
        </div>
        <div className={styles.Button}>
          <Button variant="contained" color="secondary" onClick={handleDelete}>
            Delete Reservation
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomReservationCard;
