import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../ChefCrud/ChefCrud.css';

const ChefAbout = () => {
  const [chefs, setChefs] = useState([]);
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

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  const NextArrow = (props) => {
    const { onClick } = props;
    return <div className="arrow next" onClick={onClick}><i className="fas fa-chevron-right"></i></div>;
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return <div className="arrow prev" onClick={onClick}><i className="fas fa-chevron-left"></i></div>;
  };


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
    const truncatedDescription = words.slice(0, 10).join(' ') + '...';
    return truncatedDescription;
  };


  return (
    <div className="wrapper">
      <div className="recipe-container">
        <div className="header_wrapper">
          <div>
            <h1 className="recipes-title">Chefs</h1>
          </div>
        </div>

        
        <Slider {...sliderSettings} nextArrow={<NextArrow />} prevArrow={<PrevArrow />}>
          {chefs.map((chef) => (
            <div className="header_wrapper">
            <div key={chef.id} className="recipe-card">
              <div className="recipe-details">
                <img src={chef.imageUrl} alt={chef.title} className="recipe-image" />
                <h3 className="recipe_title">
                  {chef.firstName} {chef.lastName}
                </h3>
                <p className='chef_email'><i className="far fa-envelope"></i> <span>{chef.email}</span></p>
                <p className='recipe-description'>{truncateDescription(chef.biography)}</p>
                <a
                  className="see-more"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSeeMore(chef);
                  }}
                  href={`#chef-modal-${chef.id}`}
                >
                  Explore More
                </a>
              </div>
            </div>
            
            </div>
          ))}
        </Slider>
        <div className="content-spacing" style={{ marginTop: '20px' }} />

        {selectedChef && (
          <div id={`chef-modal-${selectedChef.id}`} className="modal">
            <div className="modal__content">
              <button className="modal__close" onClick={closeModal}>
                &#10006;
              </button>
              <div className="chef-details">
                <h2 className="modal_title">
                  {selectedChef.firstName} {selectedChef.lastName}
                </h2>
                <img
                  src={selectedChef.imageUrl}
                  alt={`${selectedChef.firstName} ${selectedChef.lastName}`}
                  className="modal-image"
                />

                <div className="chef-info">
                  <div>
                    <p>
                      <i className="far fa-envelope"></i> {selectedChef.email}
                    </p>
                    <p>
                      <i className="fas fa-phone"></i> {selectedChef.phoneNumber}
                    </p>
                  </div>
                  <p>{selectedChef.biography}</p>
                  <p className="chef_exp">
                    <i className="fas fa-clock"></i> {selectedChef.experience} years
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChefAbout;
