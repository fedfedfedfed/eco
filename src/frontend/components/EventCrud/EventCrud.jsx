import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './RecipeCrud.css';
import Header from '../Header/Header';

const EventCrud = () => {
  const [events, setEvents] = useState([]);
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
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/events');
      setEvents(response.data);

    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/api/events', formData);
      fetchEvents();
      setFormData({
        imageUrl: '',
        eventName: '',
        eventType: '',
        dateTime: '',
        location: '',
        description: '',
        organizer: '',
        attendeesAmount: 0,
      });
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleUpdate = async () => {
    if (!selectedEvent) return;

    try {
      const updatedEvent = {
        ...selectedEvent,
        ...formData,
      };

      await axios.put(
        `http://localhost:8080/api/events/${selectedEvent.id}`,
        updatedEvent
      );

      fetchEvents();
      closeModal();
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/events/${id}`);
      fetchEvents();
      setSelectedEvent(null);
      closeModal();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleSeeMore = (event) => {
    setSelectedEvent(event);
    setFormData(event);
    openModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
    document.body.classList.add('modal-open');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setFormData({
      imageUrl: '',
      eventName: '',
      eventType: '',
      dateTime: '',
      location: '',
      description: '',
      organizer: '',
      attendeesAmount: 0,
    });
    document.body.classList.remove('modal-open');
  };

  const processData = (date) => {
    const rawDate = new Date(date);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      //second: 'numeric',
      timeZone: 'Europe/Kiev',
    };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(rawDate);
    console.log(formattedDate);
    return formattedDate;
  }
  const truncateDescription = (description) => {
    const words = description.split(' ');
  
    // Take the first two lines (assuming each line has a maximum of 10 words)
    const truncatedDescription = words.slice(0, 10).join(' ') + "...";
  
    return truncatedDescription;
  };
  return (
    <div className='wrapper'>
      <Header />
      <div className="recipe-container">
        <div className="header_wrapper">
          <div>
            <h1 className='recipe-title'>Events</h1>
          </div>
          <Link to="/manage-events/add-event" className="add">
            <span>+</span>
          </Link>

          <div id="recipe-modal" className="modal-window">
            <div>
              <a href="#" title="Close" className="modal-close">&#10006;</a>
              <form className="recipe-form" onSubmit={handleSubmit}>
                {/* Add form fields for Event */}
                {/* You can use similar structure as in RecipeCrud */}
              </form>
            </div>
          </div>
        </div>
        <ul className='recipe_wrapper'>
          {events.map((event) => (
            <li
              key={event.id}
              className="recipe-card"
            >
              <div className="recipe-details">
                {/* Display event information */}
                <img src={event.imageUrl} alt={event.eventName} className="recipe-image" />
                <h3 className="recipe_title">{event.eventName}</h3>
                <p className='recipe-description'>{truncateDescription(event.description)}</p>
                <a
                  className="see-more"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSeeMore(event);
                  }}
                  href={`#recipe-modal-${event.id}`}
                >
                  See event
                </a>
              </div>
            </li>
          ))}
        </ul>

        {/* Modal for displaying full event information */}
        {selectedEvent && (
        <div id={`recipe-modal-${selectedEvent.id}`} className="modal">
          <div className="modal__content">
            <h2 className='modal_title'>{selectedEvent.eventName}</h2>
            <img
              src={selectedEvent.imageUrl}
              alt={selectedEvent.eventName}
              className="modal-image"
            />
            <div className='event_icons_wrapper'>
          <p><i className="fas fa-map-marker-alt"></i> {selectedEvent.location}</p>
          <p><i className="fa fa-volume-up"></i> {selectedEvent.organizer}</p>
          </div>
          <p className='event_description'>{selectedEvent.description}</p>
          <div className='event_icons_wrapper'>
          <p className='modal_cook_time'><i className="far fa-calendar-alt"></i>{processData(selectedEvent.dateTime)}</p>
          <p><i className="fa fa-user"></i> {selectedEvent.attendeesAmount}</p>
          </div>
            <button className="modal__close" onClick={closeModal}>
              &#10006;
            </button>
            <div className="crud_btns">
            <Link to={`/manage-events/update-events/${selectedEvent.id}`} className="update">
              <button type="button" className='update-btn' onClick={handleUpdate}>
                Update
              </button>
            </Link>

              
              <button type="button" className='delete-btn' onClick={() => handleDelete(selectedEvent.id)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default EventCrud;
