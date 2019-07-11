import React, { Component } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import firebase from "firebase";
import { Redirect } from "react-router-dom";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EndToBuy from "../Components/EndToBuy";

export class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      basketProduct: [],
      isIn: false,
      totalPrice: 0,
      count: 1,
      totalOfCount: 0
    };
  }

  handleChange = (i, prodId, currentItemCount, event) => {
    let count = parseInt(event.target.value);
    if (event.target.value === "") {
      count = currentItemCount;
      this.setState({
        count: count
      });
    } else {
      this.setState({
        count: count
      });
    }
    this.updateCount(prodId, this.state.basketProduct[i].count, count);
  };

  updateCount = (prodId, itemCount, count) => {
    const db = firebase.firestore();
    let docRef = db
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("basket");
    docRef.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        if (doc.data().id === prodId) {
          docRef.doc(doc.id).update({ count: count });
          this.setState({
            totalPrice:
              this.state.totalPrice +
              (count - doc.data().count) * parseInt(doc.data().price),
            totalOfCount: this.state.totalOfCount + (count - doc.data().count)
          });
        }
      });
    });
  };

  handleDelete = (i, prodId) => {
    const db = firebase.firestore();
    let docRef = db
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("basket");
    docRef.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        if (doc.data().id === prodId) {
          docRef.doc(doc.id).delete();
          const currentBasket = this.state.basketProduct;
          currentBasket.splice(i, 1);
          this.setState({
            basketProduct: currentBasket,
            totalPrice:
              this.state.totalPrice -
              doc.data().count * parseInt(doc.data().price),
            totalOfCount: this.state.totalOfCount - doc.data().count
          });
        }
      });
    });
  };

  // setRedirectBad =() =>{
  //     if(!firebase.auth().currentUser){
  //         this.setState({
  //             isIn: true
  //         })
  //     }
  // };

  redirectToSignIn = () => {
    if (this.state.isIn) {
      return <Redirect to="/sign-in" />;
    }
  };

  componentDidMount = () => {
    if (firebase.auth().currentUser) {
      const db = firebase.firestore();
      db.collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("basket")
        .get()
        .then(snapshot => {
          const basketProduct = snapshot.docs.map(doc => doc.data());
          this.setState({ basketProduct });
          let total = 0;
          let counting = 0;
          for (let i = 0; i < this.state.basketProduct.length; ++i) {
            total +=
              parseInt(this.state.basketProduct[i].price) *
              this.state.basketProduct[i].count;
            counting += this.state.basketProduct[i].count;
          }
          this.setState({
            totalPrice: total,
            totalOfCount: counting
          });
        });
    } else {
      this.setState({
        isIn: true
      });
    }
  };

  render() {
    const { basketProduct } = this.state;
    return (
      <div>
        <div className="shp-main-cnt ">
          {this.redirectToSignIn()}
          <div className="shp-container shp-container--cart">
            <Header total={this.state.totalOfCount} />
            {this.state.basketProduct.length === 0 ? (
              <div className="cart-empty-info">Your Cart is Empty </div>
            ) : (
              <div />
            )}
            <div className="shp-row">
              <div className="shp-col-md-7">
                <table className="cart-table">
                  {basketProduct.map((item, i) => (
                    <tr className="cart-table_row">
                      <td className="image-cell">
                        <div className="product_img-holder">
                          <img
                            className="product_img table-image"
                            src={item.image}
                            alt=""
                          />
                        </div>
                      </td>

                      <td className="info-cell">
                        <div>
                          <h4 className="cart-table_product-title">
                            {item.title}
                          </h4>
                        </div>
                        <div className="size">
                          <span className="si1">Color:</span>
                          <select>
                            <option value="option-1">Black</option>
                            <option value="option-2">Blue</option>
                            <option value="option-3">Brown</option>
                          </select>
                        </div>
                        {item.category === "shoes" ? (
                          <div className="size">
                            <span className="si2">Size:</span>
                            <select>
                              <option value="option-1"> 39 </option>
                              <option value="option-2"> 40 </option>
                              <option value="option-3"> 41 </option>
                              <option value="option-4"> 42 </option>
                              <option value="option-5"> 43 </option>
                            </select>
                          </div>
                        ) : (
                          <div className="size">
                            <span className="si2">Size:</span>
                            <select>
                              <option value="option-1"> S </option>
                              <option value="option-2"> M </option>
                              <option value="option-3"> L </option>
                              <option value="option-4"> XL </option>
                              <option value="option-5"> XXL </option>
                            </select>
                          </div>
                        )}

                        <div className="size">
                          <span className="si3">Count:</span>

                          <input
                            onChange={event =>
                              this.handleChange(i, item.id, item.count, event)
                            }
                            type="number"
                            className="input-count"
                            margin="normal"
                            min="1"
                            placeholder={item.count}
                          />
                        </div>
                      </td>

                      <td className="descr-cell">
                        <p>{item.description}</p>
                      </td>

                      <td className="price-cell">
                        <h2 className="total-price">{item.price}</h2>
                        <span className="cart_table-dlt-icon">
                          <DeleteForeverIcon
                            onClick={event =>
                              this.handleDelete(i, item.id, event)
                            }
                          />
                        </span>
                      </td>
                    </tr>
                  ))}
                </table>
              </div>
              {this.state.basketProduct.length === 0 ? (
                <div/>
              ) : (
                <div className="shp-col-md-4 offset-md-1">
                  <h2 className="checkout-price">
                    Total Price:{this.state.totalPrice}${" "}
                  </h2>
                  <div className="checkout-btn-outer">
                    <EndToBuy totalPrice={this.state.totalPrice} />
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default Cart;
