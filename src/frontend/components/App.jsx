import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import LoginPage from '../pages/LoginPage/LoginPage'; // Додайте імпорт LoginPage
import RegisterPage from '../pages/RegisterPage/RegisterPage';
// Modify App to include routing
function App() {
  return (
    <Router>
      <div className="App">
        {/* Your header component */}

        {/* Routing */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/manage-chefs" element={<ChefCrud />} />
          <Route path="/manage-chefs/add-chefs" element={<AddChef />} />
          <Route path="/manage-chefs/update-chefs/:chefId" element={<UpdateChef />} />
          <Route path="/manage-recipes" element={<RecipeCrud />} />
          <Route path="/manage-recipes/add-recipe" element={<AddRecipe />} />
          <Route path="/manage-recipes/update-recipe/:recipeId" element={<UpdateRecipe />} />
          <Route path="/manage-video-tutorials" element={<VideoTutorialCrud />} />
          <Route path="/manage-video-tutorials/add-video-tutorials" element={<VideoTutorialAdd />} />
          <Route path="/manage-tutorials/update-video-tutorials/:video-tutorialId" element={<VideoTutorialUpdate />} />
          <Route path="/manage-events" element={<EventCrud />} />
          <Route path="/manage-events/add-event" element={<AddEvent />} />
          <Route path="/manage-events/update-events/:eventId" element={<UpdateEvent />} />
          <Route path="/aboutus" element={<AboutUs />} />
          
          {/* Додайте маршрут для LoginPage */}
          <Route path="/login" element={<LoginPage />} />

          {/* Додайте маршрут для RegisterPage */}
          <Route path="/register" element={<RegisterPage />} />
        </Routes>

        {/* Your modal and popup components */}
      </div>
    </Router>
  );
}

export default App;
