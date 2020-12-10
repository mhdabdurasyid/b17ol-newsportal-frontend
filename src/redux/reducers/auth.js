const initialState = {
  isLogin: false,
  isError: false,
  token: '',
  alertMsg: '',

  registerIsLoading: false,
  registerIsError: false,
  registerAlert: '',
  isRegister: false,

  isEmailError: false,
  emailValidData: {},
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
    case 'FORGOT_PASSWORD_PENDING': {
      return {
        ...state,
        isLoading: true,
        alertMsg: 'Checking your email. Please wait..',
      };
    }
    case 'FORGOT_PASSWORD_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isEmailError: true,
        alertMsg: action.payload.response.data.message,
      };
    }
    case 'FORGOT_PASSWORD_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isEmailError: false,
        emailValidData: action.payload.data.result,
        alertMsg: action.payload.data.message,
      };
    }
    case 'RESET': {
      return {
        ...state,
        isRegister: false,
        isError: false,
        registerIsError: false,
        isEmailError: false,
        emailValidData: {},
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
