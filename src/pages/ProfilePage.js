import React from 'react';
import { useAuth } from './contexts/AuthProvider';

const ProfilePage = () => {
  const { user, logout } = useAuth();
console.log(user)
  return (
    <>
      <h1>Profile</h1>
      <div>Email: {user.email}</div>
      <button onClick={logout}>Logout</button>
    </>
  );
};

export default ProfilePage;
