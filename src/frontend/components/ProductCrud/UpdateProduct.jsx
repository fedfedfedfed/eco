

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../Header/Header';
const UpdateProduct = (props) => {
    const { productId } = useParams();
    const navigate = useNavigate();
  
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      imageUrl: '',
      price: 0.0,
      isAvailable: false,
    });
    const [validationErrors, setValidationErrors] = useState({
      title: '',
      imageUrl: '',
    });
    useEffect(() => {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/products/${productId}`);
          setFormData(response.data);
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };
  
      fetchProduct();
    }, [productId]);
  
    const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleUpdate = async (e) => {
        e.preventDefault();
        if (validateInput()) {
      try {
        const response =  await axios.put(`http://localhost:8080/api/products`, formData);
        console.log(response.data);
        navigate('/manage-products');
      } catch (error) {
        console.error('Error updating product:', error);
      }
    }
    };
    const validateInput = () => {
      let isValid = true;
      const errors = {};
  
      if (!/^[A-Za-z\s]+$/.test(formData.title)) {
        isValid = false;
        errors.title = 'Only letters and spaces are allowed';
      }
  
      if (!/^https?:\/\//.test(formData.imageUrl)) {
        isValid = false;
        errors.imageUrl = 'Image URL must start with http:// or https://';
      }
  
      setValidationErrors(errors);
      return isValid;
    };
  return (
    
    <div className="add-recipe-container">
        <Header userRole={props.userRole} setUserRole={props.setUserRole}/>
      <h2 className='recipes-title'>Update Product</h2>
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
      {validationErrors.title && (
            <div className="error-message">{validationErrors.title}</div>
          )}
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

<div className="dropdown-container">
  <label htmlFor="dropdown">Availability</label>
  <div className="custom-dropdown">
    <select 
    id="isAvailable"
    name="isAvailable"
    value={formData.isAvailable}
    onChange={handleInputChange}
    required>
      <option value="">Select Availability</option>
      <option value="EASY">True</option>
    <option value="INTERMEDIATE">False</option>
    </select>
  </div>
</div>

  
</div>

<div className="form-group">
  <label htmlFor="price">Price</label>
  <input
    type="number"
    id="price"
    name="price"
    value={formData.price}
    onChange={handleInputChange}
    required
    min="0.01"
    step="0.01"
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
      <div className='update_btns_wrapper'>
      <Link to={`/manage-products`} className="update">
              <button type="button" className='cancel-btn'>
                Cancel
              </button>
            </Link>
      <button className='update_btn' type="submit">Update Product</button>
      </div>
    </form>
    </div>
  );
};

export default UpdateProduct;







