import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Card, Grid, Button } from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { withRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetPassword } from "../../redux/actions/ResetPassAction";
import { useLocation } from "react-router-dom";

function ResetPassword(props) {

  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
const search = useLocation().search;
const id=new URLSearchParams(search).get("token");
console.log(id);//12345

  useEffect(() => {
    if (props.error) {
      toast(props.errorMessage);
    }
  }, [props.error]);
  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", value => {
        if (value !== password) {
          return false;
        }
        return true;
      });
   }, [password,confirmPass])

  const handleFormSubmit = () => {
    const resetPassObj = {
      "password": password
    }
    props.resetPassword(resetPassObj, id,props.history)
  };

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
                    className="mb-16 w-100"
                    label="New Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    name="password"
                    type="password"
                    value={password}
                    validators={["required", "isPasswordMatch"]}
                    errorMessages={["Required", "password didn't match"]}
                  />
                  <TextValidator
                    className="mb-16 w-100"
                    label="Confirm New Password"
                    onChange={(e) => {
                      setConfirmPass(e.target.value);
                    }}
                    name="confirmPass"
                    type="password"
                    value={confirmPass}
                    validators={["required", "isPasswordMatch"]}
                    errorMessages={["Required", "password didn't match"]}
                  />
                  <div className="flex flex-middle">
                    <Button variant="contained" color="primary" type="submit">
                      Update Password
                    </Button>
                    {/* <span className="ml-16 mr-8">or</span> */}
                    {/* <Button
                    className="capitalize"
                    onClick={() =>
                      props.history.push("/session/signin")
                    }
                  >
                    Sign in
                  </Button> */}
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

const mapStateToProps = (state) => ({
  // resetPassword: PropTypes.func.isRequired,
  // login: state.login,
  error: state.resetPass.error,
  errorMessage: state.resetPass.errorMessage
});
export default withRouter(
  connect(mapStateToProps, {
       resetPassword
  })(ResetPassword)
);
