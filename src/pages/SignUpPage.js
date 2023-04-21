import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthProvider';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const history = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signup(email, password);
      history.push('/profile');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign up</h1>
      {error && <div>{error}</div>}
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
      </div>
      <button type="submit">Sign up</button>
    </form>
  );
};

export default SignUpPage;
