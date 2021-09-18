import {
    RESET_PASS_ERROR,
    RESET_PASS_SUCCESS
} from './../actions/ResetPassAction';

const initialState = {
    success: false,
    loading: false,
  error: false,
  errorMessage: ''
  };
  const ResetPassReducer = function(state = initialState, action) {
    switch (action.type) {
    //   case LOGIN_LOADING: {
    //     return {
    //       ...state,
    //       loading: true
    //     };
    //   }
      case RESET_PASS_SUCCESS: {
        return {
          ...state,
          success: true,
          loading: false
        };
      }
    //   case RESET_PASSWORD: {
    //     return {
    //       ...state,
    //       success: true,
    //       loading: false
    //     };
    //   }
      case RESET_PASS_ERROR: {
        return {
          success: false,
          loading: false,
          error: true,
          errorMessage: action?.error?.response?.data?.error
        };
      }
      default: {
        return state;
      }
    }
  };
  
  export default ResetPassReducer;
    