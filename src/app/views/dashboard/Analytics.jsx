import React, { Fragment, useState } from "react";

import {
  Grid,
  Button,
  withStyles,
  Table,
  TableHead,
  TableCell,
  TableBody,
  IconButton,
  Icon,
  TableRow,
} from "@material-ui/core";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

function Dashboard1() {
  const userAuthentication = localStorage.getItem("userAuthentication");
  const isAccountOpen = localStorage.getItem("isAccountOpen");
  const [otpNumber, setOtpNumber] = useState();
  const [isOtp, setIsOtp] = useState(false);
  const [isVerify, setIsVerify] = useState(false);

  const sendOtp = () => {
    const body = {};
    axios
      .post(`rest/api/v1/otpGenerator`, body, {
        headers: {
          userEmail: localStorage.getItem("email"),
          Authorization: localStorage.getItem("authorization"),
        },
      })
      .then((res) => {
        toast.success("OTP has been sent");
        setIsOtp(true);
        setIsVerify(false);
        setTimeout(() => {
          // history.push('/');
        }, 2500);
      })
      .catch((err) => {
        toast.error("Something went wrong");
        // dispatch({ type: BANK_AUTH_ERROR });
      });
  };

  const handleSubmit = () => {
    const otpObj = {
      pin: otpNumber,
    };
    axios
      .post(`rest/api/v1/loginBank`, otpObj, {
        headers: {
          userEmail: localStorage.getItem("email"),
          Authorization: localStorage.getItem("authorization"),
        },
      })
      .then((res) => {
        toast.success("OTP has been verified");
        setOtpNumber();
        setIsVerify(true);
        setTimeout(() => {
          // history.push('/');
          // window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        toast.error("Something went wrong");
        // dispatch({ type: BANK_AUTH_ERROR });
      });
  };

  const balanceInquiryList = [
    {
      MerchantType: "0088",
      TraceNo: "211309",
      CompanyName: "NOVA",
      Balance: "",
      DateTime: "20210603201527",
    },
  ];

  return (
    <Fragment>
      <div className="bank-auth-wrap">
      <div className="verify-msg">
        {isOtp === false && isVerify === false ? (
          <p>
            <strong>Alert: </strong>You need to verify OTP again to view your credit and bank inquiry
            for security and privacy reason.
          </p>
        ) : null}
        {isVerify === true ? (
          <div className="w-full overflow-auto">
            <Table className="whitespace-pre">
              <TableHead>
                <TableRow>
                  <TableCell className="px-0">CompanyName</TableCell>
                  <TableCell className="px-0">MerchantType</TableCell>
                  <TableCell className="px-0">TraceNo</TableCell>
                  <TableCell className="px-0">Balance</TableCell>
                  <TableCell className="px-0">DateTime</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {balanceInquiryList?.map((balanceInquiry, index) => (
                  <TableRow key={index}>
                    <TableCell className="px-0 capitalize" align="left">
                      {balanceInquiry.CompanyName}
                    </TableCell>
                    <TableCell className="px-0 capitalize" align="left">
                      {balanceInquiry.MerchantType}
                    </TableCell>
                    <TableCell className="px-0 capitalize" align="left">
                      {balanceInquiry.TraceNo}
                    </TableCell>
                    <TableCell className="px-0 capitalize">
                      {balanceInquiry.Balance}
                    </TableCell>
                    <TableCell className="px-0 capitalize">
                      ${balanceInquiry.DateTime}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : null}
      </div>

      <div className="analytics">
        <Grid container>
          <Grid lg={12} md={8} sm={12} xs={12}>
          {/* <h3 className="pagetitle">Generate OTP</h3> */}
            {(!isAccountOpen && !userAuthentication) ||
            (isAccountOpen === "true" && userAuthentication === "true") ? (
              <Button color='primary' variant='contained' onClick={sendOtp} className="gen-otp"><span className="capitalize">Click here to Generate OTP</span></Button>
            ) : null}
            {isOtp === true && isVerify === false ? (
              <ValidatorForm
                useRef="form"
                onSubmit={handleSubmit}
                onError={(errors) => null}
              >
                <Grid container spacing={6}>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <ToastContainer />
                    <TextValidator
                      className="mb-32 w-100"
                      label="OTP"
                      variant="outlined"
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

                  
                </Grid>
                <Button color="primary" variant="contained" type="submit">
                  <Icon>send</Icon>
                  <span className="pl-8 capitalize">Verify OTP</span>
                </Button>
              </ValidatorForm>
            ) : null}
            {/* {isAccountOpen  && userAuthentication ? <button onClick={sendOtp}>OTP</button> : null } */}
            <ToastContainer />
          </Grid>
        </Grid>
      </div>
      </div>
    </Fragment>
  );
}

export default withStyles({}, { withTheme: true })(Dashboard1);
