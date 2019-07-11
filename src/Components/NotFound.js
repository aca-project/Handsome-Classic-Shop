import React, { Component } from "react";
import "../App.css";
import Header from "./Header";

export class NotFound extends Component {
  render() {
    return (
      <div className="error">
        <Header />
        <div className="error">Page not found 404</div>
      </div>
    );
  }
}

export default NotFound;
