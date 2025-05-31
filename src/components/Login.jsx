import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
   const {login,setError} = useAuth();
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate();
const handleLogin=async (e)=>{
    e.preventDefault();
   try {
    await   login(credentials);
     navigate('/dashboard');
   } catch (error) {
    console.log(error);
    setError(error);
    alert('Identifiants incorrects');

   }

}
    return (
        <div>

            <form onSubmit={handleLogin}>

                <input type="email" name="email" placeholder="Email" value={credentials.email} onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} />
                <input type="password" name="password" placeholder="Email" value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
                <button>Connexion</button>
            </form>
        </div>
    )
}
