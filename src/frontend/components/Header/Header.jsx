// Header.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './header.css';
import './forms.css';


const Header = () => {
  return (
    <header className="header">
      <div className="container header-wrraper">
        {<header className="header">
  <div className="container header-wrraper">
    <nav className="nav">
      <ul className="nav-list">
        <li className="nav-item">
          <a href="/" className="nav-link">Home</a>
        </li>
        <li className="nav-item">
          <a href="./favorites.html" className="nav-link">Favorites</a>
        </li>
        <li className="nav-item">
          <a href="/manage-recipes" className="nav-link">Admin</a>
        </li>
      </ul>
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
      <li>
        <button type="button" aria-label="switch theme">
          <img
            className="icon-switch"
            width="46px"
            height="20px"
            src="./img/switch.png"
          />
        </button>
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
        <button type="button" aria-label="switch theme">
          <img className="icon-switch" width="46px" height="20px" src="./img/switch.png" />
        </button>
      </div>
    </header>
  );
};


export default Header;
