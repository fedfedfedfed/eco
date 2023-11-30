import React from 'react';
import './categories.css';
import './buttons.css';
const Categories = () => {
  return (
    <div className="categories">
      <button className="btn btn-outline-gray">All categories</button>
      <div className="categories-block">
        <ul className="categories-list">
          <li className="categories-element">
            <a href="" className="categories-element-text">Breakfast</a>
          </li>
          <li className="categories-element">
            <a href="" className="categories-element-text">Chicken</a>
          </li>
          <li className="categories-element">
            <a href="" className="categories-element-text">Dessert</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Categories;
