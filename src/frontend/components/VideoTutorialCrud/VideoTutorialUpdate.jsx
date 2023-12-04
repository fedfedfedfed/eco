import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../Header/Header';

const VideoTutorialUpdate = (props) => {
  const { video_tutorialId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoUrl: '',
    imageUrl: '',
  });
  const [validationErrors, setValidationErrors] = useState({
    videoUrl: '',
    imageUrl: '',
  });
  useEffect(() => {
    const fetchVideoTutorials = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/video-tutorials/${video_tutorialId}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching video tutorial:', error);
      }
    };

    fetchVideoTutorials();
  }, [video_tutorialId]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    if(validateInput()) {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/api/video-tutorials`, formData);
      console.log(response.data);
      navigate('/manage-video-tutorials');
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  }
  };
  const validateInput = () => {
    let isValid = true;
    const errors = {};

    if (!/^https?:\/\//.test(formData.videoUrl)) {
      isValid = false;
      errors.videoUrl = 'URL must start with http:// or https://';
    }

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
        {validationErrors.videoUrl && (
            <div className="error-message">{validationErrors.videoUrl}</div>
          )}
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
          <Link to={`/manage-video-tutorials`} className="update">
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

export default VideoTutorialUpdate;