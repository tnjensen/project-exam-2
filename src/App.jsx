import './App.scss'
import {Routes,Route} from 'react-router-dom'
import { useState } from 'react'
import { ProtectedRoute } from './pages/protected/ProtectedRoute';
import Register from './pages/register/Register';
import Profile from './pages/profile/Profile';
import { Layout } from './main';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/RegisterPage';

function App() {

  return (
    <Routes>
      <Route path='/' element={<ProtectedRoute><Layout /></ProtectedRoute>} />
      <Route path='login' element={<LoginPage />} />
      <Route path='register' element={<RegisterPage />} />
      <Route path='profile/:name' element={<Profile />} />
    </Routes>
    
  )
}

export default App
