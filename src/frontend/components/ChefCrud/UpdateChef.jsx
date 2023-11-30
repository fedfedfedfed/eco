import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../Header/Header';

const UpdateChef = () => {
    const { chefId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        experience: 0,
        biography: '',
    });

    useEffect(() => {
        const fetchChef = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/chef/${chefId}`);
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
            const updatedChef = {
                ...formData,
            };
            await axios.put(`http://localhost:8080/api/chefs/${chefId}`, updatedChef);
            console.log(updatedChef);
            navigate('/manage-chefs');
        } catch (error) {
            console.error('Помилка при оновленні кухаря:', error);
        }
    };
    
    return (
        <div className="update-chef-container">
            <Header />
            <h2 className='chefs-title'>Update Chef</h2>
            <form className="chef-form" onSubmit={handleUpdate}>
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

                <div className="form-group">
                    <label htmlFor="last_name">Last Name:</label>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={formData.last_name}
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
                    <label htmlFor="phone_number">Phone Number:</label>
                    <input
                        type="text"
                        id="phone_number"
                        name="phone_number"
                        value={formData.phone_number}
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
