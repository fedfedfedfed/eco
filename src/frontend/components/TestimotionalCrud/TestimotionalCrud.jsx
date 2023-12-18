import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './TestimonialCrud.css';
import Header from '../Header/Header';
import {Rating} from '@mui/material';
const TestimonialCrud = (props) => {
  
  const [chef, setChefs] = useState([]);
  const [formData, setFormData] = useState({
      description: '',
      imageUrl: '',
      fullName: '',
      role: '',
      stars: 0,
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
      const response = await axios.get('http://localhost:8080/api/testimonials');
      setChefs(response.data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/api/testimonials', formData);
      fetchChefs();
      setFormData({
        description: '',
        imageUrl: '',
        fullName: '',
        role: '',
        stars: 0,
      });
    } catch (error) {
      console.error('Error creating testimonial:', error);
    }
  };

  const handleUpdate = async () => {
    if (!selectedChef) return;

    try {
      const updatedChef = {
        ...selectedChef,
        ...formData,
      };

      await axios.put(
        `http://localhost:8080/api/testimonials/${selectedChef.id}`,
        updatedChef
      );

      fetchChefs();
      closeModal();
    } catch (error) {
      console.error('Error updating team member:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/testimonials/${id}`);
      fetchChefs();
      setSelectedChef(null);
      closeModal();
    } catch (error) {
      console.error('Error deleting team member:', error);
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
      description: '',
      imageUrl: '',
      fullName: '',
      role: '',
      stars: 0,
    });
    document.body.classList.remove('modal-open');
  };
  const truncateDescription = (description) => {
    const words = description.split(' ');
  
   
    const truncatedDescription = words.slice(0, 10).join(' ') + "...";
  
    return truncatedDescription;
  };

return (
    <div className='wrapper'>
      <Header userRole={props.userRole} setUserRole={props.setUserRole}/>
      <div className="recipe-container">
        <div className="header_wrapper">
        <Link to="/manage-testimonials/add-testimonials" className="add">
            <span>+</span>
          </Link>
          <div>
            <h1 className='recipes-title'>Testimonials</h1>
          </div>
          
  
          <div id="open-modal" className="modal-window">
            <div>
              <a href="#" title="Close" className="modal-close">&#10006;</a>
  
              <form className="recipe-form" onSubmit={handleSubmit}>
                
                <div className="form-group">
                  <label htmlFor="first_name">First Name:</label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
               
                <button type="submit">Add Testimonial</button>
              </form>
            </div>
          </div>
        </div>
  {/* create card for testimonials */}
        <ul className='test_wrapper'>
        {chef.map((chefx) => (
          <li key={chefx.id} className="recipe-card">
            <div className="recipe-details">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="26" viewBox="0 0 32 26" fill="none">
            <path opacity="0.3" fill-rule="evenodd" clip-rule="evenodd" d="M23.8222 0C20.4357 0 17.6851 2.65696 17.6851 5.9336C17.6851 9.20821 20.4357 11.8672 23.8222 11.8672C29.6404 11.8672 26.2689 22.171 18.931 23.2443C18.5848 23.2936 18.2688 23.4578 18.0403 23.7071C17.8117 23.9563 17.6857 24.2742 17.6851 24.6032C17.6851 25.4456 18.487 26.1119 19.3751 25.9843C32.7122 24.0847 37.4546 0.00202497 23.8222 0.00202497V0ZM6.13933 0C2.74847 0 0 2.65493 0 5.9336C0 9.20619 2.74847 11.8631 6.13933 11.8631C11.9553 11.8631 8.58385 22.171 1.24597 23.2443C0.900119 23.2936 0.58443 23.4575 0.355931 23.7063C0.127431 23.9551 0.00118682 24.2725 0 24.6011C0 25.4436 0.801907 26.1098 1.68788 25.9823C15.0293 24.0827 19.7717 0 6.13933 0Z" fill="#00B307"/>
            </svg>
            <p className='test-description'>{truncateDescription(chefx.description)}</p>
              <div className="wr">
              <img src={chefx.imageUrl} alt={chefx.title} className="review-foto" />
              <p className="recipe_title chef_title">
                {chefx.fullName}
              </p>
              <p className='role'>{chefx.role}</p>
              </div>
              <Rating value={chefx.stars} readOnly/>

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
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="26" viewBox="0 0 32 26" fill="none">
            <path opacity="0.3" fill-rule="evenodd" clip-rule="evenodd" d="M23.8222 0C20.4357 0 17.6851 2.65696 17.6851 5.9336C17.6851 9.20821 20.4357 11.8672 23.8222 11.8672C29.6404 11.8672 26.2689 22.171 18.931 23.2443C18.5848 23.2936 18.2688 23.4578 18.0403 23.7071C17.8117 23.9563 17.6857 24.2742 17.6851 24.6032C17.6851 25.4456 18.487 26.1119 19.3751 25.9843C32.7122 24.0847 37.4546 0.00202497 23.8222 0.00202497V0ZM6.13933 0C2.74847 0 0 2.65493 0 5.9336C0 9.20619 2.74847 11.8631 6.13933 11.8631C11.9553 11.8631 8.58385 22.171 1.24597 23.2443C0.900119 23.2936 0.58443 23.4575 0.355931 23.7063C0.127431 23.9551 0.00118682 24.2725 0 24.6011C0 25.4436 0.801907 26.1098 1.68788 25.9823C15.0293 24.0827 19.7717 0 6.13933 0Z" fill="#00B307"/>
            </svg>
            <p className='test-description'>{selectedChef.description}</p>
              <div className="wr">
              <img src={selectedChef.imageUrl} alt={selectedChef.title} className="review-foto" />
              <p className="recipe_title chef_title">
                {selectedChef.fullName}
              </p>
              <p className='role'>{selectedChef.role}</p>
              </div>
              <Rating value={selectedChef.stars} readOnly/>

        <div className="crud_btns">
          <Link to={`/manage-testimonials/update-testimonials/${selectedChef.id}`} className="update">
              <button type="button" className='update-btn' onClick={handleUpdate}>
                Update
              </button>
            </Link>

          <button type="button" className='delete-btn' onClick={() => handleDelete(selectedChef.id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
)}

      </div>
    </div>
  );
        }
  

export default TestimonialCrud;