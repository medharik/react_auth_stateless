import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
   
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(user);
      navigate('/dashboard');
    } catch (err) {
      if (err.response && err.response.status === 422) {
        const messages = Object.values(err.response.data.errors)
          .flat()
          .join('\n');
        setError(messages);
      } else {
        setError("Erreur d'inscription.");
      }
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Inscription</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nom complet"
          value={user.name}
          onChange={handleChange}
          required
        />
        <br />

        <input
          type="email"
          name="email"
          placeholder="Adresse email"
          value={user.email}
          onChange={handleChange}
          required
        />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={user.password}
          onChange={handleChange}
          required
        />
        <br />

        <input
          type="password"
          name="password_confirmation"
          placeholder="Confirmation du mot de passe"
          value={user.password_confirmation}
          onChange={handleChange}
          required
        />
        <br />

        <button type="submit" disabled={loading}>
          {loading ? 'Inscription...' : 'Valider'}
        </button>
      </form>
    </div>
  );
};
