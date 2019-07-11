import React, { Component } from "react";
import Header from "../Components/Header";
import Carousel from "../Slider/Carousel";

export class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <main>
          <Carousel />
        </main>
      </div>
    );
  }
}

export default Home;
