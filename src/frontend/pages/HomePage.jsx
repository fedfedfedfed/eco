import React from 'react';
import Header from '../components/Header/Header';
import ModalOrder from '../components/ModalOrder/ModalOrder';
import PopUp from '../components/PopUp/PopUp';
import HeroSection from '../components/HeroSection/HeroSection';
import Recipes from '../components/Recipes/Recipes';
import '../components/modern-normalize.css';
import './HomePage.css'
const HomePage = (props) => {
  return (
    <div className="App">
      <Header userRole={props.userRole} setUserRole={props.setUserRole} />
      
      <div className="about-us">
      <h2 className="text-wrapper">100% Trusted Organic Food Store</h2>
      <p className="div">
        Morbi porttitor ligula in nunc varius sagittis. Proin dui nisi, laoreet ut tempor ac, cursus vitae eros. Cras
        quis ultricies elit. Proin ac lectus arcu. Maecenas aliquet vel tellus at accumsan. Donec a eros non massa
        vulputate ornare. Vivamus ornare commodo ante, at commodo felis congue vitae.
      </p>
      
      <img className="image" alt="Image" src='https://npr.brightspotcdn.com/dims4/default/4d0d244/2147483647/strip/true/crop/878x593+0+0/resize/880x594!/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F31%2Fdb%2F7e1d395a445fba229e9696a3a7e4%2Ffarmer-lee-jones.jpg' />
    </div>
      
      <Recipes />
      
    </div>
  );
}

export default HomePage;