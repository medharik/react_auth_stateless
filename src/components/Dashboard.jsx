import React from 'react'
import { useAuth } from '../context/AuthContext';

export const Dashboard = () => {
    const { user, logout } = useAuth();

    return (
      <div>
        <h1>Bienvenue, {user.name}</h1>
        <button onClick={logout}>Se déconnecter</button>
      </div>
    );
}
