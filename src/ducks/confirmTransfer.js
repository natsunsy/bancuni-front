import { GO_TO_REGISTER } from "./auth";

export const CONFIRM_TRANSFER_REQUEST = 'bancuni/transfer/CONFIRM_TRANSFER_REQUEST';
export const CONFIRM_TRANSFER_SUCCESS = 'bancuni/transfer/CONFIRM_TRANSFER_SUCCESS';
export const CONFIRM_TRANSFER_ERROR = 'bancuni/transfer/CONFIRM_TRANSFER_ERROR';
export const GO_TO_BACK_TRANSFER = 'bancuni/transfer/GO_TO_BACK_TRANSFER';

const initialState = {
  loading: false,
  data: null,
  error: '',
  validate: false,
};

export default function reducer(state = initialState, action) {
  //console.log(action.payload.data);
  switch (action.type) {
    case CONFIRM_TRANSFER_REQUEST:
      return {
        ...state,
        data: null,
      };
    case CONFIRM_TRANSFER_SUCCESS:
      console.log("Transfer success",action.payload.data)
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        validate: true,
      };
    case CONFIRM_TRANSFER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
        data: null,
        validate: false,
      };
    case GO_TO_BACK_TRANSFER:
      return {
        ...state,
        loading: false,
        validate: false,
      };
    default:
      return state;
  }
}

export const verifyConfirmTransferRequest = (params,token) => ({
  type: CONFIRM_TRANSFER_REQUEST,
  payload: { params , token },
});

export const verifyConfirmTransferSuccess = (data) => ({
  type: CONFIRM_TRANSFER_SUCCESS,
  payload: { data },
});

export const verifyConfirmTransferError = (message) => ({
  type: CONFIRM_TRANSFER_ERROR,
  payload: { message },
});

export const backTransfer = (message) => ({
  type: GO_TO_BACK_TRANSFER,
  payload: { message },
});

