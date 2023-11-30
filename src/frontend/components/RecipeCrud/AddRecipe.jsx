// AddRecipe.js

import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
const AddRecipe = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    cousine: '',
    difficultyLevel: '',
    imageUrl: '',
    cookingTime: 0,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/api/recipes', formData);
      navigate('/manage-recipes'); // Redirect to the recipes page after adding a recipe
    } catch (error) {
      console.error('Error creating recipe:', error);
    }
  };

  return (
    <div className="add-recipe-container">
        <Header />
      <h2 className='recipes-title'>Add Recipe</h2>
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
      <option value="">Select Cuisine</option>
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
            <option value="">Select Difficulty</option>
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
  );
};

export default AddRecipe;






