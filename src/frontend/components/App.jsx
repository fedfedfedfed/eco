// Import necessary dependencies
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header/Header';
import ModalOrder from './ModalOrder/ModalOrder';
import PopUp from './PopUp/PopUp';
import HeroSection from './HeroSection/HeroSection';
import Recipes from './Recipes/Recipes';
import RecipeCrud from './RecipeCrud/RecipeCrud';
import './modern-normalize.css';
import HomePage from '../pages/HomePage';
import AddRecipe from './RecipeCrud/AddRecipe';
import UpdateRecipe from './RecipeCrud/UpdateRecipe';
// Modify App to include routing
function App() {
  return (
    <Router>
      <div className="App">
        {/* Your header component */}

        {/* Routing */}
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/manage-recipes" element={<RecipeCrud />} />
          <Route path="/manage-recipes/add-recipe" element={<AddRecipe />} />
          <Route path="/manage-recipes/update-recipe/:recipeId" element={<UpdateRecipe />} />

        </Routes>

        {/* Your modal and popup components */}
      </div>
    </Router>
  );
}

export default App;
