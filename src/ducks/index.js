import { combineReducers } from 'redux';

// my ducks
import authReducer from './auth';
import accountReducer from './account';
import transactionReducer from './transaction';
import userReducer from './user';
import alertSnackbarReducer from './alertSnackbar';
import transferReducer from './transfer';
import confirmTransferReducer from './confirmTransfer';

const rootReducer = combineReducers({
  auth: authReducer,
  account: accountReducer,
  transaction: transactionReducer,
  user: userReducer,
  alertSnackbar: alertSnackbarReducer,
  transfer: transferReducer,
  confirm: confirmTransferReducer,
});

export default rootReducer;

export * from './auth';
export * from './account';
export * from './transaction';
export * from './user';
export * from './alertSnackbar';
export * from './transfer';
export * from './confirmTransfer';