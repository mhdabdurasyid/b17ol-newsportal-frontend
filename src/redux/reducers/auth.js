const initialState = {
  isLogin: false,
  isError: false,
  token: '',
  alertMsg: '',

  registerIsLoading: false,
  registerIsError: false,
  registerAlert: '',
  isRegister: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_PENDING': {
      return {
        ...state,
        registerIsLoading: false,
        registerIsError: false,
        registerAlert: '',
        isRegister: false,
        isLoading: true,
        alertMsg: 'Loggin in. Please wait..',
      };
    }
    case 'LOGIN_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: action.payload.response.data.message,
      };
    }
    case 'LOGIN_FULFILLED': {
      return {
        ...state,
        token: action.payload.data.token,
        isLoading: false,
        isError: false,
        isLogin: true,
        alertMsg: 'Successfully login',
      };
    }
    case 'REGISTER_PENDING': {
      return {
        ...state,
        isLogin: false,
        isError: false,
        token: '',
        alertMsg: '',
        registerIsLoading: true,
        registerAlert: 'Register on process. Please wait..',
      };
    }
    case 'REGISTER_REJECTED': {
      return {
        ...state,
        registerIsLoading: false,
        registerIsError: true,
        registerAlert: action.payload.response.data.message,
      };
    }
    case 'REGISTER_FULFILLED': {
      return {
        ...state,
        registerIsLoading: false,
        registerIsError: false,
        isRegister: true,
        registerAlert: 'Successfully register',
      };
    }
    case 'RESET': {
      return {
        ...state,
        isRegister: false,
        isError: false,
        registerIsError: false,
      };
    }
    case 'LOGOUT': {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
