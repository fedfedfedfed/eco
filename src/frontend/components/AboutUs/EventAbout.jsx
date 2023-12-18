import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { truncateDescription } from './util';
const EventAbout = () => {
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

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5, 
    slidesToScroll: 1,
  };

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
  }

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
      timeZone: 'Europe/Kiev',
    };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(rawDate);
    console.log(formattedDate);
    return formattedDate;
  }



  return (
    <div className='wrapper'>

      <div className="recipe-container">
        <div className="header_wrapper">
          <div>
            <h1 className='recipe-title'>Events</h1>
          </div>
          

        </div>
        <div className='wrap'>
          {events.map((event) => (
            <div className="header_wrapper">
            <div key={event.id} className="recipe-card">
              <div className="recipe-details">
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
            </div>
            </div>
          ))}
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
          </div>
        </div>
      )}
        </div>
      </div>
    </div>
  );
};

export default EventAbout;
