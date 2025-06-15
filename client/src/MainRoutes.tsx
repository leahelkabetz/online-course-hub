import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './MainLayout';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CartPage from './pages/CartPage';
import AboutPage from './pages/AboutPage';
import NotFound from './pages/NotFound';


export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
