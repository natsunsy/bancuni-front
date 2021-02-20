import { takeLatest, put, call } from 'redux-saga/effects';

import * as ducks from 'ducks';
import * as tools from 'tools';


function* confirmTransferValidation(action) {
    //let token =localStorage.getItem("auth")["access-token"];
    console.log(action);
    try {
      const { params,token } = action.payload;

      const {
        message: { result },
      } = yield call(tools.Get, `/transfers/execute/${params}`, {},{
        Authorization: `Bearer ${token}`,
      });
      yield put(ducks.verifyConfirmTransferSuccess(result));
      alert(result);
      //localStorage.setItem('auth', JSON.stringify(result));
    } catch (error) {
      const {
        message: { result },
      } = error.response.data;
      yield put(ducks.verifyConfirmTransferError(result));
      alert(result);
    }
}

export function* confirmTransferValidationSaga() {
  yield takeLatest(ducks.CONFIRM_TRANSFER_REQUEST, confirmTransferValidation);
}
