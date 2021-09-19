import React, { useState, useEffect } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import "date-fns";
import { authenticateUser } from "../../redux/actions/bankAuthActions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { prototype } from "react-autosuggest";
import { Icon, Grid, Button, withStyles } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DebitTransfer(props) {
  const [processingCode, setProcessingCode] = useState('creditpayment')
  const [channelId, setChannelId] = useState();
  const [terminalId, setTerminalId] = useState();
  const [productId, setProductId] = useState();
  const [otpPin, setOtpPin] = useState();
  const [transactionAmount, setTransactionAmount] = useState();
  const [channelIdCredit, setChannelIdCredit] = useState();
  const [terminalIdCredit, setTerminalIdCredit] = useState();

  

  const handleSubmit = () => {
  
  };

  return (
    <div>
      <ValidatorForm
        useRef="form"
        onSubmit={handleSubmit}
        onError={(errors) => null}
      >
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <ToastContainer />
            {/* <TextValidator
              className="mb-32 w-100"
              label="Reserved One"
              onChange={(e) => {
                setReservedOne(e.target.value);
              }}
              type="number"
              name="reservedOne"
              value={reservedOne}
              validators={["required"]}
              errorMessages={["Required"]}
            /> */}
        { processingCode === "debitPayment" ?   <TextValidator
              className="mb-32 w-100"
              label="Channel Id"
              onChange={(e) => {
                setChannelId(e.target.value);
              }}
              type="text"
              name="channelId"
              value={channelId}
              validators={["required"]}
              errorMessages={["Required"]}
            /> : null }
       { processingCode === "debitPayment" ?         <TextValidator
              className="mb-32 w-100"
              label="Terminal Id"
              onChange={(e) => {
                setTerminalId(e.target.value);
              }}
              type="text"
              name="terminalId"
              value={terminalId}
              validators={["required"]}
              errorMessages={["Required"]}
            /> : null }

{ processingCode === "debitPayment" ?         <TextValidator
              className="mb-32 w-100"
              label="Product Id"
              onChange={(e) => {
                setProductId(e.target.value);
              }}
              type="text"
              name="productId"
              value={productId}
              validators={["required"]}
              errorMessages={["Required"]}
            /> : null }
            { processingCode === "debitPayment" ?         <TextValidator
              className="mb-32 w-100"
              label="Otp Pin"
              onChange={(e) => {
                setOtpPin(e.target.value);
              }}
              type="text"
              name="otpPin"
              value={otpPin}
              validators={["required"]}
              errorMessages={["Required"]}
            /> : null }

{ processingCode === "debitPayment" ?         <TextValidator
              className="mb-32 w-100"
              label="Transation Amount"
              onChange={(e) => {
                setTransactionAmount(e.target.value);
              }}
              type="number"
              name="transactionAmount"
              value={transactionAmount}
              validators={["required"]}
              errorMessages={["Required"]}
            /> : null }
            { processingCode === "creditpayment" ?         <TextValidator
              className="mb-32 w-100"
              label="Channel Id"
              onChange={(e) => {
                setChannelIdCredit(e.target.value);
              }}
              type="text"
              name="channelIdCredit"
              value={channelIdCredit}
              validators={["required"]}
              errorMessages={["Required"]}
            /> : null }
             { processingCode === "creditpayment" ?         <TextValidator
              className="mb-32 w-100"
              label="Terminal Id"
              onChange={(e) => {
                setTerminalIdCredit(e.target.value);
              }}
              type="text"
              name="terminalIdCredit"
              value={terminalIdCredit}
              validators={["required"]}
              errorMessages={["Required"]}
            /> : null }
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}></Grid>
        </Grid>
        <Button color="primary" variant="contained" type="submit">
          <Icon>send</Icon>
          <span className="pl-8 capitalize">Authenticate</span>
        </Button>
      </ValidatorForm>
    </div>
  );
}

const mapStateToProps = (state, props) => {
  return {
    //   signUpUser: PropTypes.func.isRequired,
    error: state.bankAuth.error,
    errorMessage: state.bankAuth.errorMessage,
  };
};
export default withStyles(prototype.styles, { withTheme: true })(
  withRouter(connect(mapStateToProps, { authenticateUser })(DebitTransfer))
);
