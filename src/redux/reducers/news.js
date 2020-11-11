/* eslint-disable prettier/prettier */
const initialState = {
  allNewsData: [],
  allNewsPageInfo: {},
  allNewsIsLoading: false,
  allNewsIsError: false,
  allNewsAlertMsg: '',

  newsDetailData: {},
  newsDetailIsLoading: false,
  newsDetailIsError: false,
  newsDetailAlertMsg: '',

  userNewsData: [],
  userNewsPageInfo: {},
  userNewsIsLoading: false,
  userNewsIsError: false,
  userNewsAlertMsg: '',

  deleteIsLoading: false,
  deleteIsError: false,
  deleteAlert: '',
  isDelete: false,
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
        allNewsPageInfo: action.payload.data.pageInfo,
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
        userNewsPageInfo: action.payload.data.pageInfo,
      };
    }
    case 'DELETE_PENDING': {
      return {
        ...state,
        deleteIsLoading: true,
        deleteAlert: 'Delete on progress. Please wait..',
      };
    }
    case 'DELETE_REJECTED': {
      return {
        ...state,
        deleteIsLoading: false,
        deleteIsError: true,
        deleteAlert: action.payload.response.data.message,
      };
    }
    case 'DELETE_FULFILLED': {
      return {
        ...state,
        deleteIsLoading: false,
        deleteIsError: false,
        isdelete: true,
        deleteAlert: 'Successfully delete article',
      };
    }
    case 'RESET_DELETE': {
      return {
        ...state,
        isdelete: false,
      };
    }
    default: {
      return state;
    }
  }
};
