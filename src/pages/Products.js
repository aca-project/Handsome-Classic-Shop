import React, { Component } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import SearchBar from "../Components/Search";

class Products extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="shp-main-cnt">
          <SearchBar />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Products;
