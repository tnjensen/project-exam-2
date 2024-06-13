import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter} from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth.jsx'
import { HelmetProvider } from 'react-helmet-async'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AuthProvider>
            <HelmetProvider>
            <App />
            </HelmetProvider>
        </AuthProvider>
    </BrowserRouter>
)
