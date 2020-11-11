/* eslint-disable prettier/prettier */
const initialState = {
  profileData: {},
  profileIsLoading: false,
  profileIsError: false,
  profileAlertMsg: '',

  editIsLoading: false,
  editIsError: false,
  editAlert: '',
  isEdit: false,
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
    case 'EDIT_PROFILE_PENDING': {
      return {
        ...state,
        editIsLoading: true,
        editAlert: 'Edit profile in progress. Please wait..',
      };
    }
    case 'EDIT_PROFILE_REJECTED': {
      return {
        ...state,
        editIsLoading: false,
        editIsError: true,
        editAlert: action.payload.response.data.message,
      };
    }
    case 'EDIT_PROFILE_FULFILLED': {
      return {
        ...state,
        editIsLoading: false,
        editIsError: false,
        isEdit: true,
        editAlert: 'Successfully edit profile',
      };
    }
    case 'RESET_EDIT': {
      return {
        ...state,
        isEdit: false,
      };
    }
    default: {
      return state;
    }
  }
};
