import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import './ChefCrud.css';

const AddChef = (props) => {
    const navigate = useNavigate();
  
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      experience: 0,
      biography: '',
      imageUrl: '',
    });
  
    const [validationErrors, setValidationErrors] = useState({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      experience: '',
    });
  
    const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (validateInput()) {
        try {
          await axios.post('http://localhost:8080/api/chefs', formData);
          navigate('/manage-chefs'); // Redirect to the chefs page after adding a chef
        } catch (error) {
          console.error('Error creating chef:', error);
        }
      }
    };
  
    const validateInput = () => {
      let isValid = true;
      const errors = {};
  
      
      if (!/^[A-Za-z]+$/.test(formData.firstName)) {
        isValid = false;
        errors.firstName = 'Only letters are allowed';
      }
  
      
      if (!/^[A-Za-z]+$/.test(formData.lastName)) {
        isValid = false;
        errors.lastName = 'Only letters are allowed';
      }
  
      
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        isValid = false;
        errors.email = 'Invalid email address';
      }
  
      
      if (!/^\d+$/.test(formData.phoneNumber)) {
        isValid = false;
        errors.phoneNumber = 'Only digits are allowed';
      }
  
      
      if (!/^\d+$/.test(formData.experience)) {
        isValid = false;
        errors.experience = 'Only digits are allowed';
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
        <h2 className='recipes-title'>Add Chef</h2>
        <div className="form-container">
          <form className="recipe-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            {validationErrors.firstName && (
            <div className="error-message">{validationErrors.firstName}</div>
          )}
            <div className="form-group">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            {validationErrors.lastName && (
            <div className="error-message">{validationErrors.lastName}</div>
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
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            {validationErrors.email && (
            <div className="error-message">{validationErrors.email}</div>
          )}
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            {validationErrors.phoneNumber && (
            <div className="error-message">{validationErrors.phoneNumber}</div>
          )}
            <div className="form-group">
              <label htmlFor="experience">Experience:</label>
              <input
                type="number"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                required
                min="0"
              />
            </div>
            {validationErrors.experience && (
            <div className="error-message">{validationErrors.experience}</div>
          )}
            <div className="form-group">
              <label htmlFor="biography">Biography:</label>
              <textarea
                id="biography"
                name="biography"
                value={formData.biography}
                onChange={handleInputChange}
                required
              />
            </div>

            <button className='add_btn' type="submit">Add Chef</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddChef;