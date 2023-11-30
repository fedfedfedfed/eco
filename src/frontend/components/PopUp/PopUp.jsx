// PopUp.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './popup.css';
import './buttons.css';
import '../RecipeCrud/RecipeCrud.css';

const ITEMS_PER_PAGE = 9;

const PopUp = ({ currentPage, handlePageChange }) => {
  const [recipes, setRecipes] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    cousine: '',
    difficultyLevel: '',
    imageUrl: '',
    cookingTime: 0,
  });
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [containerStyle, setContainerStyle] = useState({
    backgroundColor: '',
  });

  useEffect(() => {
    fetchRecipes();
  }, [currentPage]);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/recipes?page=${currentPage}&perPage=${ITEMS_PER_PAGE}`);
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };
  

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSeeMore = (recipe) => {
    setSelectedRecipe(recipe);

    if (recipe.difficultyLevel === "EASY") {
      setContainerStyle({ backgroundColor: "#51cf66" });
    } else if (recipe.difficultyLevel === "INTERMEDIATE") {
      setContainerStyle({ backgroundColor: "#ffd43b" });
    } else {
      setContainerStyle({ backgroundColor: "red" });
    }

    setFormData(recipe);
    openModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
    document.body.classList.add('modal-open'); // Add class to body
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
    setFormData({
      title: '',
      description: '',
      cousine: '',
      difficultyLevel: '',
      imageUrl: '',
      cookingTime: 0,
    });
    document.body.classList.remove('modal-open'); // Remove class from body
  };

  const truncateDescription = (description) => {
    const words = description.split(' ');

    // Take the first two lines (assuming each line has a maximum of 10 words)
    const truncatedDescription = words.slice(0, 10).join(' ') + "...";

    return truncatedDescription;
  };

  return (
    <div className='wrapper'>
      <div className="recipe-container">
        <div className="header_wrapper">
          {/*<a classNamem="add" href='#open-modal'><span>+</span></a>*/}
        </div>
        <ul className='recipe_wrapper'>
          {recipes.map((recipe) => (
            <li
              key={recipe.id}
              className="recipe-card"
            >
              <div className="recipe-details">
                <img src={recipe.imageUrl} alt={recipe.title} className="recipe-image" />
                <h3 className="recipe_title">{recipe.title}</h3>
                <p className='recipe-description'>{truncateDescription(recipe.description)}</p>
                <a
                  className="see-more"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSeeMore(recipe);
                  }}
                  href={`#recipe-modal-${recipe.id}`}
                >
                  See recipe
                </a>
              </div>
            </li>
          ))}
        </ul>

        {/* Modal for displaying full recipe information */}
        {selectedRecipe && (
          <div id={`recipe-modal-${selectedRecipe.id}`} className="modal">
            <div className="modal__content">
              <h2 className='modal_title'>{selectedRecipe.title}</h2>
              <img
                src={selectedRecipe.imageUrl}
                alt={selectedRecipe.title}
                className="modal-image"
              />
              <div className='modal_icon_wrapper'>
                <p style={containerStyle} className="modal_difficulty" >{selectedRecipe.difficultyLevel}</p>
                <div className='modal_icon_subwrapper'>
                  <p className='modal_cousine'>#{selectedRecipe.cousine}</p>
                  <p className='modal_cook_time'><i className="fas fa-clock clock-icon"></i>{selectedRecipe.cookingTime} min</p>
                </div>
              </div>
              <p className='modal_description'>{selectedRecipe.description}</p>

              <button className="modal__close" onClick={closeModal}>
                &#10006;
              </button>
            </div>
          </div>
        )}

        <div className="pag-wrap">
          <div className="btns-pages">
            {Array.from({ length: Math.ceil(recipes.length / ITEMS_PER_PAGE) }, (_, index) => (
              <div key={index + 1} className="pag-page-btn pag-btn" onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
