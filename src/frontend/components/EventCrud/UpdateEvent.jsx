

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../Header/Header';

const UpdateEvent = (props) => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    imageUrl: '',
    eventName: '',
    eventType: '',
    dateTime: '',
    location: '',
    description: '',
    organizer: '',
    attendeesAmount: 0,
  });
  const [validationErrors, setValidationErrors] = useState({
    imageUrl: '',
    eventType: '',
  });
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/events/${eventId}`);
        const formattedDateTime = new Date(response.data.dateTime).toISOString().slice(0, 16);
      setFormData({ ...response.data, dateTime: formattedDateTime });
       
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    if (validateInput()) {
    e.preventDefault();
    try {
      const response = axios.put(`http://localhost:8080/api/events`, formData);
      console.log(response.data);
      navigate('/manage-events'); 
    } catch (error) {
      console.error('Error updating event:', error);
    }
  }
  };
  const validateInput = () => {
    let isValid = true;
    const errors = {};

    
    if (!/^https?:\/\//.test(formData.imageUrl)) {
      isValid = false;
      errors.imageUrl = 'Image URL must start with http:// or https://';
    }
    const validEventTypes = ['ONLINE', 'OFFLINE'];
    if (!validEventTypes.includes(formData.eventType.toUpperCase())) {
      isValid = false;
      errors.eventType = 'Event Type must be ONLINE or OFFLINE';
    }
    setValidationErrors(errors);
    return isValid;
  };
  return (
    <div className="update-recipe-container">
      <Header userRole={props.userRole} setUserRole={props.setUserRole}/>
      <h2 className='recipe-title'>Update Event</h2>
      <form className="recipe-form" onSubmit={handleUpdate}>
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
          <label htmlFor="eventName">Event Name:</label>
          <input
            type="text"
            id="eventName"
            name="eventName"
            value={formData.eventName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="eventType">Event Type:</label>
          <input
            type="text"
            id="eventType"
            name="eventType"
            value={formData.eventType}
            onChange={handleInputChange}
            required
          />
        </div>
        {validationErrors.eventType && (
            <div className="error-message">{validationErrors.eventType}</div>
          )}
        <div className="form-group">
          <label htmlFor="dateTime">Date and Time:</label>
          <input
            type="datetime-local"
            id="dateTime"
            name="dateTime"
            value={formData.dateTime}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
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
          <label htmlFor="organizer">Organizer:</label>
          <input
            type="text"
            id="organizer"
            name="organizer"
            value={formData.organizer}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="attendeesAmount">Attendees Amount:</label>
          <input
            type="number"
            id="attendeesAmount"
            name="attendeesAmount"
            value={formData.attendeesAmount}
            onChange={handleInputChange}
            required
            min="1"
          />
        </div>

        <div className='update_btns_wrapper'>
          <Link to={`/manage-events`} className="update">
            <button type="button" className='cancel-btn'>
              Cancel
            </button>
          </Link>
          <button className='update_btn' type="submit">
            Update Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateEvent;