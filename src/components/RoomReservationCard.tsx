import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import styles from '../../styles/components/RoomReservationCard.module.scss';

const RoomReservationCard = ({roomNum, dateMade, dateCheckIn, dateCheckOut, roomType, rate, totalCharge, website, children}) => {

    return (
        <Card className={styles.root}>
            <CardContent>
                <div className={styles.topSection}>
                    <Typography variant="h5" component="h3">
                        {roomNum}
                    </Typography>
                    <div className={styles.dateFields}>
                        <div className={styles.dateField}>
                            <Typography>
                                Date Made
                            </Typography>
                            <Typography color="textSecondary">
                                {dateMade}
                            </Typography>
                        </div>
                        <div className={styles.dateField}>
                            <Typography>
                                Date Check-In
                            </Typography>
                            <Typography color="textSecondary">
                                {dateCheckIn}
                            </Typography>
                        </div>
                        <div className={styles.dateField}>
                            <Typography>
                                Date Check-Out
                            </Typography>
                            <Typography color="textSecondary">
                                {dateCheckOut}
                            </Typography>
                        </div>
                    </div>
                </div>
                <div className={styles.bottomHalf}>
                    <div>
                        <Typography variant="h4" component="h2">
                            {children}
                        </Typography>
                        <div className={styles.webReservationField}>
                            <Typography>
                                Web Reservation:
                            </Typography>
                            <Typography color="textSecondary" className={styles.webReservationURLField}>
                                {website}
                            </Typography>
                        </div>
                    </div>
                    <div>
                        <div className={styles.textField}>
                            <Typography>
                                Room Type:
                            </Typography>
                            <Typography color="textSecondary" className={styles.textFieldValue}>
                                {roomType}
                            </Typography>
                        </div>
                        <div className={styles.textField}>
                            <Typography>
                                Rate:
                            </Typography>
                            <Typography color="textSecondary" className={styles.textFieldValue}>
                                {rate}
                            </Typography>
                        </div>
                        <div className={styles.textField}>
                            <Typography>
                                Total Charge:
                            </Typography>
                            <Typography color="textSecondary" className={styles.textFieldValue}>
                                {totalCharge}
                            </Typography>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}


export default RoomReservationCard;