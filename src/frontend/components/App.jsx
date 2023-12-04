import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Header from './Header/Header';
import ModalOrder from './ModalOrder/ModalOrder';
import PopUp from './PopUp/PopUp';
import HeroSection from './HeroSection/HeroSection';
import Recipes from './Recipes/Recipes';
import RecipeCrud from './RecipeCrud/RecipeCrud';
import AboutUs from './AboutUs/AboutUs';
import EventCrud from './EventCrud/EventCrud';
import AddEvent from './EventCrud/AddEvent';
import UpdateEvent from './EventCrud/UpdateEvent';
import VideoTutorialAdd from './VideoTutorialCrud/VideoTutorialAdd';
import VideoTutorialCrud from './VideoTutorialCrud/VideoTutorialCrud';
import VideoTutorialUpdate from './VideoTutorialCrud/VideoTutorialUpdate';
import ChefCrud from './ChefCrud/ChefCrud';
import './modern-normalize.css';
import HomePage from '../pages/HomePage';
import AddRecipe from './RecipeCrud/AddRecipe';
import AddChef from './ChefCrud/AddChef';
import UpdateChef from './ChefCrud/UpdateChef';
import UpdateRecipe from './RecipeCrud/UpdateRecipe';
import LoginPage from '../pages/LoginPage/LoginPage'; 
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import { useEffect, useState } from 'react';
import NotFound from '../pages/Forbiddenpage/NotFound';
import UserCrud from './UserCrud/UserCrud';

function App() {
  const [userRole, setUserRole] = useState('ADMIN');



  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/forbidden" element={<NotFound />} />
          <Route path="/" element={<HomePage userRole={userRole} setUserRole={setUserRole}/>} />
          {userRole === 'ADMIN' && <React.Fragment>
          <Route path="/manage-chefs" element={<ChefCrud userRole={userRole} setUserRole={setUserRole}/>} />
          
          <Route path="/manage-chefs/add-chefs" element={<AddChef userRole={userRole} setUserRole={setUserRole}/>} />
          <Route path="/manage-chefs/update-chefs/:chefId" element={<UpdateChef userRole={userRole} setUserRole={setUserRole}/>} />
          <Route path="/manage-recipes" element={<RecipeCrud userRole={userRole} setUserRole={setUserRole}/>} />
          <Route path="/manage-recipes/add-recipe" element={<AddRecipe userRole={userRole} setUserRole={setUserRole}/>} />
          <Route path="/manage-recipes/update-recipe/:recipeId" element={<UpdateRecipe userRole={userRole} setUserRole={setUserRole}/>} />
          <Route path="/manage-video-tutorials" element={<VideoTutorialCrud userRole={userRole} setUserRole={setUserRole}/>} />
          <Route path="/manage-video-tutorials/add-video-tutorials" element={<VideoTutorialAdd userRole={userRole} setUserRole={setUserRole}/>} />
          <Route path="/manage-video-tutorials/update-video-tutorials/:video_tutorialId" element={<VideoTutorialUpdate userRole={userRole} setUserRole={setUserRole}/>} />
          <Route path="/manage-events" element={<EventCrud userRole={userRole} setUserRole={setUserRole}/>} />
          <Route path="/manage-events/add-event" element={<AddEvent userRole={userRole} setUserRole={setUserRole}/>} />
          <Route path="/manage-events/update-events/:eventId" element={<UpdateEvent userRole={userRole} setUserRole={setUserRole}/>} />
          <Route path="/user" element={<UserCrud userRole={userRole} setUserRole={setUserRole}/>} />
          </React.Fragment>
  } 
          <Route path="/aboutus" element={<AboutUs userRole={userRole} setUserRole={setUserRole}/>} />
          
          <Route path="/login" element={<LoginPage />} />

          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;