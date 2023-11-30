import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import './RecipeCrud.css'
const VideoTutorialAdd = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoUrl: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Використовуємо URL для відеоуроків
      await axios.post('http://localhost:8080/api/video-tutorials', formData);
      navigate('/manage-video-tutorials'); // Перенаправляємо на сторінку відеоуроків після додавання відеоуроку
    } catch (error) {
      console.error('Error creating video tutorial:', error);
    }
  };

  return (
    <div className="add-recipe-container">
      <Header />
      <div className="recipe-container">
      <h2 className='recipes-title'>Add Video Tutorial</h2>
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
          <label htmlFor="videoUrl">Video URL:</label>
          <input
            type="text"
            id="videoUrl"
            name="videoUrl"
            value={formData.videoUrl}
            onChange={handleInputChange}
            required
          />
        </div>

        <button className='add_btn' type="submit">Add Video Tutorial</button>
      </form>
    </div>
    </div>
  );
};

export default VideoTutorialAdd;
