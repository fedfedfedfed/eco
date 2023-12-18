import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../Header/Header';

const UpdateTestimonial = (props) => {
    const { testimonialId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        description: '',
      imageUrl: '',
      fullName: '',
      role: '',
      stars: 0,
    });

    const [validationErrors, setValidationErrors] = useState({
        description: '',
      imageUrl: '',
      fullName: '',
      role: '',
      });

    useEffect(() => {
        const fetchChef = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/testimonials/${testimonialId}`);
                setFormData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching chef:', error);
            }
        };

        fetchChef();
    }, [testimonialId]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (validateInput()){
      try {
        const response = await axios.put(`http://localhost:8080/api/testimonials`, formData);
        console.log(response.data);
        navigate('/manage-testimonials'); 
      } catch (error) {
        console.error('Error updating chef:', error);
      }
    }
    };
    const validateInput = () => {
        let isValid = true;
        const errors = {};
  
        if (!/^https?:\/\//.test(formData.imageUrl)) {
        isValid = false;
        errors.imageUrl = 'Image Url must start with http:// or https://';
      }
    
        setValidationErrors(errors);
        return isValid;
      };
    
    return (
        <div className="recipe-chef-container">
            <Header userRole={props.userRole} setUserRole={props.setUserRole}/>
            <h2 className='recipe-title'>Update Team Member</h2>
            <form className="recipe-form" onSubmit={handleUpdate}>
            <div className="form-group">
              <label htmlFor="firstName">Full Name:</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
            {validationErrors.fullName && (
            <div className="error-message">{validationErrors.fullName}</div>
          )}
            <div className="form-group">
              <label htmlFor="lastName">Role:</label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                required
              />
            </div>
            {validationErrors.role && (
            <div className="error-message">{validationErrors.role}</div>
          )}
            <div className="form-group">
              <label htmlFor="imageUrl">Image:</label>
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
              <label htmlFor="email">Description:</label>
              <input
                type="text"
                id="description"
                name="description"
                
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Stars:</label>
              <input
                type="number"
                id="stars"
                name="stars"
                min={1}
                max={5}
                value={formData.stars}
                onChange={handleInputChange}
                required
              />
            </div>
                <div className='update_btns_wrapper'>
                    <Link to={`/manage-testimonials`} className="update">
                        <button type="button" className='cancel-btn'>
                            Cancel
                        </button>
                    </Link>
                    <button className='update_btn' type="submit">Update Team Member</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateTestimonial;