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

function BankAuth(props) {
  const [merchantType, setMerchantType] = useState();
  const [transactionType, setTtransactionType] = useState();
  const [reservedOne, setReservedOne] = useState();
  const [companyName, setCompanyName] = useState();

  useEffect(() => {
    if (props.error) {
      toast(props.errorMessage);
    }
  }, [props.error]);

  const handleSubmit = () => {
    const authenticateObj = {
      merchantType: merchantType,
      companyName: companyName,
      reservedOne: reservedOne,
      transactionType: transactionType,
    };
    props.authenticateUser(authenticateObj, props.history);
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
            <TextValidator
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
            />
            <TextValidator
              className="mb-32 w-100"
              label="Conpany Name"
              onChange={(e) => {
                setCompanyName(e.target.value);
              }}
              type="text"
              name="companyName"
              value={companyName}
              validators={["required"]}
              errorMessages={["Required"]}
            />
            <TextValidator
              className="mb-32 w-100"
              label="Transaction Type"
              onChange={(e) => {
                setTtransactionType(e.target.value);
              }}
              type="number"
              name="transactionType"
              value={transactionType}
              validators={["required"]}
              errorMessages={["Required"]}
            />

            <TextValidator
              className="mb-32 w-100"
              label="Merchat Type"
              onChange={(e) => {
                setMerchantType(e.target.value);
              }}
              type="number"
              name="merchantType"
              value={merchantType}
              validators={["required"]}
              errorMessages={["Required"]}
            />
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
  withRouter(connect(mapStateToProps, { authenticateUser })(BankAuth))
);
