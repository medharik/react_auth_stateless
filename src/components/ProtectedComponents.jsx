import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';

export const ProtectedComponents = ({ children }) => {

    const { user, loading } = useAuth();
    if (loading) return (<div>chargement en cours....</div>)
    if (!user) return (<Navigate to={'/login'} />);
     else    return children;



}
