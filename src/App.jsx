import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';

import Home from './pages/public/Home';
import About from './pages/public/About';
import Services from './pages/public/Services';
import Contact from './pages/public/Contact';
import CategoryView from './pages/public/CategoryView';
import ProjectView from './pages/public/ProjectView';
import Login from './pages/admin/Login';
import AdminLayout from './components/layout/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageCategories from './pages/admin/ManageCategories';
import ManageProjects from './pages/admin/ManageProjects';
import EditProject from './pages/admin/EditProject';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="gallery" element={<Home />} /> {/* Gallery root links to categories (Home) */}
        <Route path="gallery/:slug" element={<CategoryView />} />
        <Route path="project/:slug" element={<ProjectView />} />
        <Route path="contact" element={<Contact />} />
      </Route>

      <Route path="/login" element={<Login />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="categories" element={<ManageCategories />} />
        <Route path="projects" element={<ManageProjects />} />
        <Route path="projects/:id" element={<EditProject />} />
      </Route>
    </Routes>
  );
};

export default App;
