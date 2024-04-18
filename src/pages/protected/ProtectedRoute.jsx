import {useNavigate} from 'react-router-dom';
import { useToken } from '../../stores/useUserStore';
import { useEffect } from 'react';

export const ProtectedRoute = ({children}) => {
    const navigate = useNavigate();
    const token = useToken();

    useEffect(() =>{
        if(!token){
            navigate("/login");
        }
    })
    
    return children;
}