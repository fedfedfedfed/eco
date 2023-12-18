import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import './BlogCrud.css'

const BlogAdd = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tag: '',
    createdBy: 'Admin',
    commentsAmount: 0,
    imageUrl: '',
  });
  const [validationErrors, setValidationErrors] = useState({
    imageUrl: '',
  });
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(validateInput()) {
    try {
      await axios.post('http://localhost:8080/api/blogs', formData);
      navigate('/manage-blogs'); 
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  }
  };
  const validateInput = () => {
    let isValid = true;
    const errors = {};
    if (!/^https?:\/\//.test(formData.imageUrl)) {
      isValid = false;
      errors.imageUrl = 'URL must start with http:// or https://';
    }

    setValidationErrors(errors);
    return isValid;
  };
  return (
    <div className="add-recipe-container">
      <Header userRole={props.userRole} setUserRole={props.setUserRole}/>
      <div className="recipe-container">
      <h2 className='recipes-title'>Add Blog</h2>
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
        {validationErrors.imageUrl && (
            <div className="error-message">{validationErrors.imageUrl}</div>
          )}
        
        <div className="form-group">
          <label htmlFor="title">Tag:</label>
          <input
            type="text"
            id="tag"
            name="tag"
            value={formData.tag}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Created By:</label>
          <input
            type="text"
            id="createdBy"
            name="createdBy"
            value={formData.createdBy}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Comments Amount:</label>
          <input
            type="text"
            id="commentsAmount"
            name="commentsAmount"
            value={formData.commentsAmount}
            onChange={handleInputChange}
            required
          />
        </div>
        <button className='add_btn' type="submit">Add Blog</button>
      </form>
    </div>
    </div>
  );
};

export default BlogAdd;