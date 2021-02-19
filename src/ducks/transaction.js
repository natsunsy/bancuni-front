export const TRANSACTION_REQUEST = 'balcuni/transaction/TRANSACTION_REQUEST';
export const TRANSACTION_SUCCESS = 'balcuni/transaction/TRANSACTION_SUCCESS';
export const TRANSACTION_ERROR = 'balcuni/transaction/TRANSACTION_ERROR';

const initialState = {
  loading: false,
  data: null,
  error: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TRANSACTION_REQUEST:
      return {
        ...state,
        data: null,
      };
    case TRANSACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
      };
    case TRANSACTION_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
        data: null,
      };
    default:
      return state;
  }
}

export const transactionRequest = (token) => ({
  type: TRANSACTION_REQUEST,
  payload: { token }
});

export const transactionSuccess = (data) => ({
  type: TRANSACTION_SUCCESS,
  payload: { data },
});

export const transactionError = (message) => ({
  type: TRANSACTION_ERROR,
  payload: { message },
});
