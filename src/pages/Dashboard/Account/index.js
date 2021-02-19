import React from 'react';

import { makeStyles } from '@material-ui/core';

import CurrentAccount from './CurrentAccount';
import TransactionsTable from './TransactionsTable';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      margin: theme.spacing(2),
    },
  },
}));

const DashboardHome = ({ route }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <main className={classes.root}> 
      
        <CurrentAccount />
        <TransactionsTable />

      </main>
     </React.Fragment>
  );
};

export default DashboardHome;