import React, { Component } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import firebase from "firebase";
import Product from "../Components/Product";
import CircularProgress from '@material-ui/core/CircularProgress';


export class Suits extends Component {
    constructor(props) {
        super(props);

        this.state = {
            suits: [],
            showArray: [],
            loader: false

        };
    }

    btnClick = (e, name) =>{
        let start = 0 , end = 0;
        let array = [];
        switch (name) {
            case '2':
                start = 4 ;
                end = 10;
                break;
            default:
                start = 0 ;
                end = 4;
        }

        for(let i = start; i < end; ++i){
            array.push(this.state.suits[i]);
        }
        this.setState({
            showArray: array
        })
    }

    componentDidMount() {
        this.setState({
            loader: true
        })
        const db = firebase.firestore();
        db.collection("products")
            .get()
            .then(snapshot => {
                const product = snapshot.docs.map(doc => doc.data());
                this.setState({ suits: product.filter(item => item.category === "suits") , loader: false});
                
                this.btnClick();
            });
    }

    render() {
        return (
            <div>
                <Header />
                {(this.state.loader) && <CircularProgress color ={'inherit'} size = {50} className= "load" disableShrink />}
                <div className="shp-main-cnt">
                    <div className="shp-container-fluid">
                        <div className="shp-row">
                            {this.state.showArray.map(k => (<Product item = {k} /> ))}
                        </div>
                        <div className="pagination">
                            <button
                                className="pagination_item main-transition"
                                onClick={event => this.btnClick(event, "1")}
                            >
                                1
                            </button>
                            <button
                                className="pagination_item main-transition"
                                onClick={event => this.btnClick(event, "2")}
                            >
                                2
                            </button>
                        </div>
                    </div>
                </div>
                <Footer />

            </div>
        );
    }
}

export default Suits;