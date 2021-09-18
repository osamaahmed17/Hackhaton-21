import React, { useState, useEffect } from "react";
import {
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  Button,
  withStyles,
  CircularProgress} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

import { signUpUser } from "../../redux/actions/signUpActions";
import { withRouter } from "react-router-dom";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { ToastContainer, toast } from 'react-toastify';
import { prototype } from "react-autosuggest";
import 'react-toastify/dist/ReactToastify.css';


function SignUp(props) {

  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [ cnicNumber, setCnicNumber ] = useState('');
  const [ phoneNumber, setPhoneNumber ] = useState('');

  useEffect(() => {
    if(props.error){
      toast(props.errorMessage);
    }
    
  }, [ props.error]);
  const handleFormSubmit = () => {
    const signUpObj = {

   
      "email": email,
      "password": password,
      "cnicNumber": cnicNumber,
      "mobileNumber": phoneNumber
    }
    props.signUpUser(signUpObj, props.history);
  }
  return (
    <div className="signup flex flex-center w-100 h-100vh">
      <div className="p-8">
        <Card className="signup-card position-relative y-center">
          <Grid container>
          
            <Grid item lg={5} md={5} sm={5} xs={12}>
              <div className="p-32 flex flex-center bg-light-gray flex-middle h-100">
                <img
                  src="/assets/images/illustrations/posting_photo.svg"
                  alt=""
                />
              </div>
            </Grid>
            <Grid item lg={7} md={7} sm={7} xs={12}>
              <div className="p-36 h-100">
            
                <ValidatorForm useRef="form" onSubmit={handleFormSubmit}>
               
                  <TextValidator
                    className="mb-24 w-100"
                    variant="outlined"
                    label="Email"
                    onChange={(e) => { setEmail(e.target.value) }}
                    type="email"
                    name="email"
                    value={email}
                    validators={["required", "isEmail"]}
                    errorMessages={[
                      "this field is required",
                      "email is not valid"
                    ]}
                  />
                <ToastContainer /> 
                  <TextValidator
                    className="mb-16 w-100"
                    label="Password"
                    variant="outlined"
                    onChange={(e) => { setpassword(e.target.value) }}
                    name="password"
                    type="password"
                    value={password}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                
                    <PhoneInput
                      className="mb-24 w-100"
      placeholder="Enter phone number"
      defaultCountry="PK"
      value={phoneNumber}
      min="11"
      max="11"
      onChange={setPhoneNumber}/>

              
                   <TextValidator
                    className="mb-24 w-100"
                    variant="outlined"
                    max="13"
                    min="12"
                    label="CNIC Number(13 digits)"
                    onChange={(e) => { setCnicNumber(e.target.value) }}
                    type="tel"
                    name="cnicNumber"
                    value={cnicNumber}
                    pattern="^\d{5}-\d{8}-\d{1}$"
                    validators={["required",
                    "minStringLength: 13",
                    "maxStringLength: 13"]}
                    errorMessages={["this field is required"]}
                  />
                  {/* <FormControlLabel
                      className="mb-16"
                      name="agreement"
                      onChange={handleChange}
                      control={<Checkbox />}
                      label="I have read and agree to the terms of service."
                    /> */}
                  <div className="flex flex-middle">
                    <Button
                      className="capitalize"
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      Sign up
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

// const mapStateToProps = state => ({
//   // setUser: PropTypes.func.isRequired
 
//   error: state.
// });

const mapStateToProps = (state, props )=> {
  return {
    signUpUser: PropTypes.func.isRequired,
     error: state.signUp.error,
     errorMessage: state.signUp.errorMessage
  }
  }
export default withStyles(prototype.styles, { withTheme: true })(
  withRouter(
    connect(
      mapStateToProps,
      { signUpUser }
    )(SignUp)
  ));
