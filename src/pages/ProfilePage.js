import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const Logout = async () => {
  try {
    await signOut(auth);
    alert("Usuário deslogado com sucesso!");
    console.log("Usuário deslogado com sucesso!");
  } catch (error) {
    console.error(error.message);
  }
};

const ProfilePage = () => {
  return (
    <>
      <h1>Profile</h1>
      <div>Email: {auth.user.email}</div>
      <p>
        {" "}
        Deseja alterar sua senha?{" "}
        <Link to="/resetPassword">
          {" "}
          <strong> Redefinir senha </strong>{" "}
        </Link>{" "}
      </p>
      <button onClick={Logout}>Logout</button>
    </>
  );
};

export default ProfilePage;
