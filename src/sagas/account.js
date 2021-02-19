import { takeLatest, put, call } from 'redux-saga/effects';

import * as ducks from 'ducks';
import * as tools from 'tools';

function* account(action) {

  console.log(action);

  try {
    const {
      message: { result },
    } = yield call(tools.Get, '/account', {});
    yield put(ducks.accountSuccess(result));
    localStorage.setItem('account', JSON.stringify(result));
  } catch (error) {
    console.log(error);
    const {
      message: { result },
    } = error.response.data;
    yield put(ducks.accountError(result));
  }
}

export function* accountSaga() {
  yield takeLatest(ducks.ACCOUNT_REQUEST, account);
}
