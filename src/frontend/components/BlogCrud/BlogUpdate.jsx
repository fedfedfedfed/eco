import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../Header/Header';

const BlogUpdate = (props) => {
  const { blogId } = useParams();
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
  useEffect(() => {
    const fetchVideoTutorials = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/blogs/${blogId}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchVideoTutorials();
  }, [blogId]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    if(validateInput()) {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/api/blogs`, formData);
      console.log(response.data);
      navigate('/manage-blogs');
    } catch (error) {
      console.error('Error updating recipe:', error);
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
    <div className="update-recipe-container">
      <Header userRole={props.userRole} setUserRole={props.setUserRole}/>
      <h2 className='recipes-title'>Update Video Tutorial</h2>
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
        <div className='update_btns_wrapper'>
          <Link to={`/manage-blogs`} className="update">
            <button type="button" className='cancel-btn'>
              Cancel
            </button>
          </Link>
          <button className='update_btn' type="submit">
            Update Video Tutorial
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogUpdate;