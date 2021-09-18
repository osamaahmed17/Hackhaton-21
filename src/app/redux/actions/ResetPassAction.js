import history from "history.js";
import {
  toast
} from 'react-toastify';
import axios from 'axios';
export const RESET_PASS_ERROR = "RESET_PASS_ERROR";
export const RESET_PASSWORD = "RESET_PASSWORD";
export const SET_RESET_PASS = "SET_RESET_PASS";
export const RESET_PASS_SUCCESS = "RESET_PASS_SUCCESS";
export const RESET_PASS_LOADING = "RESET_PASS_LOADING";

export const resetPassword = (body, history) => {
    return (dispatch) => {
        dispatch({ type: RESET_PASSWORD });
        axios
          .post(`rest/api/v1/reset/`, body, {
        
          })
          .then((res) => {
            dispatch({
              type: RESET_PASS_SUCCESS,
              data: res.data.data
            });
            toast.success("Password has been updated");
            setTimeout(()=>{
              history.push('/session/signin');
            }, 2000)
          })
          .catch((err) => {
            dispatch({ type: RESET_PASS_ERROR });
          });
      };
  }