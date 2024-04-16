import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Outlet } from 'react-router-dom'
import Header from './components/header/Header.jsx'
import Sidebar from './components/sidebar/Sidebar.jsx'
import Rightbar from './components/rightbar/Rightbar.jsx'
import { AuthProvider } from './hooks/useAuth.jsx'
import Home from './pages/home/Home.jsx'
import LeftBar from './components/leftbar/LeftBar.jsx'

export const Layout = () => {
  return(
    <div className='wrapper'>
      <Header />
      <div style={{display:"flex"}}>
        <LeftBar />
        <div style={{flex:6}}>
          <Outlet />
          <Home />
        </div>
        <Rightbar />
      </div>
      
    </div>
    
  )
} 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <App />
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
