import {
    BANK_AUTH,
    BANK_AUTH_SUCCESS,
    BANK_AUTH_ERROR,
  
  } from "../actions/bankAuthActions";
  
  const initialState = {
    success: false,
    loading: false,
  error: false,
  errorMessage: ''
  };
  
  const BankAuthReducers = function(state = initialState, action) {
    switch (action.type) {
     
      case BANK_AUTH_SUCCESS: {
        return {
          ...state,
          success: true,
          loading: false
        };
      }
     
      case BANK_AUTH_ERROR: {
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
  
  export default BankAuthReducers;
  