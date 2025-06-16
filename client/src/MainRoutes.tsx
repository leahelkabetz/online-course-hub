import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './MainLayout';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CartPage from './pages/CartPage';
import AboutPage from './pages/AboutPage';
import NotFound from './pages/NotFound';
import FeedbeckPage from './pages/FeedbeckPage';
import LoginPage from './pages/LoginPage';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

type MainRoutesProps = {
  openRegister: () => void;
};

export default function MainRoutes({ openRegister }: MainRoutesProps) {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="feedback" element={<FeedbeckPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="login" element={<LoginPage openRegister={openRegister} />} />
    </Routes>
  );
}
