import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import './ProductCrud.css';
import Header from '../Header/Header'

const ProductCrud = (props) => {
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
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/api/products', formData);
      fetchProducts();
      setFormData({
        title: '',
        description: '',
        imageUrl: '',
        price: 0.0,
        isAvailable: false,
      });
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleUpdate = async () => {
    if (!selectedProduct) return;
  
    try {
      const updatedProduct = {
        ...selectedProduct,
        ...formData,
      };
  
      console.log('Before update request');
      await axios.put(
        `http://localhost:8080/api/products/${selectedProduct.id}`,
        updatedProduct
      );
      console.log('After update request');
      fetchProducts();
      closeModal();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
  
  
  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/products/${id}`);
      fetchProducts();
      setSelectedProduct(null);
      closeModal();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleSeeMore = (product) => {
    setSelectedProduct(product);  
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
  console.log(products.isAvailable)
  return (
    <div className='wrapper'>
              <Header userRole={props.userRole} setUserRole={props.setUserRole}/>
    <div className="recipe-container">
      <div className="header_wrapper">
      <Link to="/manage-products/add-product" className="add">
            <span>+</span>
          </Link>
        <div>
      <h1 className='recipes-title'>Products</h1>
      </div>
      

      <div id="open-modal" className="modal-window">
  <div>
    <a href="#" title="Close" className="modal-close">&#10006;</a>

    <form className="recipe-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
      </div>      

      <div className="form-group">

      <div className="dropdown-container">
        <label htmlFor="dropdown">Availability</label>
        <div className="custom-dropdown">
          <select 
          id="isAvailable"
          name="isAvailable"
          value={formData.isAvailable}
          onChange={handleInputChange}
          required>
            <option value="">Select Availability</option>
            <option value="EASY">True</option>
          <option value="INTERMEDIATE">False</option>
          </select>
        </div>
      </div>

        
      </div>

      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          required
          min="0.01"
          step="0.01"
        />
      </div>

      <div className="form-group">
        <label htmlFor="imageUrl">Image URL:</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleInputChange}
          required
        />
      </div>
      <button className='add_btn' type="submit">Add Product</button>
    </form>

      </div>
    </div>


      </div>
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
                <p style={containerStyle} className="modal_difficulty_product" >{selectedProduct.price}$</p>
                
              </div>
              <p className='modal_description'>{selectedProduct.description}</p>

              <button className="modal__close" onClick={closeModal}>
                &#10006;
              </button>



            <div className="crud_btns">
            <Link to={`/manage-products/update-product/${selectedProduct.id}`} className="update">
              <button type="button" className='update-btn' onClick={handleUpdate}>
                Update
              </button>
            </Link>

              
              <button type="button" className='delete-btn' onClick={() => handleDelete(selectedProduct.id)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      
    </div>
    </div>
  );
};

export default ProductCrud;
