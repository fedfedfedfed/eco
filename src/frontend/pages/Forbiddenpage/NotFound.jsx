import React from 'react';
import Header from '../../components/Header/Header';
import './NotFound.css';

const NotFound = () => {
  return (
    
    <div className="not-found-container">
      <Header />
      <h1>403 Forbidden Access</h1>
      <p>Sorry, the page you are looking for might be in another castle.</p>
      <img src="https://i.imgur.com/qIufhof.png" alt="Mario 404" />
    </div>
  );
};

export default NotFound;