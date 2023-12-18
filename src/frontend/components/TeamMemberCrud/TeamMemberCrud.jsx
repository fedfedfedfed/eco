import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './TeamMember.css';
import Header from '../Header/Header';

const TeamMemberCrud = (props) => {
  
  const [chef, setChefs] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    experience: 0,
    biography: '',
    imageUrl: '',
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
      const response = await axios.get('http://localhost:8080/api/team-members');
      setChefs(response.data);
    } catch (error) {
      console.error('Error fetching team members:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/api/team-members', formData);
      fetchChefs();
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        experience: 0,
        biography: '',
        imageUrl: '',
      });
    } catch (error) {
      console.error('Error creating team member:', error);
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
        `http://localhost:8080/api/team-members/${selectedChef.id}`,
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
      await axios.delete(`http://localhost:8080/api/team-members/${id}`);
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
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      experience: 0,
      biography: '',
      imageUrl: '',
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
        <Link to="/manage-team-members/add-team-members" className="add">
            <span>+</span>
          </Link>
          <div>
            <h1 className='recipes-title'>Team Members</h1>
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
               
                <button type="submit">Add Team Member</button>
              </form>
            </div>
          </div>
        </div>
  
        <ul className='team_wrapper'>
        {chef.map((chefx) => (
          <li key={chefx.id} className="team-card">
            <div className="recipe-details">
            <img src={chefx.imageUrl} alt={chefx.title} className="recipe-image" />
              <h3 className="team_title">
                {chefx.firstName} {chefx.lastName}
              </h3>
              <p className='team_email'><i className="far fa-envelope"></i> <span>{chefx.email}</span></p>
              <p className='team_description'>{truncateDescription(chefx.biography)}</p>
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
        <h2 className='modal_title_team'>{selectedChef.firstName} {selectedChef.lastName}</h2>
        <img
          src={selectedChef.imageUrl}
          alt={`${selectedChef.firstName} ${selectedChef.lastName}`}
          className="modal-image-team"
        />

        <div className='chef-info'>
          <div>
          <p><i className="far fa-envelope"></i> {selectedChef.email}</p>
          <p><i className="fas fa-phone"></i> {selectedChef.phoneNumber}</p>
          </div>
          <p>{selectedChef.biography}</p>
          <p className='team_years'><i className="fas fa-birthday-cake"></i> {selectedChef.experience} years</p>
          </div>

        <div className="crud_btns">
          <Link to={`/manage-team-members/update-team-members/${selectedChef.id}`} className="update">
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
  

export default TeamMemberCrud;