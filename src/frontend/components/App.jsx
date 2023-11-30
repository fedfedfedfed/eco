import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header/Header';
import ModalOrder from './ModalOrder/ModalOrder';
import PopUp from './PopUp/PopUp';
import HeroSection from './HeroSection/HeroSection';
import Recipes from './Recipes/Recipes';
import RecipeCrud from './RecipeCrud/RecipeCrud';
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
