import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../Header/Header';

const UpdateChef = () => {
    const { chefId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        experience: 0,
        biography: '',
        imageUrl: '',
    });

    useEffect(() => {
        const fetchChef = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/chefs/${chefId}`);
                setFormData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching chef:', error);
            }
        };

        fetchChef();
    }, [chefId]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
      try {
        const response = await axios.put(`http://localhost:8080/api/chefs`, formData);
        console.log(response.data);
        navigate('/manage-chefs'); // Redirect to the recipes page after updating a recipe
      } catch (error) {
        console.error('Error updating chef:', error);
      }
    };
    
    return (
        <div className="recipe-chef-container">
            <Header />
            <h2 className='recipe-title'>Update Chef</h2>
            <form className="recipe-form" onSubmit={handleUpdate}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="experience">Experience:</label>
                    <input
                        type="number"
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        required
                        min="0"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="biography">Biography:</label>
                    <textarea
                        id="biography"
                        name="biography"
                        value={formData.biography}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="imageUrl">Image:</label>
                    <textarea
                        id="imageUrl"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className='update_btns_wrapper'>
                    <Link to={`/manage-chefs`} className="update">
                        <button type="button" className='cancel-btn'>
                            Cancel
                        </button>
                    </Link>
                    <button className='update_btn' type="submit">Update Chef</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateChef;
