/* eslint-disable prettier/prettier */
const initialState = {
  allNewsData: [],
  allNewsIsLoading: false,
  allNewsIsError: false,
  allNewsAlertMsg: '',

  newsDetailData: {},
  newsDetailIsLoading: false,
  newsDetailIsError: false,
  newsDetailAlertMsg: '',

  userNewsData: [],
  userNewsIsLoading: false,
  userNewsIsError: false,
  userNewsAlertMsg: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_NEWS_PENDING': {
      return {
        ...state,
        allNewsIsLoading: true,
      };
    }
    case 'GET_ALL_NEWS_REJECTED': {
      return {
        ...state,
        allNewsIsLoading: false,
        allNewsIsError: true,
        allNewsAlertMsg: action.payload.response.data.message,
      };
    }
    case 'GET_ALL_NEWS_FULFILLED': {
      return {
        ...state,
        allNewsIsLoading: false,
        allNewsIsError: false,
        allNewsData: action.payload.data.result,
      };
    }
    case 'GET_NEWS_DETAIL_PENDING': {
      return {
        ...state,
        newsDetailIsLoading: true,
      };
    }
    case 'GET_NEWS_DETAIL_REJECTED': {
      return {
        ...state,
        newsDetailIsLoading: false,
        newsDetailIsError: true,
        newsDetailAlertMsg: action.payload.response.data.message,
      };
    }
    case 'GET_NEWS_DETAIL_FULFILLED': {
      return {
        ...state,
        newsDetailIsLoading: false,
        newsDetailIsError: false,
        newsDetailData: action.payload.data.result,
      };
    }
    case 'RESET_NEWS_DETAIL': {
      return {
        ...state,
        newsDetailData: {},
        newsDetailIsLoading: false,
        newsDetailIsError: false,
        newsDetailAlertMsg: '',
      };
    }
    case 'DESTROY_NEWS': {
      return initialState;
    }
    case 'GET_USER_NEWS_PENDING': {
      return {
        ...state,
        userNewsIsLoading: true,
      };
    }
    case 'GET_USER_NEWS_REJECTED': {
      return {
        ...state,
        userNewsIsLoading: false,
        userNewsIsError: true,
        userNewsAlertMsg: action.payload.response.data.message,
      };
    }
    case 'GET_USER_NEWS_FULFILLED': {
      return {
        ...state,
        userNewsIsLoading: false,
        userNewsIsError: false,
        userNewsData: action.payload.data.result,
      };
    }
    default: {
      return state;
    }
  }
};
