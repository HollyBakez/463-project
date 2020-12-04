import React from "react";
import Typography from "@material-ui/core/Typography";
import Layout from "../src/Layout";
import Copyright from "../src/Copyright";
import styles from "../styles/index.module.scss";
import { withStyles } from "@material-ui/core/styles";

export default function Index() {
  const CustomTypography = withStyles({
    root: {
      color: "#2C365E",
    },
  })(Typography);

  const CustomTypography2 = withStyles({
    root: {
      color: "#449DD1",
    },
  })(Typography);
  return (
    <Layout>
      <div className={styles.flexContainer}>
        <div className={styles.column}>
          <CustomTypography2 variant="h3" gutterBottom>
            Hotel System
          </CustomTypography2>
          <i>
            <CustomTypography variant="h5" gutterBottom>
              Simple...Elegant...Bold...Hat 🧢
            </CustomTypography>
          </i>
        </div>
        <div className={styles.column}>
          <img src="/assets/hero-banner.png" />
        </div>
      </div>

      <Copyright />
    </Layout>
  );
}
