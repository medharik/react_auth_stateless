import axios from "../api/api";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const checkAuth = async () => {
            try {
                setLoading(true);
                const resp = await axios.get('/user');
                const user = resp.data;
                setUser(user);
                console.log('auth user',user)
              
            } catch (error) {
                setError(error);
                console.log('check auth', error)
            } finally {
                setLoading(false);
            }

        };
        checkAuth();
    }, []);
    const login = async (credentials) => {
        try {
            console.log('credential',credentials);
            const resp = await axios.post('/login', credentials);

            localStorage.setItem('token', resp.data.token);
            const repUser = await axios.get('/user');
            setUser(repUser.data);

        } catch (error) {
            console.log('login error', error)
        }
    }
    const logout = async () => {
        try {
             await axios.post('/logout');
            localStorage.removeItem('token');
            setUser(null);
            // setIsAuth(false);
        } catch (error) {
            console.log('logout error', error);
        }

    }
    const register = async (data) => {
        try {
          const rep=  axios.post('/register',data);
            console.log('register',rep);
           // login({email:user.email,password:user.password});
        } catch (error) {
            setError(error);
            console.log('erreur register', error);
        }


    }

    return (
        < AuthContext.Provider value={{error,loading,setError, user, login, register, logout, setUser, isAuth, setIsAuth, token, setToken }}>
            {children}
        </AuthContext.Provider >
    );
}
export const useAuth=()=>useContext(AuthContext);


