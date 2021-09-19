import React, { useEffect, useState } from "react";
import {
  Card,
  Grid,
  Button,
  withStyles,
  CircularProgress
} from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";

import { resetPassword } from "../../redux/actions/LoginActions";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
function ForgotPassword(props) {

  const [email, setEmail] = useState('');
  useEffect(()=>{
    if(props.error){
      toast(props.errorMessage);
    }
  }, [ props.error])
  
  

const handleFormSubmit = () => {
  const emailObj = {
    "email": email
  }
  props.resetPassword(emailObj, props.history)
}
    return (
      <div className="signup flex flex-center w-100 h-100vh">
        <div className="p-12">
          <Card className="signup-card forgotpass-card position-relative y-center">
            <Grid container>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <div className="p-36 h-100 position-relative">
                <ToastContainer />
                  <ValidatorForm useRef="form" onSubmit={handleFormSubmit}>
                    <TextValidator
                      className="mb-24 w-100"
                      variant="outlined"
                      label="Email"
                      onChange={(e) => { setEmail(e.target.value)}}
                      type="email"
                      name="Email"
                      value={email}
                      validators={["required", "isEmail"]}
                      errorMessages={[
                        "Required",
                        "Email is not valid"
                      ]}
                    />
                    <div className="sign-inbtnrow signuprow">
                      <Button variant="contained" color="primary" type="submit">
                        Reset Password
                      </Button>
                      {/* <span className="ml-16 mr-8">or</span> */}
                      
                    </div>
                    <div className="signup-button">
                      <i>Remember your password?</i>
                      <Button
                          className="capitalize"
                          onClick={() =>
                            props.history.push("/session/signin")
                          }
                        >
                          Sign in
                        </Button>
                      </div>
                  </ValidatorForm>
                </div>
              </Grid>
              <Grid item lg={6} md={6} sm={12}>
              <div className="km-sideimg flex flex-center flex-middle h-100">
                <img src="/assets/images/log-lg.png" alt="" />
                <img src="/assets/images/logo-xl.png" alt="" className="bg-logo" />
              </div>
            </Grid>
            </Grid>
          </Card>
        </div>
      </div>
    );
  }


const mapStateToProps = state => ({
  resetPassword: PropTypes.func.isRequired,
  login: state.login,
  error: state.login.error,
  errorMessage: state.login.errorMessage
});
export default withRouter(
  connect(
    mapStateToProps,
    { resetPassword }
  )(ForgotPassword)
);
