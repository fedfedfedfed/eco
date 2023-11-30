import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import './ChefCrud.css';

const AddChef = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    experience: 0,
    biography: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/api/chefs', formData);
      navigate('/manage-chefs'); // Redirect to the chefs page after adding a chef
    } catch (error) {
      console.error('Error creating chef:', error);
    }
  };

  return (
    <div className="wrapper">
      <Header />
      <div className="recipe-container">
        <h2 className='recipes-title'>Add Chef</h2>
        <div className="form-container">
          <form className="recipe-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="first_name">First Name:</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="last_name">Last Name:</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                required
              />
            </div>

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

            <div className="form-group">
              <label htmlFor="phone_number">Phone Number:</label>
              <input
                type="text"
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                required
              />
            </div>

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
