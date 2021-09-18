import React, { useState } from "react";
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

import { ToastContainer } from 'react-toastify';
import { resetPassword } from "../../redux/actions/LoginActions";

function ForgotPassword(props) {

  const [email, setEmail] = useState('');

const handleFormSubmit = () => {
  const emailObj = {
    "email": email
  }
  props.resetPassword(emailObj, props.history)
}

    return (
      <div className="signup flex flex-center w-100 h-100vh">
        <div className="p-8">
          <Card className="signup-card position-relative y-center">
            <Grid container>
              <Grid item lg={5} md={5} sm={5} xs={12}>
                <div className="p-32 flex flex-center flex-middle h-100">
                  <img src="/assets/images/illustrations/dreamer.svg" alt="" />
                </div>
              </Grid>
              <Grid item lg={7} md={7} sm={7} xs={12}>
                <div className="p-36 h-100 bg-light-gray position-relative">
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
                    <div className="flex flex-middle">
                      <Button variant="contained" color="primary" type="submit">
                        Reset Password
                      </Button>
                      <span className="ml-16 mr-8">or</span>
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
            </Grid>
          </Card>
        </div>
      </div>
    );
  }


const mapStateToProps = state => ({
  resetPassword: PropTypes.func.isRequired,
  login: state.login
});
export default withRouter(
  connect(
    mapStateToProps,
    { resetPassword }
  )(ForgotPassword)
);
