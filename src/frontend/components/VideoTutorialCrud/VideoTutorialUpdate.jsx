import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../Header/Header';

const VideoTutorialUpdate = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    cousine: '',
    difficultyLevel: '',
    imageUrl: '',
    cookingTime: 0,
  });

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/recipes/${recipeId}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/recipes/${recipeId}`, formData);
      navigate('/manage-recipes'); // Перенаправляємо на сторінку рецептів після оновлення рецепту
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  };

  return (
    <div className="add-recipe-container">
      <Header />
      <h2 className='recipes-title'>Update Recipe</h2>
      <form className="recipe-form" onSubmit={handleUpdate}>
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
              {/* Додайте інші кухні за необхідністю */}
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
                required
              >
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
        <div className='update_btns_wrapper'>
          <Link to={`/manage-recipes`} className="update">
            <button type="button" className='cancel-btn'>
              Cancel
            </button>
          </Link>
          <button className='update_btn' type="submit">
            Update Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default VideoTutorialUpdate;
