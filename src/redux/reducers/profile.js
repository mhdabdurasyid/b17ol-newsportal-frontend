/* eslint-disable prettier/prettier */
const initialState = {
  profileData: {},
  profileIsLoading: false,
  profileIsError: false,
  profileAlertMsg: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'DESTROY_PROFILE': {
      return initialState;
    }
    case 'GET_PROFILE_PENDING': {
      return {
        ...state,
        profileIsLoading: true,
      };
    }
    case 'GET_PROFILE_REJECTED': {
      return {
        ...state,
        profileIsLoading: false,
        profileIsError: true,
        profileAlertMsg: action.payload.response.data.message,
      };
    }
    case 'GET_PROFILE_FULFILLED': {
      return {
        ...state,
        profileIsLoading: false,
        profileIsError: false,
        profileData: action.payload.data.result,
      };
    }
    default: {
      return state;
    }
  }
};
