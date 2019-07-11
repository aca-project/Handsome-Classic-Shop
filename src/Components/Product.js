import React, { Component } from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import firebase from "firebase";
import { Redirect } from "react-router-dom";
import AddedToCartModal from "./AddetToCartModal";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isIn: false,
      isInBasket: false,
      modal: false,
      isShow: false
    };
  }

  getdata = () => {
    if (firebase.auth().currentUser) {
      const db = firebase.firestore();
      db.collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("basket")
        .get()
        .then(snapshot => {
          const basketProducts = snapshot.docs.map(doc => doc.data());
          this.setState({
            basketProducts
          });
        });
    }
  };

  addToBasket = () => {
    if (!firebase.auth().currentUser) {
      this.setState({
        isIn: true
      });
    } else {
      let bool = false;
      for (let i = 0; i < this.state.basketProducts.length; i++) {
        let a = this.state.basketProducts[i];
        if (a.title === this.props.item.title) {
          bool = true;
          break;
        }
      }
      if (bool === false) {
        const db = firebase.firestore();
        db.collection("users")
          .doc(firebase.auth().currentUser.uid)
          .collection("basket")
          .add({
            ...this.props.item,
            count: 1
          });
      } else {
        this.setState({ isInBasket: true, modal: true, isShow: true });
      }
    }
  };

  componentDidMount = () => {
    this.getdata();
  };

  componentDidUpdate = () => {
    this.getdata();
  };

  renderSignIn = () => {
    if (this.state.isIn) {
      return <Redirect to="/sign-in" />;
    }
  };

  render() {
    const { item } = this.props;
    return (
      <div className="shp-col-xl-3 shp-col-md-4 shp-col-sm-6">
        {this.state.modal ? (
          <AddedToCartModal open={this.state.modal} />
        ) : (
          <div />
        )}
        <div className="product">
          <div className="product_img-holder">
            <img src={item.image} className="product_img" alt="" />
          </div>
          <div className="product_content">
            <h2 className="product_title">{item.title}</h2>
            <p className="product_info">{item.description}</p>
            <div
              className={
                this.state.isInBasket
                  ? "product_btn-holder product_btn-holder--added"
                  : "product_btn-holder"
              }
            >
              <span className="product_btn-left main-transition">
                <span className="product_price main-transition">
                  {item.price}
                </span>
                <span className="product_cart-icon main-transition ">
                  <ShoppingCartIcon />
                </span>
              </span>
              {this.renderSignIn()}
              <button
                className="product_btn"
                onClick={this.addToBasket}
                disabled={this.state.isShow}
              >
                {" "}
                {!this.state.modal ? "Add  to cart " : "Already in cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
