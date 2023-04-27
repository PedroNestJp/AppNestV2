import React from 'react';
import { useAuth } from './contexts/AuthProvider';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  return (
    <>
      <h1>Profile</h1>
      <div>Email: {user.email}</div>
      <p>
        {" "}
        Deseja alterar sua senha?{" "}
        <Link to="/resetPassword">
          {" "}
          <strong> Redefinir senha </strong>{" "}
        </Link>{" "}
      </p>
      <button onClick={logout} > Sair </button>
    </>
  );
};

export default ProfilePage;
