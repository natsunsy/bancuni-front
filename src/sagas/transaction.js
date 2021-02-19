import { takeLatest, put, call } from 'redux-saga/effects';

import * as ducks from 'ducks';
import * as tools from 'tools';

function* transaction(action) {
  try {
    const token = action.payload.token;
    const {
      message: { result },
    } = yield call(tools.Get, '/transfers/history', {}, {
      Authorization: `Bearer ${token}`,
    });
    yield put(ducks.transactionSuccess(result));
  } catch (error) {
    const {
      message: { result },
    } = error.response.data;
    yield put(ducks.transactionError(result));
  }
}

export function* transactionSaga() {
  yield takeLatest(ducks.TRANSACTION_REQUEST, transaction);
}
