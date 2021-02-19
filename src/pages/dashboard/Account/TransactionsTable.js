import React, { useState, useEffect } from 'react';
import { renderRoutes } from 'react-router-config';
import AttachMoneyRoundedIcon from '@material-ui/icons/AttachMoneyRounded';
import { makeStyles, Paper, Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { useDispatch, useSelector } from 'react-redux';

import { transactionRequest } from '../../../ducks/transaction';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      margin: theme.spacing(2),
    },
  },
  Muipaper: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    height: 'auto',
    padding: '1rem',
  },
  Data: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Tittle: {
    width: '300px',
  },
  table: {
    minWidth: 650,
  },
  MuiTable: {
    width: '97%',
  },
}));

function formatDate(date) {
  const a = date.replace(/(\d+)-(\d+)-(\d+).+/g, '$3 / $2 / $1');
  //console.log(a);
  return a;
}

const TransactionTable = ({ route }) => {
  const classes = useStyles();

  const [data, setData] = useState(null);

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const transactionInfo = useSelector((state) => state.transaction);

  useEffect(() => {
    if (auth.data != null) {
      dispatch(transactionRequest(auth.data['access-token']));
    }
  }, [auth, dispatch]);

  useEffect(() => {
    if (transactionInfo != null) {
      setData(transactionInfo.data);
    }
  }, [transactionInfo]);

  return (
    data && (
      <React.Fragment>
        <main className={classes.root}>
          <Typography variant={'h4'} classes={{ h4: classes.Tittle }}>
            Transaction History
          </Typography>

          <TableContainer className={classes.MuiTable} component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Message</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      {new Date(row.startDate).toDateString()}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {row.message}
                    </TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>
                      <AttachMoneyRoundedIcon style={{ fontSize: 10 }} />
                      {row.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </main>
      </React.Fragment>
    )
  );
};

export default TransactionTable;
