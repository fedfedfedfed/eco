import React from 'react';
import Header from '../components/Header/Header';
import ModalOrder from '../components/ModalOrder/ModalOrder';
import PopUp from '../components/PopUp/PopUp';
import HeroSection from '../components/HeroSection/HeroSection';
import Recipes from '../components/Recipes/Recipes';
import '../components/modern-normalize.css';

const HomePage = (props) => {
  return (
    <div className="App">
      <Header userRole={props.userRole} setUserRole={props.setUserRole} />
      
      <HeroSection />

      <Recipes />
      
    </div>
  );
}

export default HomePage;