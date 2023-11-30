import React from 'react';
import Header from '../components/Header/Header';
import ModalOrder from '../components/ModalOrder/ModalOrder';
import PopUp from '../components/PopUp/PopUp';
import HeroSection from '../components/HeroSection/HeroSection';
import Recipes from '../components/Recipes/Recipes';
import '../components/modern-normalize.css';

const HomePage = () => {
  return (
    <div className="App">
      {/* Ваша компонента для шапки */}
      <Header />
      
      {/* Ваша компонента для категорій */}
      <HeroSection />

      {/* Ваша компонента для популярних рецептів */}
      <Recipes />
      
      {/* Ваша компонента для фільтрів */}
      {/*<ModalOrder />*/}
      
      {/* Ваша компонента для сітки рецептів */}
      
    </div>
  );
}

export default HomePage;