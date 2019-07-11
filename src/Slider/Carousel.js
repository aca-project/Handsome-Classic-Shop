import React from "react";
import ImageSlide from "./ImageSlide";
import "../Styles.css";

const imgUrls = [
  "http://jbsuits.com/blog/wp-content/uploads/2015/01/10-best-places-to-wear-a-suit.jpg",
  "https://splendorandarrow.com/wp-content/uploads/slider-main-07.jpg",
  "http://www.donscreation.com/wp-content/uploads/2014/07/new1.jpg",
  "https://cdn3.yoox.biz/cloud/karlwp/uploads/2019/01/Post-Standard-Feature-Image-1.jpg",
  "https://brightcove04pmdo-a.akamaihd.net/1268729919001/1268729919001_5861112994001_5861110814001-vs.jpg?pubId=1268729919001&videoId=5861110814001"
];

class Carousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentImageIndex: 0,
      carouselCaptions: 0
    };
  }

  captionAnimation = () => {
    let caption = document.querySelector(".caption");

    setInterval(function() {
      if (caption) {
        caption.classList.add("animate-top");
      }
    }, 1000);

    setInterval(function() {
      if (caption.classList.contains("animate-top")) {
        caption.classList.remove("animate-top");
      }
    }, 15000);
  };

  nextSlide = () => {
    const lastIndex = imgUrls.length - 1;
    const { currentImageIndex } = this.state;
    const shouldResetIndex = currentImageIndex === lastIndex;
    const index = shouldResetIndex ? 0 : currentImageIndex + 1;

    this.setState({
      currentImageIndex: index
    });
  };

  componentDidMount() {
    this.timerID = setInterval(this.nextSlide, 4000);
    this.captionAnimation();
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return (
      <div className="carousel">
        <ImageSlide url={imgUrls[this.state.currentImageIndex]} />
        <div className="caption">
          <div className="carousel_caption carousel_caption--top">
            <p>Just find what works for you, what style suits you best,</p>
          </div>
          <div className="carousel_caption carousel_caption--bottom">
            <p>and just be confident enough to rock it!</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Carousel;
