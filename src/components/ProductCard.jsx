import React, { useEffect, useState } from "react";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Home.css";
import { db } from "../firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../pages/contexts/AuthProvider";
import LoadingOverlay from "./LoadingOverlay";
import {useAlert} from "../pages/contexts/AlertContext";
import Alert from "../utils/Alert";

const ProductCard = ({
  id,
  name,
  price,
  oldPrice,
  installmentPrice,
  imageUrl,
  description,
}) => {
  const [favorites, setFavorites] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const { user } = useAuth();
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    const favoritesDoc = doc(collection(db, "favorites"), user.uid);
    getDoc(favoritesDoc)
      .then((doc) => {
        if (doc.exists()) {
          const { products } = doc.data();
          setFavorites(products);
          setIsFavorite(products.includes(id));
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, [user, id]);

  const handleAddToFavorites = (productId) => {
    const updatedFavorites = isFavorite
      ? favorites.filter((id) => id !== productId)
      : [...favorites, productId];
    const favoritesDoc = doc(collection(db, "favorites"), user.uid);
    setDoc(favoritesDoc, { products: updatedFavorites })
      .then(() => {
        setFavorites(updatedFavorites);
        setIsFavorite(!isFavorite);
      })
      .catch((error) => {
        console.error("Error adding product to favorites:", error);
      });
  };

  if (!ProductCard) {
    return <LoadingOverlay />;
  }

  const handleRedirectToLogin = () => {
    showAlert("Faça login para continuar.");
    navigate("/login");
  };

  return (
    <>
      <Alert />
      <div className="hl-1 styleBox">
        <button
          onClick={() => {
            if (user !== null) {
              handleAddToFavorites(id);
            } else {
              handleRedirectToLogin();
            }
          }}
          className="favoriteIcon"
          alt="Icone Favoitos"
          title={
            isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"
          }
        >
          {isFavorite ? (
            <BsHeartFill
              style={{
                color: "#e20100",
                height: "1.5rem",
                width: "1.5rem",
                backgroundColor: "white",
              }}
            />
          ) : (
            <BsHeart
              style={{
                height: "1.5rem",
                width: "1.5rem",
                backgroundColor: "white",
              }}
            />
          )}
        </button>
        <Link to="/">
          <img className="img-hl-1" src={imageUrl} alt={name} />
        </Link>
        <span>{name}</span>
        <span className="oldPrice"> DE: {oldPrice},00 POR:</span>
        <span className="currentPrice">R${price},00</span>
        <span className="installmentPrice">10x DE R${installmentPrice},00</span>
        <span className="descriptionProduct">{description}</span>
        <Link className="button-buy" to={`/products/${id}`}>
          Ver Detalhes
        </Link>
      </div>
    </>
  );
};

export default ProductCard;
