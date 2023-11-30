import React from 'react';
import './popularrecipes.css';
const PopularCategories = () => {
  return (
    <div className="popular-categories">
      <h2 className="popular-recipes">Interesting facts</h2>
      <ul className="popular-list">
        <li className="popular-recipes-list">
          <div className="popular-card">
            <h3 className="popular-title">Maillard Reaction:</h3>
            <p className="popular-text">
            The Maillard reaction is a complex chemical reaction that occurs between amino acids and reducing sugars when heat is applied. This reaction is responsible for the browning of food and the development of complex flavors and aromas. It's the reason why grilled meat, baked bread, and roasted coffee beans have such rich and appealing flavors.
            </p>
          </div>
        </li>

        <li className="popular-recipes-list">
          <div className="popular-card">
            <h3 className="popular-title">Umami - The Fifth Taste:</h3>
            <p className="popular-text">
            Umami is often considered the fifth taste, alongside sweet, salty, sour, and bitter. Discovered by Japanese chemist Kikunae Ikeda, umami is described as a savory or meaty taste. Foods rich in umami include tomatoes, Parmesan cheese, soy sauce, and mushrooms. Understanding and balancing umami can enhance the overall flavor profile of a dish.
            </p>
          </div>
        </li>

        <li className="popular-recipes-list">
          <div className="popular-card">
            <h3 className="popular-title">Historical Evolution of Spices:</h3>
            <p className="popular-text">
            Spices have played a crucial role in the history of cooking. During the Middle Ages, spices such as pepper, cinnamon, and cloves were highly prized and considered a symbol of wealth. They were used not only to flavor food but also to preserve it. The spice trade routes were a major driver of exploration and global trade.
            </p>
          </div>
        </li>

        <li className="popular-recipes-list">
          <div className="popular-card">
            <h3 className="popular-title">Molecular Gastronomy:</h3>
            <p className="popular-text">
            Molecular gastronomy is a scientific approach to cooking that explores the physical and chemical transformations that occur during food preparation. Chefs practicing molecular gastronomy often use techniques such as spherification, foaming, and liquid nitrogen to create innovative and visually stunning dishes. Ferran Adrià of elBulli in Spain is considered one of the pioneers of this culinary movement.
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default PopularCategories;
