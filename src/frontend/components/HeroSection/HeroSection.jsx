import React from 'react';
import { useHistory, useNavigate } from 'react-router-dom';
import './herosection.css';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
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
            onClick={handleLoginClick}  
          >
            Log in
          </button>

        </div>
        <div className="chief">
          <img
            className="chief-photo"
            src="https://tasty-treats-backend.p.goit.global/HestonChan.webp"
            alt="Chief"
          />
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </section>
  );
};

export default HeroSection;
