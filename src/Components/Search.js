import React, { Component } from "react";
import firebase from "firebase";
import Product from "./Product";
import CircularProgress from "@material-ui/core/CircularProgress";
import SearchIcon from "@material-ui/icons/Search";

class SearchAppBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      data: [],
      loader: false
    };
  }
  handleChange = event => {
    this.setState({
      input: event.target.value
    });
  };
  getData = () => {
    this.setState({
      loader: true
    });
    const db = firebase.firestore();
    db.collection("products")
      .get()
      .then(snapshot => {
        const responseData = snapshot.docs.map(doc => doc.data());
        this.setState({
          data: responseData,
          loader: false
        });
      });
  };
  componentDidMount() {
    this.getData();
  }

  render() {
    let filteredProducts = this.state.data.filter(product => {
      return (
        product.title.toLowerCase().includes(this.state.input.toLowerCase()) ||
        product.description
          .toLowerCase()
          .includes(this.state.input.toLowerCase()) ||
        product.price.toLowerCase().includes(this.state.input.toLowerCase())
      );
    });

    return (
      <div className="shp-container-fluid">
        {this.state.loader && (
          <CircularProgress
            color={"inherit"}
            size={50}
            className="load"
            disableShrink
          />
        )}
        <div className="shp-search">
          {!this.state.loader && (
            <div>
              <div className="shp-search_icon">
                <SearchIcon />
              </div>
              <input
                onChange={this.handleChange}
                onClick={this.handleClick}
                className="form-control form-control--search"
                type="text"
                placeholder="search"
              />
            </div>
          )}
        </div>
        <div>
          <div className="shp-row">
            {filteredProducts.map(item => (
              <Product item={item}/>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default SearchAppBar;
