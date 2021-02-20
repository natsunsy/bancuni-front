import { all, fork } from 'redux-saga/effects';
import * as authSagas from './auth';
import * as accountSagas from './account';
import * as userSagas from './user';
import * as transactionSagas from './transaction';
import * as transferSagas from './transfer' ;
import * as confirmTransferSagas from './confirmTransfer';

function* rootSaga() {
  yield all([
    fork(authSagas.loginSaga),
    fork(authSagas.registerSaga),
    fork(authSagas.logoutSaga),
    fork(accountSagas.accountSaga),
    fork(userSagas.userSaga),
    fork(transactionSagas.transactionSaga),
    fork(transferSagas.transferValidationSaga),
    fork(confirmTransferSagas.confirmTransferValidationSaga)
  ]);
}

export default rootSaga;
