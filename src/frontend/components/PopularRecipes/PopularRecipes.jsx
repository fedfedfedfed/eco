import React from 'react';
import './popularrecipes.css';
const PopularCategories = () => {
  return (
    <div className="popular-categories">
      <h2 className="popular-recipes">Popular recipes</h2>
      <ul className="popular-list">
        <li className="popular-recipes-list">
          <img
            className="img-popular"
            src="./img/popular recipes/french_omlet.jpg"
            alt=""
            width="64px"
            height="64px"
          />
          <div className="popular-card">
            <h3 className="popular-title">Chocolate Gateau</h3>
            <p className="popular-text">
              A French dessert consisting of layers of chocolate sponge cake and
              chocolate ganache, typically topped with chocolate glaze and chocolate
              decorations.
            </p>
          </div>
        </li>

        <li className="popular-recipes-list">
          <img
            className="img-popular"
            src="./img/popular recipes/squash_linguine.jpg"
            alt=""
          />
          <div className="popular-card">
            <h3 className="popular-title">Irish stew</h3>
            <p className="popular-text">
              A traditional Irish dish made with lamb, potatoes, carrots, onions,
              and herbs, cooked in a broth or gravy.
            </p>
          </div>
        </li>

        <li className="popular-recipes-list">
          <img
            className="img-popular"
            src="./img/popular recipes/sugar_pie.jpg"
            alt=""
          />
          <div className="popular-card">
            <h3 className="popular-title">Mediterranean Pasta Salad</h3>
            <p className="popular-text">
              A salad made with pasta, vegetables (such as tomatoes, cucumbers, and
              olives), feta cheese, and a dressing made with olive oil and lemon
              juice.
            </p>
          </div>
        </li>

        <li className="popular-recipes-list">
          <img
            className="img-popular"
            src="./img/popular recipes/baked_salmon.jpg"
            alt=""
          />
          <div className="popular-card">
            <h3 className="popular-title">Burek</h3>
            <p className="popular-text">
              Burek is a traditional Balkan pastry made with phyllo dough and a
              savory filling, usually of meat, cheese, or vegetables. It's a popular
              street food in the region and can be enjoyed as a snack or a meal.
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default PopularCategories;
