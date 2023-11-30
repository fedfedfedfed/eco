import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ChefCrud.css';
import Header from '../Header/Header';

const ChefCrud = () => {
  const [chef, setChefs] = useState([]);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    experience: 0,
    biography: '',
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
      console.log(response.data);
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
      });
    } catch (error) {
      console.error('Error creating chef:', error);
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
        `http://localhost:8080/api/chefs/${selectedChef.id}`,
        updatedChef
      );

      fetchChefs();
      closeModal();
    } catch (error) {
      console.error('Error updating chef:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/chefs/${id}`);
      fetchChefs();
      setSelectedChef(null);
      closeModal();
    } catch (error) {
      console.error('Error deleting chef:', error);
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
      <Header />
      <div className="recipe-container">
        <div className="header_wrapper">
          <div>
            <h1 className='recipes-title'>Chefs</h1>
          </div>
          <Link to="/manage-chefs/add-chefs" className="add">
            <span>+</span>
          </Link>
  
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
                {/* Додайте інші поля форми, які вам потрібні */}
                <button type="submit">Add Chef</button>
              </form>
            </div>
          </div>
        </div>
  
        <ul className='recipe_wrapper'>
        {chef.map((chefx) => (
  <li key={chefx.id} className="recipe-card">
    <div className="recipe-details">
      <h3 className="recipe_title">
        {chefx.first_name} {chefx.last_name}
      </h3>
      <p className='recipe-description'>{truncateDescription(chefx.biography)}</p>
      <a
        className="see-more"
        onClick={(e) => {
          e.stopPropagation();
          handleSeeMore(chefx);
        }}
        href={`#chef-modal-${chefx.id}`}
      >
        See chef
      </a>
    </div>
  </li>
          ))}
        </ul>
  
        {selectedChef && (
          <div id={`chef-modal-${selectedChef.id}`} className="modal">
            <div className="modal__content">
              {/* Ваша інформація для відображення шеф-кухаря */}
              <button className="modal__close" onClick={closeModal}>
                &#10006;
              </button>
              <div className="crud_btns">
                <button type="button" className='update-btn' onClick={handleUpdate}>
                  Update
                </button>
                <button type="button" className='delete-btn' onClick={() => handleDelete(selectedChef.id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
        }
  

export default ChefCrud;
