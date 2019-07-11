import "../Styles.css";
import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import firebase from "firebase";
import { Redirect } from "react-router-dom";
import FormHelperText from "@material-ui/core/FormHelperText";
import ClearIcon from "@material-ui/icons/Clear";
import CircularProgress from "@material-ui/core/CircularProgress";

export class FormLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputEmail: "",
      inputPass: "",
      valid: false,
      redirect: false,
      redirectHome: false,
      isAllOk: true,
      redirectCreateIsOn: false,
      load: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleButtonExit = this.handleButtonExit.bind(this);
  }

  handleChange(event, type) {
    this.setState({
      [type]: event.target.value
    });
  }

  handleButtonClick() {
    let isValid = true;
    if (
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.state.inputEmail)
    ) {
      isValid = false;
    }
    this.setState({
      valid: isValid
    });

    if (!isValid) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.inputEmail, this.state.inputPass)
        .then(() => {
          this.setState({
            load: true,
            redirect: true
          });
        })
        .catch(() =>
          this.setState({
            isAllOk: false
          })
        );
    }
  }

  renderRedirect = () => {
    if (!this.state.valid && this.state.redirect) {
      return <Redirect to={{ pathname: "/home" }} />;
    }
  };

  renderRedirectHome = () => {
    if (this.state.redirectHome) {
      return <Redirect to="/" />;
    }
  };

  handleButtonExit() {
    let redir = false;
    this.setState({
      redirectHome: !redir
    });
  }

  redirectCreate = () => {
    let redir = false;
    this.setState({
      redirectCreateIsOn: !redir
    });
  };

  redirectCreateAccount = () => {
    if (this.state.redirectCreateIsOn) {
      return <Redirect to="/sign-up" />;
    }
  };
  render() {
    const isAllDone =
      this.state.inputEmail.length > 0 && this.state.inputPass.length > 6;
    const { inputEmail, inputPass, valid } = this.state;
    return (
      <div>
        <div className="register-wrapp">
          <div className="register-form">
            <div className="register-form_img-holder" />

            <div className="register-form_form-holder">
              {this.renderRedirectHome()}
              <span
                className="register-form_close main-transition"
                onClick={this.handleButtonExit}
              >
                <ClearIcon />
              </span>
              <h2 className="register-form_title">Login to your account </h2>
              <form>
                <div className="form-group">
                  <TextField
                    error={valid}
                    className="form-control-outer"
                    label="Email"
                    type="text"
                    autoComplete="current-password"
                    variant="outlined"
                    onChange={event => this.handleChange(event, "inputEmail")}
                    value={inputEmail}
                  />

                  <br />
                  {valid ? (
                    <FormHelperText id="component-error-text">
                      Please fill the field correctly{" "}
                    </FormHelperText>
                  ) : (
                    <div />
                  )}
                  {this.state.isAllOk ? (
                    <div />
                  ) : (
                    <FormHelperText id="component-error-text">
                      Please fill the field correctly{" "}
                    </FormHelperText>
                  )}
                </div>
                <div className="form-group">
                  <TextField
                    className="form-control-outer"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    onChange={event => this.handleChange(event, "inputPass")}
                    value={inputPass}
                  />
                  <br />
                  {this.state.isAllOk ? (
                    <div />
                  ) : (
                    <FormHelperText id="component-error-text">
                      Please fill the field correctly{" "}
                    </FormHelperText>
                  )}
                </div>

                <div className="form-group text-right">
                  {this.renderRedirect()}
                  <Button
                    className="shp-btn shp-btn--dark"
                    variant="contained"
                    disabled={!isAllDone}
                    onClick={this.handleButtonClick}
                  >
                    Login
                    {this.state.load ? (
                      <CircularProgress
                        size={50}
                        className="load"
                        disableShrink
                      />
                    ) : (
                      <div />
                    )}
                  </Button>
                </div>
                {this.redirectCreateAccount()}
                <p
                  className="register-form_opposite-text text-right"
                  onClick={this.redirectCreate}
                >
                  New to Handsome Classic?{" "}
                  <span className="register-form_opposite-link main-transition">
                    Create account
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FormLogin;
