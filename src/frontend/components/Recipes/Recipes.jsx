import React from 'react';
import Aside from '../Aside/Aside'; 
import Cards from '../Cards/Cards'; 
import './recipes.css'
const Recipes = () => {
  return (
    <section className="recipes">
      <div className="container">
        <Aside />
        <Cards />
      </div>
    </section>
  );
};

export default Recipes;
