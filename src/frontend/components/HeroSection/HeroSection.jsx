import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './herosection.css';
import './buttons.css';
import './popup.js';

const HeroSection = () => {
  const chiefPhotoUrl = 'https://tasty-treats-backend.p.goit.global/imgDish1.webp';
  const dishPhotoUrl = 'https://tasty-treats-backend.p.goit.global/previewDish1.webp';
  const cuisinePreviewPhotoUrl = 'https://tasty-treats-backend.p.goit.global/imgDish1.webp';

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-title">
          <h1>
            Learn to Cook
            <span className="hero-title-accent">Tasty Treats'</span> Customizable
            Masterclass
          </h1>
          <p className="hero-title-text">
            TastyTreats - Customize Your Meal with Ingredient Options and
            Step-by-Step Video Guides.
          </p>
          <button
            className="hero-btn-order btn btn-outline"
            type="button"
            data-order-popup-open
          >
            Order now
          </button>
        </div>

        <Slider {...settings}>
        <div className="hero-card">
            <div className="cuisine-preview">
              <img
                className="cuisine-preview-photo"
                src={cuisinePreviewPhotoUrl}
                alt="Preview"
              />
            </div>
          </div>
          <div className="hero-card">
            <div className="dish">
              <img
                className="dish-photo"
                src={dishPhotoUrl}
                alt="dish"
              />
              <h2 className="dish-name">Grilled, smoky, delicious barbecue</h2>
              <p className="dish-area">Spanish</p>
            </div>
          </div>
          <div className="hero-card">
            <div className="cuisine-preview">
              <img
                className="cuisine-preview-photo"
                src={cuisinePreviewPhotoUrl}
                alt="Preview"
              />
            </div>
          </div>
        </Slider>
      </div>
    </section>
  );
};

export default HeroSection;
