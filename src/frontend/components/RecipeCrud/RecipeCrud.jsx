import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './RecipeCrud.css';
import Header from '../Header/Header'

const RecipeCrud = () => {
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
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/recipes');
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/api/recipes', formData);
      fetchRecipes();
      setFormData({
        title: '',
        description: '',
        cousine: '',
        difficultyLevel: '',
        imageUrl: '',
        cookingTime: 0,
      });
    } catch (error) {
      console.error('Error creating recipe:', error);
    }
  };

  const handleUpdate = async () => {
    if (!selectedRecipe) return;
  
    try {
      const updatedRecipe = {
        ...selectedRecipe,
        ...formData,
      };
  
      console.log('Before update request');
      await axios.put(
        `http://localhost:8080/api/recipes/${selectedRecipe.id}`,
        updatedRecipe
      );
      console.log('After update request');
      fetchRecipes();
      closeModal();
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  };
  
  
  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/recipes/${id}`);
      fetchRecipes();
      setSelectedRecipe(null);
      closeModal();
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
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
              <Header />
    <div className="recipe-container">
      <div className="header_wrapper">
        <div>
      <h1 className='recipes-title'>Recipes</h1>
      </div>
      {/*<a classNamem="add" href='#open-modal'><span>+</span></a>*/}
      <Link to="/manage-recipes/add-recipe" className="add">
            <span>+</span>
          </Link>

      <div id="open-modal" className="modal-window">
  <div>
    <a href="#" title="Close" className="modal-close">&#10006;</a>

    <form className="recipe-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
      </div>


      <div className="form-group">
  <label htmlFor="cuisine">Cuisine:</label>
  <div className="custom-dropdown">
    <select
      id="cuisine"
      name="cousine"
      value={formData.cousine}
      onChange={handleInputChange}
      required
    >
      <option value="AMERICAN">AMERICAN</option>
      <option value="ITALIAN">ITALIAN</option>
      <option value="MEXICAN">MEXICAN</option>
      <option value="ASIAN">ASIAN</option>
      <option value="INDIAN">INDIAN</option>
      <option value="FRENCH">FRENCH</option>
      <option value="CHINESE">CHINESE</option>
      <option value="JAPANESE">JAPANESE</option>
      <option value="KOREAN">KOREAN</option>
      <option value="GREEK">GREEK</option>
      <option value="SPANISH">SPANISH</option>
      <option value="GERMAN">GERMAN</option>
      <option value="BRITISH">BRITISH</option>
      <option value="OTHER">OTHER</option>
    </select>
  </div>
</div>


      

      <div className="form-group">

      <div className="dropdown-container">
        <label htmlFor="dropdown">Difficulty Level:</label>
        <div className="custom-dropdown">
          <select 
          id="difficultyLevel"
          name="difficultyLevel"
          value={formData.difficultyLevel}
          onChange={handleInputChange}
          required>
            <option value="EASY">EASY</option>
          <option value="INTERMEDIATE">INTERMEDIATE</option>
          <option value="ADVANCED">ADVANCED</option>
          </select>
        </div>
      </div>

        
      </div>

      <div className="form-group">
        <label htmlFor="cookingTime">Cooking Time:</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          value={formData.cookingTime}
          onChange={handleInputChange}
          required
          min="1"
          max="180"
        />
      </div>

      <div className="form-group">
        <label htmlFor="imageUrl">Image URL:</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleInputChange}
          required
        />
      </div>

      <button className='add_btn' type="submit">Add Recipe</button>
    </form>

      </div>
    </div>


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
            <div className="crud_btns">
            <Link to={`/manage-recipes/update-recipe/${selectedRecipe.id}`} className="update">
              <button type="button" className='update-btn' onClick={handleUpdate}>
                Update
              </button>
            </Link>

              
              <button type="button" className='delete-btn' onClick={() => handleDelete(selectedRecipe.id)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form for adding and updating recipes */}
      {/* Form for updating recipes */}
      
    </div>
    </div>
  );
};

export default RecipeCrud;
