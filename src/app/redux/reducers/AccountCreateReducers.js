import {
   
    ACCOUNT_CREATE_SUCCESS,
    ACCOUNT_CREATE_ERROR,
  
  } from "../actions/accountCreateActions";
  
  const initialState = {
    success: false,
    loading: false,
  error: false,
  errorMessage: ''
  };
  
  const AccountCreateReducers = function(state = initialState, action) {
    switch (action.type) {
     
      case ACCOUNT_CREATE_SUCCESS: {
        return {
          ...state,
          success: true,
          loading: false
        };
      }
     
      case ACCOUNT_CREATE_ERROR: {
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
  
  export default AccountCreateReducers;
  