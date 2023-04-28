import React from 'react';
import { useAuth } from './contexts/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      {user ? (
        <>
          <h1>Profile</h1>
          <div>Email: {user.email}</div> {/* Removing unnecessary null check */}
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
          {navigate('/login')}
        </>
      )}
    </>
  );
};

export default ProfilePage;
