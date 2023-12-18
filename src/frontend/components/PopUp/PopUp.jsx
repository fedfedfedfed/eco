// PopUp.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './popup.css';
import './buttons.css';
import '../ProductCrud/ProductCrud.css';

const ITEMS_PER_PAGE = 9;

const PopUp = ({ currentPage, handlePageChange }) => {
  const [title, setTitle] = useState('');
    const [time, setTime] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleResetFilters = () => {
      setTitle('');
      setTime('');
      setCuisine('');
      setDifficulty('');
    };

    useEffect(() => {
      handleSearch();
    }, [title, time, cuisine, difficulty]);

    const handleSearch = async () => {
      try {
        const params = {
          title: title,
          time: time === '' ? 0 : time,
          cuisine: cuisine,
          difficulty: difficulty
        };
    
        Object.keys(params).forEach((key) => params[key] === undefined && delete params[key]);
    
        const response = await axios.get('http://localhost:8080/api/recipes/search', { params });
    
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error searching products:', error);
      }
    };
    
    
    
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
      title: '',
      description: '',
      imageUrl: '',
      price: 0.0,
      isAvailable: false,
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [containerStyle, setContainerStyle] = useState({
    backgroundColor: '',
  });

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/products?page=${currentPage}&perPage=${ITEMS_PER_PAGE}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSeeMore = (product) => {
    setSelectedProduct(product);

    if (product.difficultyLevel === "EASY") {
      setContainerStyle({ backgroundColor: "#51cf66" });
    } else if (product.difficultyLevel === "INTERMEDIATE") {
      setContainerStyle({ backgroundColor: "#ffd43b" });
    } else {
      setContainerStyle({ backgroundColor: "red" });
    }

    setFormData(product);
    openModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
    document.body.classList.add('modal-open'); 
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setFormData({
      title: '',
      description: '',
      imageUrl: '',
      price: 0.0,
      isAvailable: false,
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
      <div className="recipe-container">
        <div className="header_wrapper">
        </div>


        {/* <div className="filters">
      <div className="filter-item search">
        <label htmlFor="filter-search">Search</label>
        <input
          className="filter-select"
          type="text"
          name="filter-search"
          id="filter-search"
          autoComplete="off"
          placeholder="Enter text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="filter-item time">
        <label htmlFor="time-input">Time:</label>
        <div className="time-input-container">
          <input
            className="filter-select"
            type="number"
            name="time-input"
            id="time-input"
            autoComplete="off"
            placeholder="Enter time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
      </div>

      <div className="filter-item area">
        <label htmlFor="area-select">Cousine</label>
        <select className="filter-select" name="area-select" id="area-select"
        value={cuisine}
        onChange={(e) => setCuisine(e.target.value)}>
          <option value="">Cuisine</option>
          <option className="filter-select-option" value="AMERICAN">AMERICAN</option>
          <option className="filter-select-option" value="ITALIAN">ITALIAN</option>
          <option className="filter-select-option" value="MEXICAN">MEXICAN</option>
          <option className="filter-select-option" value="ASIAN">ASIAN</option>
          <option className="filter-select-option" value="INDIAN">INDIAN</option>
          <option className="filter-select-option" value="FRENCH">FRENCH</option>
          <option className="filter-select-option" value="CHINESE">CHINESE</option>
          <option className="filter-select-option" value="JAPANESE">JAPANESE</option>
          <option className="filter-select-option" value="KOREAN">KOREAN</option>
          <option className="filter-select-option" value="SPANISH">SPANISH</option>
          <option className="filter-select-option" value="GERMAN">GERMAN</option>
          <option className="filter-select-option" value="GREEK">GREEK</option>
          <option className="filter-select-option" value="BRITISH">BRITISH</option>
          <option className="filter-select-option" value="OTHER">OTHER</option>
        </select>
      </div>

      <div className="filter-item ingredients">
        <label htmlFor="ingredients-select">Level</label>
        <select
          className="filter-select"
          name="ingredients-select"
          id="ingredients-select"
          value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="">Difficulty</option>
          <option className="filter-select-option" value="EASY">EASY</option>
          <option className="filter-select-option" value="INTERMEDIATE">INTERMEDIATE</option>
          <option className="filter-select-option" value="ADVANCED">ADVANCED</option>
        </select>
      </div>
      <div className="search-button">
           
          </div>
        <button type="button" onClick={handleResetFilters} className="reset_btn">
          Reset the filter
        </button>
    </div> */}



<ul className='product_wrapper'>
        {products.map((product) => (
          <li
            key={product.id}
            className="recipe-card"
          >
            <div className="recipe-details">
              <img src={product.imageUrl} alt={product.title} className="recipe-image" />
              <h3 className="product_title">{product.title}</h3>
              <p className='product-description'>{truncateDescription(product.description)}</p>
              <p className='product-price'>{product.price}$</p>
              {product.isAvailable == true && <p>Present</p>}
              <a
                className="see-more-product"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSeeMore(product);
                }}
                href={`#recipe-modal-${product.id}`}
              >
                See Product
              </a>
            </div>
          </li>
        ))}
      </ul>

      {selectedProduct && (
          <div id={`recipe-modal-${selectedProduct.id}`} className="modal">
            <div className="modal__content">
              <h2 className='modal_title'>{selectedProduct.title}</h2>
              <img
                src={selectedProduct.imageUrl}
                alt={selectedProduct.title}
                className="modal-image"
              />
              <div className='modal_icon_wrapper'>
                <p className="bold" >{selectedProduct.price}$</p>
                
              </div>
              <p className='modal_description'>{selectedProduct.description}</p>

              <button className="modal__close" onClick={closeModal}>
                &#10006;
              </button>
          </div>
        </div>
      )}

        
      </div>
    </div>
  );
};

export default PopUp;