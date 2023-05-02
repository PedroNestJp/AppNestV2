import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db, auth } from "../firebase";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(doc(db, "users", auth.currentUser.uid), "favorites"),
      (snapshot) => {
        const newFavorites = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFavorites(newFavorites);
      }
    );

    return unsubscribe;
  }, []);

  const handleRemoveFavorite = async (favoriteId) => {
    try {
      const favoriteRef = doc(
        db,
        "users",
        auth.currentUser.uid,
        "favorites",
        favoriteId
      );
      await favoriteRef.delete();
      alert("Produto removido dos favoritos com sucesso!");
    } catch (error) {
      console.error(error);
    }
  };

  if (!auth.currentUser) {
    navigate("/login");
    return null;
  }

  return (
    <div>
      <h1>Meus Favoritos</h1>
      <ul>
        {favorites.map((favorite) => (
          <>
            <li key={favorite.id}> {favorite.id} </li>
            <li key={favorite.id}> {favorite.name} </li>
            <li key={favorite.id}> {favorite.description} </li>
            <li key={favorite.id}> {favorite.pldPrice} </li>
            <li key={favorite.id}> {favorite.price} </li>
            <li key={favorite.id}> {favorite.installmentPrice} </li>
            <button onClick={() => handleRemoveFavorite(favorite.id)}>
              Remover dos favoritos
            </button>
          </>
        ))}
      </ul>
    </div>
  );
};
export default FavoritesPage;
