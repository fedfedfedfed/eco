import React from 'react';
import './herosection.css';
import './buttons.css';
import './popup.js';

const HeroSection = () => {
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

        {/* Second block with swiper photo */}
        <div className="hero-card">
          <div className="chief">
            <img
              className="chief-photo"
              src="https://tasty-treats-backend.p.goit.global/HestonChan.webp"
              alt="Chief"
            />
          </div>
          <div className="dish">
            <img
              className="dish-photo"
              src="https://tasty-treats-backend.p.goit.global/previewDish1.webp"
              alt="dish"
            />
            <h2 className="dish-name">Grilled, smoky, delicious barbecue</h2>
            <p className="dish-area">Spanish</p>
          </div>
          <div className="cuisine-preview">
            <img
              className="cuisine-preview-photo"
              src="https://tasty-treats-backend.p.goit.global/imgDish1.webp"
              alt="Preview"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
