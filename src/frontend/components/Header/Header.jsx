
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './header.css';
import './forms.css';
import { toggleTheme } from '../../redux/themeReducer';

const Header = (props) => {

  useEffect(() => {

    const token = localStorage.getItem('jwtToken');
    console.log(token);
    if (token) {

      const decodedToken = decode(token);
      console.log(decodedToken);
      const role = decodedToken?.roles;
      console.log(role); 
      props.setUserRole(role);
      console.log(props.userRole);
    }
  }, []);

  const decode = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      return null;
    }
  };

  return (
    <header className="header">
      <div className="container header-wrraper">
        {<header className="header">
  <div className="container header-wrraper">
    <nav className="nav">
    {props.userRole === 'ADMIN' ?
      <ul className="nav-list">
        <li className="nav-item">
          <a href="/" className="nav-link">Home</a>
        </li>
        <li className="nav-item">
          <a href="/manage-team-members" className="nav-link">Team Members</a>
        </li>
        <li className="nav-item">
          <a href="/manage-products" className="nav-link">Products</a>
        </li>
        
        <li className="nav-item">
          <a href="/manage-blogs" className="nav-link">Blogs</a>
        </li>
        <li className="nav-item">
          <a href="/manage-events" className="nav-link">Events</a>
        </li>
        <li className="nav-item">
          <a href="/aboutus" className="nav-link">AboutUs</a>
        </li>
        <li className="nav-item">
          <a href="/manage-testimonials" className="nav-link">Testimonials</a>
        </li>
      </ul>
 : <ul className="nav-list">
    <li className="nav-item">
      <a href="/" className="nav-link">Home</a>
    </li>
    <li className="nav-item">
          <a href="/aboutus" className="nav-link">AboutUs</a>
    </li>
        
        <li className="nav-item">
        <a href="/login" className="nav-link">Login</a>
      </li>
      <li className="nav-item">
        <a href="/register" className="nav-link">Register</a>
      </li>
      </ul>
}
    </nav>

    <a href="./index.html" aria-label="logo">
      <svg className="mobile-logo" width="83" height="18">
        <use href="./img/sprite.svg#logo"></use>
      </svg>
    </a>

    <ul className="desktop-right-part">
      <li>
        <a
          href="tel:+380730000000"
          aria-label="basket icon"
          className="basket-link"
        >
          <svg className="mobile-menu-basket" width="24" height="24">
            <use href="./img/sprite.svg#basket"></use>
          </svg>
        </a>
      </li>
    </ul>
  </div>
  <div className="mobile-wrraper container">
    <svg className="mobile-logo" width="83" height="18">
      <use href="./img/sprite.svg#logo"></use>
    </svg>
    <div className="mobile-burger-menu">
      <ul className="mobile-right-part">
        <li>
          <svg className="mobile-menu-basket" width="24" height="24">
            <use href="./img/sprite.svg#basket"></use>
          </svg>
        </li>
        <li>
          <button
            type="button"
            className="menu-toggle-burger js-open-menu"
            aria-expanded="false"
            aria-controls="mobile-menu"
            aria-label="mobile menu"
          >
            <svg className="mobile-menu-burger" width="32" height="32">
              <use href="./img/sprite.svg#burger"></use>
            </svg>
          </button>
        </li>
      </ul>
    </div>

    <div className="menu-container js-menu-container" id="mobile-menu">
      <button type="button" className="menu-toggle-close js-close-menu">
        <svg className="modal-menu-close" width="16" height="16">
          <use
            className="svg-modal"
            width="16"
            height="16"
            href="./img/sprite.svg#cross-close-modal"
          ></use>
        </svg>
      </button>

      <ul className="mobile-menu">
        <li><a className="link mobile-menu-item" href="./index.html">Home</a></li>
        <li>
          <a className="link mobile-menu-item" href="./favorites.html">Favorites</a>
        </li>
      </ul>
    <svg className="" width="46px" height="20px">
        <use className="svg-switch" href="../img/sprite.svg#switch"></use>
        </svg> 
      <img
        className="icon-switch"
        width="46px"
        height="20px"
        src="./img/switch.png"
      />
    </div>
  </div>
</header>}
      </div>
    </header>
  );
};


export default Header;