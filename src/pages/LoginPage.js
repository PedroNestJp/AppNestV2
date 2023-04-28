import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthProvider';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate(); // Changed useNavigate to useHistory

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(email, password);
      navigate('/profile'); //Changed navigate to push
    } catch (error) {
      setError(error.message); //Removed console.log
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        {error ? (
          <div style={{color: 'red'}}> {console.log(error)}
            Os dados fornecidos não estão corretos ou você ainda não possui uma conta
          </div>
          
        ) : null}
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Ainda não tem uma conta? faça o seu <Link to={'/signup'}> Cadastro </Link>{' '}
      </p>
    </>
  );
};

export default LoginPage;
