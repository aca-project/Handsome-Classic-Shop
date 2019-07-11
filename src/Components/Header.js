import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Redirect } from "react-router-dom";
import logo from "../images/logo.png";
import "../Styles.css";
import firebase from "firebase";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MenuIcon from "@material-ui/icons/Menu";

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectSignIn: false,
      redirectSignUp: false,
      redirectLogout: false,
      redirectBadg: false,
      isIn: false,
      name: "",
      surname: "",
      userEmail: "",
      windowWidth: window.innerWidth,
      mobileNavVisible: false,
      user: null
    };
  }

  handleResize() {
    this.setState({ windowWidth: window.innerWidth });
  }

  authListener = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
        localStorage.setItem("user", user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem("user");
      }
    });
  };

  setRedirectSignIn = () => {
    this.setState({
      redirectSignIn: true
    });
  };

  setRedirectSignUp = () => {
    this.setState({
      redirectSignUp: true
    });
  };

  handelBadg = () => {
    this.setState({
      redirectBadg: true
    });
  };

  setRedirectBadg = () => {
    if (this.state.redirectBadg) {
      return <Redirect to="/cart" />;
    }
  };

  setRedirectLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.setState({
          isIn: false,
          redirectLogout: true
        });
      });
  };

  renderRedirectLogout = () => {
    if (this.state.redirectLogout) {
      return <Redirect to="/home" />;
    }
  };

  renderRedirectSignIn = () => {
    if (this.state.redirectSignIn) {
      return <Redirect to="/sign-in" />;
    }
  };

  renderRedirectSignUp = () => {
    if (this.state.redirectSignUp) {
      return <Redirect to="/sign-up" />;
    }
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize.bind(this));
    // this.getdata();
    setTimeout(() => {
      console.log(this.state.name);
    }, 100);
    if (firebase.auth().currentUser) {
      this.setState({
        isIn: true
      });
    }
    this.authListener();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize.bind(this));
  }



  renderMobileNav() {
    if (this.state.mobileNavVisible) {
      return this.navigationLinks();
    }
  }

  handleNavClick() {
    if (!this.state.mobileNavVisible) {
      this.setState({ mobileNavVisible: true });
    } else {
      this.setState({ mobileNavVisible: false });
    }
  }

  navigationLinks() {
    return [
      <div className="collapsable-menu">
        <nav className="shp-nav">
          <ul className="shp-nav_list list-reset">
            <li className="shp-nav_item">
              <NavLink
                className="shp-nav_link main-transition"
                activeClassName="active"
                to="/home"
              >
                Home
              </NavLink>
            </li>
            <li className="shp-nav_item shp-nav_item--dropdown-menu">
              <NavLink className="shp-nav_link main-transition">
                Categories
              </NavLink>
              <ul className="shp-dropdown list-reset main-transition">
                <li className="shp-dropdown_item">
                  <NavLink
                    className="shp-dropdown_link main-txt-clr main-transition"
                    to="/suits"
                  >
                    Suits
                  </NavLink>
                </li>
                <li className="shp-dropdown_item">
                  <NavLink
                    className="shp-dropdown_link main-txt-clr main-transition"
                    to="/shoes"
                  >
                    Shoes
                  </NavLink>
                </li>
                <li className="shp-dropdown_item">
                  <NavLink
                    className="shp-dropdown_link main-txt-clr main-transition"
                    to="/accessories"
                  >
                    Accessories
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="shp-nav_item">
              <NavLink
                className="shp-nav_link main-transition"
                activeClassName="active"
                to="/products"
              >
                Products
              </NavLink>
            </li>
            <li className="shp-nav_item">
              <NavLink
                className="shp-nav_link main-transition"
                activeClassName="active"
                to="/about"
              >
                About
              </NavLink>
            </li>
          </ul>
        </nav>
        {/*{this.renderToResult()}*/}
      </div>
    ];
  }

  renderNavigation() {
    if (this.state.windowWidth <= 1080) {
      return [
        <div className="mobile_nav">
          <span onClick={this.handleNavClick.bind(this)}>
            <MenuIcon />
          </span>
          {this.renderMobileNav()}
        </div>
      ];
    } else {
      return [<div className="nav_menu">{this.navigationLinks()}</div>];
    }
  }

  render() {
    const StyledBadge = withStyles(theme => ({
      badge: {
        top: "50%",
        right: -3,
        // The border color match the background color.
        border: `2px solid ${
          theme.palette.type === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[900]
        }`
      }
    }))(Badge);

    const sty = {
      width: 40,
      height: 40
    };

    const cartQtySty = {
      color: "#eee",
      marginRight: "20px"
    };

    return (
      <header className="shp-header">
        <div className="shp-container shp-container--header">
          <h1 className="shp-logo">
            <NavLink className="shp-logo_link" to="/">
              <img className="shp-logo_img" src={logo} alt="Handsome Classic" />
            </NavLink>
          </h1>

          {this.renderNavigation()}

          <div className="signin-btns main-txt-clr">
            {this.setRedirectBadg()}
            {this.state.isIn ? (
              <IconButton
                aria-label="Cart"
                className="header_cart"
                onClick={this.handelBadg}
              >
                <StyledBadge badgeContent={this.props.total} style={cartQtySty}>
                  <ShoppingCartIcon style={sty} />
                </StyledBadge>
              </IconButton>
            ) : (
              <div />
            )}
            {this.renderRedirectSignIn()}
            <span
              className={
                this.state.isIn ? "hidden" : "signin-btns_btn main-transition"
              }
              onClick={this.setRedirectSignIn}
            >
              Sign In
            </span>
            <span className={this.state.isIn ? "hidden" : ""}>
              /&nbsp;&nbsp;
            </span>
            {this.renderRedirectSignUp()}
            <span
              className={
                this.state.isIn ? "hidden" : "signin-btns_btn main-transition"
              }
              onClick={this.setRedirectSignUp}
            >
              Sign Up
            </span>
            {this.renderRedirectLogout()}
            {this.state.isIn ? (
              <div className="header_loggedin-wrap">
                <div>
                  <span className="divpng">
                    <img
                      className="png4"
                      src="https://image.flaticon.com/icons/svg/25/25978.svg"
                      alt=""
                    />
                  </span>
                  {/*<p className="header_username"> Mr. {this.state.surname}</p>*/}
                </div>
                <span
                  className="shp-nav_link header_logout main-transition"
                  onClick={this.setRedirectLogout}
                >
                  Logout
                </span>
              </div>
            ) : (
              <div />
            )}
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
