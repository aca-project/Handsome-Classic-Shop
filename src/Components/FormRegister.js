import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import FormHelperText from "@material-ui/core/FormHelperText";
import ClearIcon from "@material-ui/icons/Clear";
import "firebase/firestore";
import firebase from "firebase";
import CircularProgress from "@material-ui/core/CircularProgress";

class FormRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputEmail: "",
      inputPass: "",
      inputConf: "",
      nameValid: false,
      surnameValid: false,
      valid: false,
      validConf: false,
      redirectHome: false,
      redirectSignInIsOn: false,
      redirect: false,
      name: "",
      surname: "",
      load: false,
        usersEmail:[],
        sameEmail: false,
    };
  }

  handleChange = (event, type) => {
    this.setState({
      [type]: event.target.value
    });
  };

  handleButtonExit = () => {
    this.setState({
      redirectHome: true
    });
  };

  renderRedirectHome = () => {
    if (this.state.redirectHome) {
      return <Redirect to="/" />;
    }
  };

  redirectSignIn = () => {
    let redir = false;
    this.setState({
      redirectSignInIsOn: !redir
    });
  };

  renderRedirectSignIn = () => {
    if (this.state.redirectSignInIsOn) {
      return <Redirect to="/sign-in" />;
    }
  };

  componentDidMount() {
    this.authListener();
    console.log(this.state.user);
  }

  authListener() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
        localStorage.setItem("user", user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem("user");
      }
    });
  }

  handleButtonClick = () => {
    let isValid = true;
    let isValidConf = true;
    if (/^[a-zA-Z]+$/.test(this.state.name)) {
      this.setState({ nameValid: false });
    } else {
      this.setState({ nameValid: true });
    }

    if (/^[a-zA-Z]+$/.test(this.state.surname)) {
      this.setState({ surnameValid: false });
    } else {
      this.setState({ surnameValid: true });
    }

    if (
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.state.inputEmail)
    ) {
      isValid = false;
    }


    let pass = this.state.inputPass;
    let conf = this.state.inputConf;
    if (pass.length === conf.length) {
      for (let i = 0; i < pass.length; ++i) {
        if (pass[i] !== conf[i]) {
          isValidConf = true;
          break;
        } else {
          isValidConf = false;
        }
      }
    }

    this.setState({
      valid: isValid,
      validConf: isValidConf
    });
    if (
      !isValid &&
      !isValidConf &&
      !this.state.nameValid &&
      !this.state.surnameValid
    ) {
      this.setState({
        load: true
      });
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.state.inputEmail,
          this.state.inputPass
        )
        .then(cred => {
          const me = this;
          me.setState({
            redirect: true
          });

          const db = firebase.firestore();
          return db
            .collection("users")
            .doc(cred.user.uid)
            .set({
              name: this.state.name,
              surname: this.state.surname,
              email: this.state.inputEmail,
            });
        });
    }
  };

  renderRedirect = () => {
    if (!this.state.valid && this.state.redirect) {
      return <Redirect to="/home" />;
    }
  };

  render() {
    const isAllDone =
      this.state.inputEmail.length > 0 &&
      this.state.inputPass.length > 6 &&
      this.state.inputConf.length > 6;
    const {
      name,
      surname,
      inputEmail,
      inputPass,
      inputConf,
      valid,
      validConf
    } = this.state;
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
              <h2 className="register-form_title">Create account</h2>
              <form>
                <div className="form-group">
                  <TextField
                    className="form-control-outer"
                    label="Name"
                    type="text"
                    autoComplete="current-password"
                    variant="outlined"
                    onChange={event => this.handleChange(event, "name")}
                    value={name}
                  />
                  {this.state.nameValid ? (
                    <FormHelperText id="component-error-text">
                      Please write correct name{" "}
                    </FormHelperText>
                  ) : (
                    <div />
                  )}
                </div>
                <div className="form-group">
                  <TextField
                    className="form-control-outer"
                    label="Surname"
                    type="text"
                    autoComplete="current-password"
                    variant="outlined"
                    onChange={event => this.handleChange(event, "surname")}
                    value={surname}
                  />
                  {this.state.surnameValid ? (
                    <FormHelperText id="component-error-text">
                      Please write correct surname{" "}
                    </FormHelperText>
                  ) : (
                    <div />
                  )}
                </div>
                <div className="form-group">
                  <TextField
                    error={valid}
                    className="form-control-outer"
                    label="Email*"
                    type="text"
                    autoComplete="current-password"
                    variant="outlined"
                    onChange={event => this.handleChange(event, "inputEmail")}
                    value={inputEmail}
                  />
                  {valid ? (
                    <FormHelperText id="component-error-text">
                      Please fill the field correctly{" "}
                    </FormHelperText>
                  ) : (
                    <div />
                  )}
                </div>

                <div className="form-group">
                  <TextField
                    className="form-control-outer"
                    label="Password*"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    onChange={event => this.handleChange(event, "inputPass")}
                    value={inputPass}
                  />
                </div>

                <div className="form-group">
                  <TextField
                    error={validConf}
                    className="form-control-outer"
                    label="Confirm*"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    onChange={event => this.handleChange(event, "inputConf")}
                    value={inputConf}
                  />
                  {validConf ? (
                    <FormHelperText id="component-error-text">
                      Passwords don't match{" "}
                    </FormHelperText>
                  ) : (
                    <div />
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
                    Register
                    {this.state.load ? (
                      <CircularProgress
                        size={30}
                        className="load"
                        disableShrink
                      />
                    ) : (
                      <div />
                    )}
                  </Button>
                </div>
                {this.renderRedirectSignIn()}
                <p className="register-form_opposite-text text-right">
                  Already have an account?{" "}
                  <span
                    className="register-form_opposite-link main-transition"
                    onClick={this.redirectSignIn}
                  >
                    Sign In
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

export default FormRegister;
