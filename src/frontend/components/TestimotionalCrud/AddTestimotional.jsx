import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import './TestimonialCrud.css';

const AddTestimonial = (props) => {
    const navigate = useNavigate();
  
    const [formData, setFormData] = useState({
      description: '',
      imageUrl: '',
      fullName: '',
      role: '',
      stars: 0,
    });
  
    const [validationErrors, setValidationErrors] = useState({
      imageUrl: '',
      fullName: '',
      role: '',
    });
  
    const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (validateInput()) {
        try {
          await axios.post('http://localhost:8080/api/testimonials', formData);
          navigate('/manage-testimonials'); // Redirect to the chefs page after adding a chef
        } catch (error) {
          console.error('Error creating testimonial:', error);
        }
      }
    };
  
    const validateInput = () => {
      let isValid = true;
      const errors = {};
  
      
      if (!/^[A-Za-z]+$/.test(formData.role)) {
        isValid = false;
        errors.role = 'Only letters are allowed';
      }
      if (!/^https?:\/\//.test(formData.imageUrl)) {
      isValid = false;
      errors.imageUrl = 'Image Url must start with http:// or https://';
    }
  
      setValidationErrors(errors);
      return isValid;
    };
  
    
  return (
    <div className="wrapper">
      <Header userRole={props.userRole} setUserRole={props.setUserRole}/>

      <div className="recipe-container">
        <h2 className='recipes-title'>Add Testimonial</h2>
        <div className="form-container">
          <form className="recipe-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">Full Name:</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
            {validationErrors.fullName && (
            <div className="error-message">{validationErrors.fullName}</div>
          )}
            <div className="form-group">
              <label htmlFor="lastName">Role:</label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                required
              />
            </div>
            {validationErrors.role && (
            <div className="error-message">{validationErrors.role}</div>
          )}
            <div className="form-group">
              <label htmlFor="imageUrl">Image:</label>
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
              <label htmlFor="email">Description:</label>
              <input
                type="text"
                id="description"
                name="description"
                
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Stars:</label>
              <input
                type="number"
                id="stars"
                name="stars"
                min={1}
                max={5}
                value={formData.stars}
                onChange={handleInputChange}
                required
              />
            </div>
            <button className='add_btn' type="submit">Add Testimonial</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTestimonial;