import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import ChefAbout from './ChefAbout';
import './AboutUs.css';
import VideoAdd from './VideoAbout';
import EventAbout from './EventAbout';
import '../EventCrud/RecipeCrud.css';

const AboutUs = () => {
    return(
        <div>
        <Header/>
        <div class="hero-title centered">
    <h1 className='about_h'>About <span className='span'>TastyTreats</span></h1>
    <p className='about_text'>Welcome to <span className='span'>TastyTreats</span>, where passion for food meets exceptional taste. We are more than just a brand; we are a culinary journey, crafting delightful experiences for your palate.</p>
    
    <p className='aboutp'><span className='ourspan'>Our</span> Story:</p>
    <p className='about_text'>Founded with a love for authentic flavors and a commitment to quality, <span className='span'>TastyTreats</span> has been serving culinary delights that resonate with food enthusiasts worldwide. From traditional recipes passed down through generations to innovative creations, our menu is a celebration of diverse tastes and textures.</p>
    </div>
    <br/>
        <ChefAbout/>
        <br/>
        <VideoAdd/>
        <br/>
        <EventAbout/>
        </div>
    )
};
export default AboutUs;