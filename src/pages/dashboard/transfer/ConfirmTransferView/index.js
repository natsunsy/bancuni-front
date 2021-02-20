import React , {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DoubleArrowOutlinedIcon from '@material-ui/icons/DoubleArrowOutlined';
import { makeStyles, withStyles} from '@material-ui/core/styles';
import {Typography } from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { verifyTransferRequest, verifyConfirmTransferRequest , userRequest} from 'ducks';


const useStyles = makeStyles((theme) => ({
    icon: {
      margin: theme.spacing(1, 'auto'),
    },
  }));

export default function FormDialog() {
  const transferData = useSelector((state)=>state.transfer);
  const user = useSelector((state)=>state.user);
  const [open, setOpen] = React.useState(true);
  const classes = useStyles();
  const auth = useSelector((state)=>state.auth);
  const dispatch = useDispatch();
  let history = useHistory();

 const handlePay = () => {
   dispatch(verifyConfirmTransferRequest(transferData.data.id,auth.data["access-token"]));
   history.push('/dashboard/account')
 }

 const handleBack = () => {
  setOpen(false);
  history.push('/dashboard/account')
 }

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (transferData.data != null) {
      dispatch(userRequest(transferData.data.receiver, auth.data['access-token']));
    }
  }, [transferData, dispatch, auth]);

  return (
    (transferData.data && user.data ) &&
    <div>
      <Dialog open={open} onClose={handleClose}  aria-labelledby="form-dialog-title" >
        <div className={classes.icon}>
          <AccountCircleOutlinedIcon style={{ fontSize: 100 }}/>
          <DoubleArrowOutlinedIcon style={{ fontSize: 70 }}/>
          <AccountCircleOutlinedIcon style={{ fontSize: 100 }}/>
        </div>
        <DialogTitle id="customized-dialog-title" style={{ textAlign: 'center' }}>
          Pay {user.data.names}
        </DialogTitle>
        <DialogContent dividers>
          <Typography> Pay {transferData.data.message} </Typography>
        </DialogContent>
        <DialogActions className={classes.button}>
          <Button onClick={handlePay} variant="outlined" color="primary">
            Proceed to pay
          </Button>
          <Button onClick={handleBack} variant="outlined" color="primary" >
            Back
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}