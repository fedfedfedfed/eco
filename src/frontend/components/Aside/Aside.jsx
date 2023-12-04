import React from 'react';
import Categories from '../Categories/Categories';
import PopularRecipes from '../PopularRecipes/PopularRecipes';
import './aside.css';
const Aside = () => {
  return (
    <aside className="aside">

      <PopularRecipes />
    </aside>
  );
};

export default Aside;