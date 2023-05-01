import React, { useEffect } from 'react';
import { useAuth } from './contexts/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isAdmin = 
  auth.currentUser.uid === process.env.REACT_APP_USER_ADMIN_UID ? true  : null

  useEffect(() => {
    if (!user) {
      alert('Faça seu login para acessar o seu perfil')
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <>
      { isAdmin ? (
        <>
          <h1> Olá {auth.currentUser.email}</h1>
          <li>
            <Link to='/admin' style={{color:'#f00'}} > Admin Page </Link>
          </li>
        </>
      ) : ( console.log('no admin access')

      )}
      {user ? (
        <>
          <h1>Profile</h1>
          <div>Email: {user.email}</div>
          <p>
            Deseja alterar sua senha?
            <Link to="/resetPassword" style={{color:'#f00'}}>
              <strong>Redefinir senha</strong>
            </Link>
          </p>
          <p> nome : {user.displayName} </p>
          <button onClick={logout} >Sair</button>
        </>
      ) : (
        <>
          <div>Faça o seu Login</div>
        </>
      )}
    </>
  )
}

export default ProfilePage;
