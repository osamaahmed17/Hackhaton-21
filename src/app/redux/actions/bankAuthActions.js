import history from "history.js";
import {
  toast
} from 'react-toastify';
import axios from 'axios';
export const BANK_AUTH_ERROR = "BANK_AUTH_ERROR";
export const BANK_AUTH = "BANK_AUTH";
export const SET_BANK_AUTH = "SET_BANK_AUTH";
export const BANK_AUTH_SUCCESS = "BANK_AUTH_SUCCESS";
export const BANK_AUTH_LOADING = "BANK_AUTH_LOADING";

export const authenticateUser = (body, history) => {
  return (dispatch) => {
    dispatch({
      type: BANK_AUTH
    });
    axios
      .post(`rest/api/v1/authenticateUser`, body, {
        headers: {
          'userEmail': localStorage.getItem('email'),
          'Authorization': localStorage.getItem('authorization')
        },

      })
      .then((res) => {
        dispatch({
          type: BANK_AUTH_SUCCESS,
          data: res.data.data
        });
        toast.success("You have been authenticated!");
        setTimeout(() => {
          history.push('/');
        }, 2500)
      })
      .catch((err) => {
        dispatch({
          type: BANK_AUTH_ERROR
        });
      });
  };
}