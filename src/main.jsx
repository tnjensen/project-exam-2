import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter} from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth.jsx'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AuthProvider>
            <HelmetProvider>
                <QueryClientProvider client={queryClient}>
                    <App />
                 </QueryClientProvider>
            </HelmetProvider>
        </AuthProvider>
    </BrowserRouter>
)
