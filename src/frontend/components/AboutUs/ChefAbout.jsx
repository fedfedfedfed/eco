import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../ChefCrud/ChefCrud.css';

const ChefAbout = () => {
  const [chef, setChefs] = useState([]);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    experience: 0,
    biography: '',
    image_url: '',
  });
  const [selectedChef, setSelectedChef] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [containerStyle, setContainerStyle] = useState({
    backgroundColor: '',
  });
  useEffect(() => {
    fetchChefs();
  }, []);

  const fetchChefs = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/chefs');
      setChefs(response.data);
    } catch (error) {
      console.error('Error fetching chefs:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/api/chefs', formData);
      fetchChefs();
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        experience: 0,
        biography: '',
        image_url: '',
      });
    } catch (error) {
      console.error('Error creating chef:', error);
    }
  };


  const handleSeeMore = (chef) => {
    setSelectedChef(chef);
    setFormData(chef);
    openModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
    document.body.classList.add('modal-open');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedChef(null);
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      experience: 0,
      biography: '',
      image_url: '',
    });
    document.body.classList.remove('modal-open');
  };
  const truncateDescription = (description) => {
    const words = description.split(' ');
  
    // Take the first two lines (assuming each line has a maximum of 10 words)
    const truncatedDescription = words.slice(0, 10).join(' ') + "...";
  
    return truncatedDescription;
  };

return (
    <div className='wrapper'>
      <div className="recipe-container">
        <div className="header_wrapper">
          <div>
            <h1 className='recipes-title'>Chefs</h1>
          </div>
  
          <div id="open-modal" className="modal-window">
            <div>
              <a href="#" title="Close" className="modal-close">&#10006;</a>
  
              <form className="recipe-form" onSubmit={handleSubmit}>
                {/* Форма для додавання шеф-кухаря */}
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
              </form>
            </div>
          </div>
        </div>
  
        <ul className='recipe_wrapper'>
        {chef.map((chefx) => (
          <li key={chefx.id} className="recipe-card">
            <div className="recipe-details">
            <img src={chefx.imageUrl} alt={chefx.title} className="recipe-image" />
              <h3 className="recipe_title">
                {chefx.firstName} {chefx.lastName}
              </h3>
              <p className='chef_email'><i className="far fa-envelope"></i> <span>{chefx.email}</span></p>
              <p className='recipe-description'>{truncateDescription(chefx.biography)}</p>
              <a
                className="see-more"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSeeMore(chefx);
                }}
                href={`#chef-modal-${chefx.id}`}
              >
                Explore More
              </a>
            </div>
          </li>
          ))}
        </ul>
  
        {selectedChef && (
  <div id={`chef-modal-${selectedChef.id}`} className="modal">
    <div className="modal__content">
      <button className="modal__close" onClick={closeModal}>
        &#10006;
      </button>
      <div className="chef-details">
        <h2 className='modal_title'>{selectedChef.firstName} {selectedChef.lastName}</h2>
        <img
          src={selectedChef.imageUrl}
          alt={`${selectedChef.firstName} ${selectedChef.lastName}`}
          className="modal-image"
        />

        <div className='chef-info'>
          <div>
          <p><i className="far fa-envelope"></i> {selectedChef.email}</p>
          <p><i className="fas fa-phone"></i> {selectedChef.phoneNumber}</p>
          </div>
          <p>{selectedChef.biography}</p>
          <p className='chef_exp'><i className="fas fa-clock"></i> {selectedChef.experience} years</p>
          </div>
      </div>
    </div>
  </div>
)}

      </div>
    </div>
  );
        }
  

export default ChefAbout;