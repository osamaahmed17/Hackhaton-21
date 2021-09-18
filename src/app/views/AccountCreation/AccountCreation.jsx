import React, { useState, useEffect } from "react";
import { ValidatorForm } from "react-material-ui-form-validator";
import "date-fns";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { prototype } from "react-autosuggest";
import { Icon, Grid, Button, withStyles } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import { accountOpen } from '../../redux/actions/accountCreateActions';

function AccountCreation(props) {
  const [mobileNetwork, setMobileNetwork] = useState("");
  const [cnicIssuanceDate, setCnicIssuanceDate] = useState();

  useEffect(() => {
    if (props.error) {
      toast(props.errorMessage);
    }
  }, [props.error]);

  const handleSubmit = () => {
    const authenticateObj = {
      cnicIssuanceDate: moment(cnicIssuanceDate).format('YYYY-MM-DD'),
      mobileNetwork: mobileNetwork,
    };
    props.accountOpen(authenticateObj, props.history);
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

            <label>Mobile Network</label>
            <select
              name="mobileNetwork"
              value={mobileNetwork}
              onChange={(e) => {
                setMobileNetwork(e.target.value);
              }}
              required
              c
            >
              <option value="UFONE">UFONE</option>
              <option value="WARID">WARID</option>
              <option value="JAZZ">JAZZ</option>
              <option value="TELENOR">TELENOR</option>
            </select>

            <label>CNIC's Date of Issuance</label>

            <Datetime
              inputProps={{ readOnly: true }}
              onChange={(date) => setCnicIssuanceDate(date)}
              closeOnSelect={true}
              timeFormat={false}
              dateFormat="YYYY-MM-DD"
              value={cnicIssuanceDate && moment(cnicIssuanceDate).toDate()}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}></Grid>
        </Grid>
        <Button color="primary" variant="contained" type="submit">
          <Icon>send</Icon>
          <span className="pl-8 capitalize">Create Account</span>
        </Button>
      </ValidatorForm>
    </div>
  );
}

const mapStateToProps = (state, props) => {
  return {
    //   signUpUser: PropTypes.func.isRequired,
    error: state.accountCreate.error,
    errorMessage: state.accountCreate.errorMessage,
  };
};
export default withStyles(prototype.styles, { withTheme: true })(
  withRouter(connect(mapStateToProps, { accountOpen })(AccountCreation))
);
