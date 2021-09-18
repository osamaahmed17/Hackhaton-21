import FirebaseAuthService from "../../services/firebase/firebaseAuthService";
import {
  setUserData
} from "./UserActions";
import history from "history.js";
import {
  toast
} from 'react-toastify';
import axios from 'axios';
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_LOADING = "LOGIN_LOADING";
export const RESET_PASSWORD = "RESET_PASSWORD";

export const loginWithEmailAndPassword = (email, password, history) => (dispatch) => {
  const body = {
    email: email,
    password: password
  }
  axios.post('rest/api/v1/userSignIn', body, {

    })
    .then(response => {
      const {
        data
      } = response['data'];
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('email', data.email);
      localStorage.setItem('confirmationCode', data.confirmationCode);
      localStorage.setItem('city', data.city);
      localStorage.setItem('postalCode', data.postalCode);
      localStorage.setItem('preferredLanguage', data.preferredLanguage);
      localStorage.setItem('resetPasswordExpires', data.resetPasswordExpires);
      localStorage.setItem('resetPasswordToken', data.resetPasswordToken);
      localStorage.setItem('isLogIn', true);
      localStorage.setItem('authorization', data.authorization);
      localStorage.setItem('status', data.status);
      dispatch(success({}));
      toast.success('LogIn Successful');
      setTimeout(() => {
        history.push('/');
      }, 2500)

    }).catch(err => {
      dispatch(failure(err));
      localStorage.clear();
    })
}

function success(user) {
  return {
    type: LOGIN_SUCCESS,
    user
  };
}

function failure(error) {
  return {
    type: LOGIN_ERROR,
    error
  };
}
export const resetPassword = (body, history) => (dispatch) => {
  axios.post('rest/api/v1/forgot', body, {

    })
    .then(response => {
      const {
        data
      } = response['data'];

      // dispatch(success({}));
      toast.success('A reset link has been sent to yor email address');
      setTimeout(() => {
        history.push('/session/signin');
      }, 2500)

    }).catch(err => {
      dispatch(failure(err));
      localStorage.clear();
    })
}

export function firebaseLoginEmailPassword({
  email,
  password
}) {
  return dispatch => {
    FirebaseAuthService.signInWithEmailAndPassword(email, password)
      .then(user => {
        if (user) {
          dispatch(
            setUserData({
              userId: "1",
              role: "ADMIN",
              displayName: "Watson Joyce",
              email: "watsonjoyce@gmail.com",
              photoURL: "/assets/images/face-7.jpg",
              age: 25,
              token: "faslkhfh423oiu4h4kj432rkj23h432u49ufjaklj423h4jkhkjh",
              ...user
            })
          );

          history.push({
            pathname: "/"
          });

          return dispatch({
            type: LOGIN_SUCCESS
          });
        } else {
          return dispatch({
            type: LOGIN_ERROR,
            payload: "Login Failed"
          });
        }
      })
      .catch(error => {
        return dispatch({
          type: LOGIN_ERROR,
          payload: error
        });
      });
  };
}