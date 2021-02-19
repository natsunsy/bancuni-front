import React, { useState, useEffect } from 'react';
import { renderRoutes } from 'react-router-config';
import { makeStyles, 
    Typography, 
    Paper, 
    Container, 
    Grid, 
    TextField, 
    Button, 
    Box } from '@material-ui/core';
import {useHistory} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { verifyTransferRequest } from 'ducks';

import ConfirmTransfer from "../ConfirmTransferView";


import { accountRequest } from 'ducks';

//import Alert from '@material-ui/lab/Alert';
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(6),
    '& > *': {
        margin: theme.spacing(2),
    },
  },
  gridItem: {
    marginTop: theme.spacing(2),
  },
  container:{
      padding: theme.spacing(2),
  }
}));

const TransferView = ({ route }) => {
    const auth = useSelector((state)=>state.auth);
    const transferData = useSelector((state)=>state.transfer);
    const userData = useSelector((state)=>state.account);

    const  isValidaded = transferData.validate;
    const classes = useStyles();
    let history = useHistory();
    const dispatch = useDispatch();
    const [transfer,setTransfer ]= useState({
        available:"1222",
        sender : "",//"602f6fbc8a482e7872165ce7",
        receiver : "",
        amount : "",
        message : ""
    });
    useEffect(()=>{
        
        if(userData.data!=null){
            console.log('userData',userData);
            setTransfer({
                ...transfer,
                available:userData.data.amount,
                sender : userData.data.owner,
            })
        }
    },[userData])

    useEffect(() => {
        if (auth.data != null) {
          dispatch(accountRequest(auth.data['access-token']));
        }
      }, [auth, dispatch]);

   

    const token1 = localStorage.getItem("auth");
    console.log(token1["access-token"]);
    const handleChange = (e)=>{
        if(e.target.name==='amount'){
            setTransfer({...transfer, amount:e.target.value});
        }else if(e.target.name==='receiver'){
            setTransfer({...transfer, receiver:e.target.value});
        }else if(e.target.name==='message'){
            setTransfer({...transfer, message:e.target.value});
        }else{
            alert("Error");
        }
        console.log(transfer);
    }
    // sender: 602f6fbc8a482e7872165ce7
    // receiver: 602f78b68a482e7872165ce9
    
    const handleContinue = (e)=>{
        dispatch(verifyTransferRequest(transfer,auth.data["access-token"]))
        //history.push('/dashboard/confirm')
    }
    const handleBack = (e)=>{
        alert("go Back")
    } 

  return (
    <Container className={classes.root}>
        {transferData.validate?(<div>
            <ConfirmTransfer></ConfirmTransfer>
        </div>):(
          <div>
              <Paper>
            <Typography variant='h3' >Transfer Details</Typography>
        </Paper>
        <Paper className={classes.container} >
            <Grid container >
                <Grid item xs={6} className={classes.gridItem}> 
                    <Typography>Saldo Disponible</Typography>
                </Grid>
                <Grid item xs={6} className={classes.gridItem}>    
                    <Typography>${transfer.available}</Typography>
                </Grid>
                <Grid item xs={6} className={classes.gridItem}> 
                    <Typography>De</Typography>
                </Grid>
                <Grid item xs={6} className={classes.gridItem}>    
                    <Typography>{transfer.sender}</Typography>
                </Grid>
                <Grid item xs={6} className={classes.gridItem}>
                    <Typography>Para</Typography>
                </Grid>
                <Grid item xs={6} className={classes.gridItem}>
                    <TextField
                        //autoComplete="Nombre"
                        //autoFocus="true"
                        name="receiver"
                        variant="outlined"
                        required    
                        fullWidth
                        id="receiver"
                        label="ID usuario destino"
                        defaultValue={transfer.receiver}
                        autoFocus
                        onChange={handleChange}
                    />  
                </Grid>
                <Grid item xs={6} className={classes.gridItem}>
                    <Typography>Monto</Typography>
                </Grid>
                <Grid item xs={6} className={classes.gridItem}>
                    <TextField
                        //autoComplete="Nombre"
                        //autoFocus="true"
                        name="amount"
                        variant="outlined"
                        required    
                        fullWidth
                        id="amount"
                        label="Monto"
                        type="number"
                        InputProps={{ inputProps: { min: 5, max: 100000 } }}
                        defaultValue={transfer.amount}
                        autoFocus
                        onChange={handleChange}
                    />  
                </Grid>
                <Grid item xs={6} className={classes.gridItem}>
                    <Typography>Message</Typography>
                </Grid>
                <Grid item xs={6} className={classes.gridItem}>
                    <TextField
                        //autoComplete="Nombre"
                        //autoFocus="true"
                        name="message"
                        variant="outlined"
                        required    
                        fullWidth
                        id="message"
                        label="Mensaje"
                        defaultValue={transfer.message}
                        autoFocus
                        onChange={handleChange}
                    />  
                </Grid>
            </Grid>
        </Paper>
        <Paper>
        <Box display="flex" p={1} bgcolor="background.paper">
            <Box p={1} flexGrow={1} >
                <Button variant="contained" color="primary" onClick={handleBack}>
                    Cancel
                </Button>
            </Box>
            <Box p={1}>
                <Button variant="contained" color="primary" onClick={handleContinue}>
                    Continue
                </Button>
            </Box>
        </Box>
        </Paper>
          </div>
        )}
        
    </Container>
  );
};


export default TransferView;
