import { Navigate } from "react-router-dom";

import { useAuthStore } from "../config/zustand-store";

export const AuthorizedUser = ({ children }) => {
    const token = localStorage.getItem('token');

    if(!token){
        return <Navigate to={'/'} replace={true}/>
    }

    return children;
}


export const ProtectedRoute = ({ children }) => {
    const username = useAuthStore.getState().auth.username;
    if(!username){
        return <Navigate to={'/'} replace={true}/>
    }
    return children;
}