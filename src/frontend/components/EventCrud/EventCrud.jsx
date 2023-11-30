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

          <div id="open-modal" className="modal-window">
            <div>
              <a href="#" title="Close" className="modal-close">&#10006;</a>
              <form className="event-form" onSubmit={handleSubmit}>
                {/* Add form fields for Event */}
                {/* You can use similar structure as in RecipeCrud */}
              </form>
            </div>
          </div>
        </div>
        <ul className='event_wrapper'>
          {events.map((event) => (
            <li
              key={event.id}
              className="event-card"
            >
              <div className="event-details">
                {/* Display event information */}
                <h3 className="event_title">{event.eventName}</h3>
                <p className='event-description'>{event.description}</p>
                <a
                  className="see-more"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSeeMore(event);
                  }}
                  href={`#event-modal-${event.id}`}
                >
                  See event
                </a>
              </div>
            </li>
          ))}
        </ul>

        {/* Modal for displaying full event information */}
        {selectedEvent && (
          <div id={`event-modal-${selectedEvent.id}`} className="modal">
            <div className="modal__content">
              {/* Display event details in the modal */}
              <button className="modal__close" onClick={closeModal}>
                &#10006;
              </button>
              <div className="crud_btns">
                <Link to={`/manage-events/update-event/${selectedEvent.id}`} className="update">
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
