import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Layout from '../src/Layout';
import Link from '../src/Link';
import Copyright from '../src/Copyright';

export default function Index() {
  return (
    <Layout>
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Hotel System
          </Typography>
          <Link href="/roomStatus" color="secondary">
            Go to the room status page
          </Link>
          <br />
          <Link href="/roomStayList" color="secondary">
            Go to the room stay list page
          </Link>
          <br />
          <Link href="/reservations" color="secondary">
            Go to the reservations page
          </Link>
          <br />
          <Link href="/housekeeping" color="secondary">
            Go to the house keeping page
          </Link>
          <br />
          <Link href="/profile" color="secondary">
            Go to the profile page
          </Link>
          <br />
          <Link href="/stayinfo" color="secondary">
            Go to the stay info page
          </Link>
          <br />
          <Link href="/search" color="secondary">
            Go to the search page
          </Link>
          <br />
          <Link href="/dailyreport" color="secondary">
            Go to the daily report page
          </Link>
          <Copyright />
        </Box>
      </Container>
    </Layout>
  );
}