import './App.scss'
import {Routes,Route} from 'react-router-dom'
import Home from './components/home/Home'
import { useState } from 'react'
import Login from './pages/login/Login';
import { ProtectedRoute } from './pages/protected/ProtectedRoute';
import Register from './pages/register/Register';
import Profile from './pages/profile/Profile';
import { Layout } from './main';

function App() {
  const [token,setToken] = useState(null);

  return (
    <Routes>
      <Route path='/' element={<ProtectedRoute><Layout /></ProtectedRoute>} />
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='profile/:id' element={<Profile />} />
    </Routes>
    
  )
}

export default App
