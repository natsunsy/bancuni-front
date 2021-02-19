import React, { useState, useEffect } from 'react';
import AttachMoneyRoundedIcon from '@material-ui/icons/AttachMoneyRounded';
import { makeStyles, Paper, Typography } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';

import { accountRequest } from '../../../ducks/account';
import { userRequest } from '../../../ducks/user';

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
    width: '350px',
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

const CurrentAccount = ({ route }) => {
  const classes = useStyles();

  const [dataUser, setDataUser] = useState(null);
  const [account, setAccount] = useState(null);

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const accountInfo = useSelector((state) => state.account);
  const accountAllInfo = useSelector((state) => state.user);

  //console.log("Token desde vista",auth.data["access-token"]);

  useEffect(() => {
    if (auth.data != null) {
      dispatch(accountRequest(auth.data['access-token']));
    }
  }, [auth, dispatch]);

  useEffect(() => {
    setAccount(accountInfo.data);
  }, [accountInfo]);

  useEffect(() => {
    if (account != null) {
      dispatch(userRequest(account.owner, auth.data['access-token']));
    }
  }, [account, dispatch, auth]);

  useEffect(() => {
    setDataUser(accountAllInfo.data);
  }, [accountAllInfo]);

  return (
    dataUser &&
    account && (
      <React.Fragment>
        <main className={classes.root}>
          {console.log(dataUser)}
          <Typography variant={'h4'} classes={{ h4: classes.Tittle }}>
            Current Account
          </Typography>

          <Typography variant={'h5'}>
            <span>
              <AttachMoneyRoundedIcon style={{ fontSize: 20 }} />
              {account.amount}
            </span>
          </Typography>

          <Paper classes={{ elevation3: classes.Muipaper }} elevation={3}>
            <div className={classes.Data}>
              <Typography>UserID:</Typography>
              <Typography>{dataUser.id}</Typography>
            </div>
            <div className={classes.Data}>
              <Typography>Name:</Typography>
              <Typography>{dataUser.names}</Typography>
            </div>
            <div className={classes.Data}>
              <Typography>Last Name:</Typography>
              <Typography>{dataUser.lastName}</Typography>
            </div>
          </Paper>
        </main>
      </React.Fragment>
    )
  );
};

export default CurrentAccount;
