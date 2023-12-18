import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import ChefAbout from './ChefAbout';
import './AboutUs.css';
import VideoAdd from './BlogAbout';
import EventAbout from './EventAbout';
import '../EventCrud/EventCrud.css';
import BlogAbout from './BlogAbout';
import TestimonialsAbout from './TestimonialsAbout';
const AboutUs = (props) => {
    return(
        <div>
        <Header userRole={props.userRole} setUserRole={props.setUserRole}/>
        <div className="about-us-container">
      <h1 className='dich_header'>About Our Fresh Vegetables</h1>
      <p className='dich'>
        Welcome to Fresh Veggie Market! We are passionate about providing you with the freshest and
        highest quality vegetables. Our mission is to promote healthy living and sustainable farming
        practices.
      </p>
      <p className='dich'>
        At Fresh Veggie Market, we work directly with local farmers who share our commitment to
        organic and pesticide-free produce. We believe in supporting local communities and delivering
        farm-fresh goodness to your doorstep.
      </p>
      <p className='dich'>
        Our dedicated team ensures that every vegetable you receive is carefully selected and
        delivered with the utmost care. Whether you're a cooking enthusiast or someone looking for
        healthier food options, we have a wide variety of vegetables to meet your needs.
      </p>
      <p className='dich'>
        Thank you for choosing Fresh Veggie Market. Join us in our journey towards a healthier,
        happier, and more sustainable lifestyle.
      </p>
    </div>
    <br/>
        <ChefAbout/>
        <br/>
        <BlogAbout/>
        <br/>
        <EventAbout/>
        <br />
        <TestimonialsAbout/>
        </div>

    )
};
export default AboutUs;