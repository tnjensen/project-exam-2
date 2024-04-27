import './App.scss'
import {Routes,Route} from 'react-router-dom'
import { ProtectedRoute } from './pages/protected/ProtectedRoute';
import Profile from './pages/profile/Profile';
import { Layout } from './main';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

function App() {

  return (
    <Routes>
      <Route path='/' element={<ProtectedRoute><Layout /></ProtectedRoute>} />
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='profile/:name' element={<Profile />} />
    </Routes>
    
  )
}

export default App
