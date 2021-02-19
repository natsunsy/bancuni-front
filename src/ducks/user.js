export const USER_REQUEST = 'balcuni/auth/USER_REQUEST';
export const USER_SUCCESS = 'balcuni/auth/USER_SUCCESS';
export const USER_ERROR = 'balcuni/auth/USER_ERROR';

const initialState = {
  loading: false,
  data: null,
  error: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case USER_REQUEST:
      return {
        ...state,
        data: null,
      };
    case USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
      };
    case USER_ERROR:
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

export const userRequest = (params, token) => ({
  type: USER_REQUEST,
  payload: { params , token },
});

export const userSuccess = (data) => ({
  type: USER_SUCCESS,
  payload: { data },
});

export const userError = (message) => ({
  type: USER_ERROR,
  payload: { message },
});
