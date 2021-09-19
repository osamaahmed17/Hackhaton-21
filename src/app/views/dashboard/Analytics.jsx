import React, { Component, Fragment, useState } from "react";

import { Icon, Grid, Button, withStyles } from "@material-ui/core";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  toast,ToastContainer
} from 'react-toastify';
import axios from 'axios';
import DoughnutChart from "../charts/echarts/Doughnut";

import ModifiedAreaChart from "./shared/ModifiedAreaChart";
import StatCards from "./shared/StatCards";
import TableCard from "./shared/TableCard";
import RowCards from "./shared/RowCards";
import StatCards2 from "./shared/StatCards2";
import UpgradeCard from "./shared/UpgradeCard";
import ContactUs from "../ContactUs/ContactUs";
import Admin from '../Admin/Admin'
import Campaigns from "./shared/Campaigns";
// import { withStyles } from "@material-ui/styles";
import "react-toastify/dist/ReactToastify.css";

function Dashboard1(){

  const userAuthentication = localStorage.getItem('userAuthentication');
  const isAccountOpen = localStorage.getItem('isAccountOpen');
  const [otpNumber, setOtpNumber] = useState();
const [ isOtp, setIsOtp] = useState(false);

const sendOtp = () => {
 
    const body ={

    }
  axios
  .post(`rest/api/v1/otpGenerator`,body,  {
    headers: {
        'userEmail': localStorage.getItem('email'),
        'Authorization': localStorage.getItem('authorization')
      },

  })
  .then((res) => {
   
    toast.success("OTP has been sent");
    setIsOtp(true)
    setTimeout(()=>{
      // history.push('/');
    }, 2500)
  })
  .catch((err) => {
    toast.error("Something went wrong");
    // dispatch({ type: BANK_AUTH_ERROR });
  });

}

const handleSubmit = () => {
  const otpObj = {
    "pin" : otpNumber
  }
  axios
  .post(`rest/api/v1/loginBank`,otpObj,  {
    headers: {
        'userEmail': localStorage.getItem('email'),
        'Authorization': localStorage.getItem('authorization')
      },

  })
  .then((res) => {
   
    toast.success("OTP has been verified");
    setIsOtp(true)
    setTimeout(()=>{
      // history.push('/');
      window.location.reload();
    }, 2000)
  })
  .catch((err) => {
    toast.error("Something went wrong");
    // dispatch({ type: BANK_AUTH_ERROR });
  });

}
    return (
      <Fragment>
        <div className="pb-86 pt-30 px-30 bg-primary">
          {/* <ModifiedAreaChart
            option={{
              series: [
                {
                  data: [34, 45, 31, 45, 31, 43, 26, 43, 31, 45, 33, 40],
                  type: "line"
                }
              ],
              xAxis: {
                data: [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec"
                ]
              }
            }}
          ></ModifiedAreaChart>
        */}
        </div>

        <div className="analytics m-sm-30 mt--72">
          <Grid container spacing={3}>
            <Grid item lg={12} md={8} sm={12} xs={12}>
      {(!isAccountOpen   && !userAuthentication) || (isAccountOpen === 'true'  && userAuthentication === 'true') ?    <button onClick={sendOtp}>OTP</button> : null}
{
  isOtp ===  true ? 
  <ValidatorForm
  useRef="form"
  onSubmit={handleSubmit}
  onError={(errors) => null}
>
  <Grid container spacing={6}>
    <Grid item lg={6} md={6} sm={12} xs={12}>
      <ToastContainer />
      <TextValidator
        className="mb-32 w-100"
        label="OTP"
        onChange={(e) => {
          setOtpNumber(e.target.value);
        }}
        type="number"
        name="otpNumber"
        value={otpNumber}
        validators={["required"]}
        errorMessages={["Required"]}
      />
     
     </Grid>

    <Grid item lg={6} md={6} sm={12} xs={12}></Grid>
  </Grid>
  <Button color="primary" variant="contained" type="submit">
    <Icon>send</Icon>
    <span className="pl-8 capitalize">Verify OTP</span>
  </Button>
</ValidatorForm>

  : null
}
            {/* {isAccountOpen  && userAuthentication ? <button onClick={sendOtp}>OTP</button> : null } */}
            <ToastContainer />
            </Grid>

            {/* <Grid item lg={4} md={4} sm={12} xs={12}> */}
              {/* <Card className="px-24 py-16 mb-16">
                <div className="card-title">Traffic Sources</div>
                <div className="card-subtitle">Last 30 days</div>
                <DoughnutChart
                  height="300px"
                  color={[
                    theme.palette.primary.dark,
                    theme.palette.primary.main,
                    theme.palette.primary.light
                  ]}
                />
              </Card> */}

              {/* <UpgradeCard/> */}

              {/* <Campaigns/> */}

            {/* </Grid> */}
          </Grid>
        </div>
      </Fragment>
    );
  }


export default withStyles({}, { withTheme: true })(Dashboard1);
