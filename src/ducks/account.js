export const ACCOUNT_REQUEST = 'balcuni/auth/ACCOUNT_REQUEST';
export const ACCOUNT_SUCCESS = 'balcuni/auth/ACCOUNT_SUCCESS';
export const ACCOUNT_ERROR = 'balcuni/auth/ACCOUNT_ERROR';

const initialState = {
  loading: false,
  data: null,
  error: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ACCOUNT_REQUEST:
      return {
        ...state,
        data: null,
      };
    case ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
      };
    case ACCOUNT_ERROR:
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

export const accountRequest = (token) => ({
  type: ACCOUNT_REQUEST,
  payload: { token }
});

export const accountSuccess = (data) => ({
  type: ACCOUNT_SUCCESS,
  payload: { data },
});

export const accountError = (message) => ({
  type: ACCOUNT_ERROR,
  payload: { message },
});
