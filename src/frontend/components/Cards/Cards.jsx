import React from 'react';
import Filters from '../Filters/Filters';
import CardsGrid from '../CardsGrid/CardsGrid';
import './cards.css';
import PopUp from '../PopUp/PopUp';
const Cards = () => {
  return (
    <div className="cards">
      {/*<Filters />*/}
      <CardsGrid />
    </div>
  );
};

export default Cards;