/* eslint-disable prettier/prettier */
const initialState = {
  allNewsData: [],
  allNewsIsLoading: false,
  allNewsIsError: false,
  allNewsAlertMsg: '',
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
    case 'DESTROY_NEWS': {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
