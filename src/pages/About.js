import React, { Component } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Author1 from "../images/author-1.jpg";
import Author2 from "../images/author-2.jpg";
import Author3 from "../images/author-3.jpg";
import linkedin from "../images/linkedin.png";
import Git from "../images/Git.png";

class About extends Component {
  state = {
    author1: {
      name: "Nune Aramyan",
      img:
        "https://legaltechnology-compass.com/wp-content/uploads/2018/04/Max-Mustermann-Legal-Technology-Compass-web.jpg",
      info:
        "Besides achiving perfection on what she does, loves watching friends and drinking mint tea"
    }
  };
  render() {
    return (
      <div>
        <Header />
        <div className="shp-main-cnt shp-main-cnt--about">
          <div className="about-img-container">
            <div className="about-img-caption">
              <h2>
                Follow us... <br /> Keep it Classic!
              </h2>
              <div className="about-info">
                <p>
                  Handsome Classic was founded upon the idea that customers
                  deserve a better platform to explore and purchase products
                </p>
              </div>
            </div>
          </div>

          <div className="authors">
            <h2 className="authors_title">Meet our /Handsome Classic/ Team</h2>

            <div className="shp-row">
              <div className="shp-col-md-4 shp-col-sm-6">
                <div className="product authors_author">
                  <h2 className="product_title authors_top-name main-transition">
                    Vahe Poghosyan
                  </h2>
                  <div className="product_img-holder">
                    <img src={Author1} className="product_img" alt="" />
                  </div>
                  <div className="product_content authors_content-about main-transition">
                    <h2 className="product_title">Vahe Poghosyan</h2>
                    <p className="product_info">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Nihil, quidem. tea
                    </p>
                  </div>
                  <div>
                  </div>
                </div>
              </div>
              <div className="shp-col-md-4 shp-col-sm-6">
                <div className="product authors_author">
                  <h2 className="product_title authors_top-name main-transition">
                    Gevorg Mehrabyan
                  </h2>
                  <div className="product_img-holder">
                    <img src={Author3} className="product_img" alt="" />
                  </div>
                  <div className="product_content authors_content-about main-transition">
                    <h2 className="product_title">Gevorg Mehrabyan</h2>
                    <p className="product_info">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Nihil, quidem. tea
                    </p>
                  </div>
                  <div>
                  </div>
                </div>
              </div>
              <div className="shp-col-md-4 shp-col-sm-6">
                <div className="product authors_author">
                  <h2 className="product_title authors_top-name main-transition">
                    Nune Aramyan
                  </h2>
                  <div className="product_img-holder">
                    <img src={Author2} className="product_img" alt="" />
                  </div>
                  <div className="product_content authors_content-about main-transition">
                    <h2 className="product_title">Nune Aramyan</h2>
                    <p className="product_info">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Nihil, quidem. tea
                    </p>
                  </div>
                  <div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default About;
