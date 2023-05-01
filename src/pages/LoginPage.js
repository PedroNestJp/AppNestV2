import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthProvider';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(email, password);
      navigate('/profile');
    } catch (error) {
      setError(error.message);
    }
  };

  return (

    <>
      {user ? (
        <div>
          <h1> Você Já está logado </h1>
          <h2>
            <p> Deseja fazer login com
              <Link onClick={logout} to='/login' style={{ color: '#f00' }}>
                {' '}outra conta
              </Link>
              {' '}ou voltar para a
              <Link to='/' style={{ color: '#f00' }}>
                {' '}tela inicial
              </Link>
              ?
            </p>
          </h2>
        </div>
      ) : (
        <>

          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            {error ? (
              <div style={{ color: 'red' }}> {console.log(error)}
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
            Ainda não tem uma conta? faça o seu <Link to={'/signup'} style={{color:'#f00'}}> Cadastro </Link>{' '}
          </p>
        </>)}
    </>
  );
};

export default LoginPage;
