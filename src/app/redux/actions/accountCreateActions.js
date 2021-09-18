import history from "history.js";
import {
  toast
} from 'react-toastify';
import axios from 'axios';
export const ACCOUNT_CREATE_ERROR = "ACCOUNT_CREATE_ERROR";
export const ACCOUNT_CREATE = "ACCOUNT_CREATE";
export const SET_ACCOUNT_CREATE = "SET_ACCOUNT_CREATE";
export const ACCOUNT_CREATE_SUCCESS = "ACCOUNT_CREATE_SUCCESS";
export const ACCOUNT_CREATE_LOADING = "ACCOUNT_CREATE_LOADING";

export const accountOpen = (body, history) => {
    return (dispatch) => {
        dispatch({ type: ACCOUNT_CREATE });
        axios
          .post(`rest/api/v1/accountOpen`, body, {
            headers: {
                'userEmail': localStorage.getItem('email'),
                'Authorization': localStorage.getItem('authorization')
              },
     
          })
          .then((res) => {
            dispatch({
              type: ACCOUNT_CREATE_SUCCESS,
              data: res.data.data
            });
            toast.success("Your account has been opened!");
            setTimeout(()=>{
              history.push('/');
            }, 2500)
          })
          .catch((err) => {
            dispatch({ type: ACCOUNT_CREATE_ERROR });
          });
      };
  }