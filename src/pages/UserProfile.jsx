import React, { useEffect, useState } from 'react';
import { useAuth } from "./contexts/AuthProvider";
import { doc, getDoc } from 'firebase/firestore';
import '../styles/UserProfile.css';
import { auth, db } from '../firebase';

const UserProfile = () => {
  const firebase = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      const userSnapshot = await getDoc(userDocRef);
      if (userSnapshot.exists()) {
        setUserData(userSnapshot.data());
      }
    };

    fetchUserData();
  }, [firebase]);
  console.log(firebase)

  if (!userData) {
    console.log(userData)
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile">
      <img src={userData.profilePicture} alt="Profile" className="profile-picture" />
      <h2 className="username">{userData.username}</h2>
      <p className="email">{userData.email}</p>
      {/* Aqui você pode exibir outros dados do usuário, como endereço, telefone, etc. */}
      <h3>Favoritos:</h3>
      <ul className="favorites-list">
        {userData.favorites.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <h3>Carrinho de Compras:</h3>
      <ul className="cart-list">
        {userData.cart.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;
