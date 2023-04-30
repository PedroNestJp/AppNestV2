import React, { useEffect } from 'react';
import { useAuth } from './contexts/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      alert('Faça seu login para acessar o seu perfil')
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <>
      {user ? (
        <>
          <h1>Profile</h1>
          <div>Email: {user.email}</div>
          <p>
            Deseja alterar sua senha?
            <Link to="/resetPassword">
              <strong>Redefinir senha</strong>
            </Link>
          </p>
          <button onClick={logout}>Sair</button>
        </>
      ) : (
        <>
          <div>Faça o seu Login</div>
        </>
      )}
    </>
  );
};

export default ProfilePage;
