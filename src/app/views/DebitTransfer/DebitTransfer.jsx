import React, { useState, useEffect } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import "date-fns";
import { authenticateUser } from "../../redux/actions/bankAuthActions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { prototype } from "react-autosuggest";
import { Icon, Grid, Button, withStyles,  Radio,
  RadioGroup,
  FormControlLabel, } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DebitTransfer(props) {
  const userAuthentication = localStorage.getItem("userAuthentication");
  const isAccountOpen = localStorage.getItem("isAccountOpen");
 
  const [processingCode, setProcessingCode] = useState('creditpayment')
  const [channelId, setChannelId] = useState();
  const [terminalId, setTerminalId] = useState();
  const [productId, setProductId] = useState();
  const [otpPin, setOtpPin] = useState();
  const [transactionAmount, setTransactionAmount] = useState();
  const [channelIdCredit, setChannelIdCredit] = useState();
  const [terminalIdCredit, setTerminalIdCredit] = useState();

  
const handlePayment = (e) => {
  setProcessingCode(e.target.value);
  // console.log('Pay:', e.target.value)
 
}
  const handleSubmit = () => {
    toast.success("Transation has been completed");
 setTimeout(()=>{
  props.history.push({
    pathname: "/"
  });
  
  },1500);
  

  };

  return (
    <div className="bank-auth-wrap">
 {(!isAccountOpen && !userAuthentication) ||
            (isAccountOpen === "true" && userAuthentication === "true") ?      <ValidatorForm
        useRef="form"
        onSubmit={handleSubmit}
        onError={(errors) => null}
      >
        <Grid container>
          <Grid lg={12} md={12} sm={12} xs={12}>
          <h3 className="pagetitle">Payment</h3>
          <ToastContainer />
            <RadioGroup
                                        className="mb-16"
                                        value={processingCode}
                                        name="processingCode"
                                        onChange={handlePayment}
                                        row 
                                    > 
                                        <FormControlLabel
                                            value="creditpayment"
                                            control={<Radio color="secondary" />}
                                            label="Credit Payment"
                                            labelPlacement="end"
                                        />
                                        <FormControlLabel
                                            value="debitPayment"
                                            control={<Radio color="secondary" />}
                                            label="DebitPayment"
                                            labelPlacement="end"
                                        />

                                    </RadioGroup>
                                  
        { processingCode === "debitPayment" ?   <TextValidator
              className="mb-32 w-100"
              label="Channel Id"
              variant="outlined"
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
              variant="outlined"
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
              variant="outlined"
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
              variant="outlined"
              value={otpPin}
              validators={["required"]}
              errorMessages={["Required"]}
            /> : null }

{ processingCode === "debitPayment" ?         <TextValidator
              className="mb-32 w-100"
              label="Transation Amount"
              variant="outlined"
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
              variant="outlined"
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
              variant="outlined"
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

          
        </Grid>
        <div className="titlebtn mt10">
        <Button color="primary" variant="contained" type="submit">
          <Icon>send</Icon>
          <span className="pl-8 capitalize">Send</span>
        </Button>
        </div>
      </ValidatorForm>
: <p> You need to verify OTP again to view your credit and bank inquiry
for security and privacy reason</p>}
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