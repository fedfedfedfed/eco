import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Header from './Header/Header';
import ModalOrder from './ModalOrder/ModalOrder';
import PopUp from './PopUp/PopUp';
import HeroSection from './HeroSection/HeroSection';
import Recipes from './Recipes/Recipes';
import RecipeCrud from './ProductCrud/ProductCrud';
import AboutUs from './AboutUs/AboutUs';
import EventCrud from './EventCrud/EventCrud';
import AddEvent from './EventCrud/AddEvent';
import UpdateEvent from './EventCrud/UpdateEvent';
import VideoTutorialAdd from './BlogCrud/BlogAdd';
import VideoTutorialCrud from './BlogCrud/BlogCrud';
import VideoTutorialUpdate from './BlogCrud/BlogUpdate';
import ChefCrud from './TeamMemberCrud/TeamMemberCrud';
import './modern-normalize.css';
import HomePage from '../pages/HomePage';
import AddProduct from './ProductCrud/AddProduct';
import AddChef from './TeamMemberCrud/AddTeamMember';
import UpdateChef from './TeamMemberCrud/UpdateTeamMember';
import UpdateRecipe from './ProductCrud/UpdateProduct';
import LoginPage from '../pages/LoginPage/LoginPage'; 
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import { useEffect, useState } from 'react';
import NotFound from '../pages/Forbiddenpage/NotFound';
import ProductCrud from './ProductCrud/ProductCrud'
import UpdateProduct from './ProductCrud/UpdateProduct'
import TeamMemberCrud from './TeamMemberCrud/TeamMemberCrud';
import AddTeamMember from './TeamMemberCrud/AddTeamMember';
import UpdateTeamMember from './TeamMemberCrud/UpdateTeamMember';
import BlogCrud from './BlogCrud/BlogCrud';
import BlogAdd from './BlogCrud/BlogAdd';
import BlogUpdate from './BlogCrud/BlogUpdate';
import AddTestimonial from './TestimotionalCrud/AddTestimotional';
import TestimonialCrud from './TestimotionalCrud/TestimotionalCrud';
import UpdateTestimonial from './TestimotionalCrud/UpdateTestimotional';

function App() {
  const [userRole, setUserRole] = useState('ADMIN');



  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/forbidden" element={<NotFound />} />
          <Route path="/" element={<HomePage userRole={userRole} setUserRole={setUserRole}/>} />
          {userRole === 'ADMIN' && <React.Fragment>

          <Route path="/manage-team-members" element={<TeamMemberCrud userRole={userRole} setUserRole={setUserRole}/>} />
          <Route path="/manage-team-members/add-team-members" element={<AddTeamMember userRole={userRole} setUserRole={setUserRole}/>} />
          <Route path="/manage-team-members/update-team-members/:teamMemberId" element={<UpdateTeamMember userRole={userRole} setUserRole={setUserRole}/>} />
          
          <Route path="/manage-products" element={<ProductCrud userRole={userRole} setUserRole={setUserRole}/>} />
          <Route path="/manage-products/add-product" element={<AddProduct userRole={userRole} setUserRole={setUserRole}/>} />
          <Route path="/manage-products/update-product/:productId" element={<UpdateProduct userRole={userRole} setUserRole={setUserRole}/>} />
          
          <Route path="/manage-blogs" element={<BlogCrud userRole={userRole} setUserRole={setUserRole}/>} />
          <Route path="/manage-blogs/add-blogs" element={<BlogAdd userRole={userRole} setUserRole={setUserRole}/>} />
          <Route path="/manage-blogs/update-blogs/:blogId" element={<BlogUpdate userRole={userRole} setUserRole={setUserRole}/>} />
         
          <Route path="/manage-events" element={<EventCrud userRole={userRole} setUserRole={setUserRole}/>} />
          <Route path="/manage-events/add-event" element={<AddEvent userRole={userRole} setUserRole={setUserRole}/>} />
          <Route path="/manage-events/update-events/:eventId" element={<UpdateEvent userRole={userRole} setUserRole={setUserRole}/>} />
          
          <Route path="/manage-testimonials" element={<TestimonialCrud userRole={userRole} setUserRole={setUserRole}/>} />
          <Route path="/manage-testimonials/add-testimonials" element={<AddTestimonial userRole={userRole} setUserRole={setUserRole}/>} />
          <Route path="/manage-testimonials/update-testimonials/:testimonialId" element={<UpdateTestimonial userRole={userRole} setUserRole={setUserRole}/>} />
          
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