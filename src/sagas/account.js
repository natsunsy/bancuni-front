import { takeLatest, put, call } from 'redux-saga/effects';

import * as ducks from 'ducks';
import * as tools from 'tools';

function* account(action) {

  console.log(action);

  try {
    const token = action.payload.token;
    const {
      message: { result },
    } = yield call(tools.Get, '/account', {}, {
      Authorization: `Bearer ${token}`,
    });
    yield put(ducks.accountSuccess(result));
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
