import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getDoc,
  doc,
  updateDoc,
  setDoc,
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "./contexts/AuthProvider";
import "../styles/ProductDetailsPage.css";
import Cronometro from "../components/Contador";
import { getReviewCount } from "../components/ReviewUtils";
import { BsStarFill, BsFillCollectionFill } from "react-icons/bs";
import { FaFileSignature, FaTools, FaTruck } from "react-icons/fa";
import Header from "../components/Header";

function ProductReview({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [reviewCount, setReviewCount] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Consulta as avaliações do produto no Firebase
        const q = query(
          collection(db, "reviews"),
          where("productId", "==", productId)
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => doc.data());
        setReviews(data);

        // Obtem o número total de avaliações
        setReviewCount(querySnapshot.size);
      } catch (error) {
        console.error("Erro ao buscar as avaliações:", error);
      }
    };

    fetchReviews();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Salva a nova avaliação no Firebase
      const reviewData = {
        productId,
        review: newReview,
        userName: user.displayName, // Captura o ID do usuário autenticado
      };

      await addDoc(collection(db, "reviews"), reviewData);

      // Limpa o campo de nova avaliação
      setNewReview("");
    } catch (error) {
      console.error("Erro ao enviar a avaliação:", error);
    }
  };

  return (
    <div className="userReviewArea">
      <div className="inputReviewArea">
        <form className="formReviewArea" onSubmit={handleSubmit}>
          <input
            type="text"
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Adicione uma avaliação"
          />
          <button className="btn reviewBtn" type="submit">
            Enviar Avaliação
          </button>
        </form>
      </div>
      <div className="ratingText">
        <Link to="#reviewsArea"> ({reviewCount}) avaliações </Link>{" "}
      </div>
      {reviews.length > 0 ? (
        <ul className="ulReviewArea">
          {reviews.map((review, index) => (
            <li id="reviewsArea" key={index}>
              {review.review} -{" "}
              {review.userName && (
                <>
                  <strong>Usuário: </strong>
                  {review.userName}
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma avaliação disponível.</p>
      )}
    </div>
  );
}

export {};

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Consulta o documento do produto no Firebase
        const productRef = doc(db, "products", id);
        const productSnapshot = await getDoc(productRef);

        if (productSnapshot.exists()) {
          const productData = productSnapshot.data();
          setProduct(productData);
        } else {
          console.log("Produto não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar o produto:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    // Implementar a lógica para adicionar o produto ao carrinho
  };

  return (
    <div className="productDetailsPage">
      <Header />
      <div className="productDetailsContainer">
        {product ? (
          <>
            <div className="productImage">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="productInfo">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <div className="productDetails">
                <div className="productRating">
                  <BsStarFill className="starIcon" />
                  <span>{product.rating}</span>
                </div>
                <div className="productCategory">
                  <BsFillCollectionFill className="categoryIcon" />
                  <span>{product.category}</span>
                </div>
              </div>
              <div className="productFeatures">
                <div className="feature">
                  <FaFileSignature className="featureIcon" />
                  <span>{product.features}</span>
                </div>
                <div className="feature">
                  <FaTools className="featureIcon" />
                  <span>{product.specs}</span>
                </div>
                <div className="feature">
                  <FaTruck className="featureIcon" />
                  <span>Entrega em até {product.deliveryTime} dias</span>
                </div>
              </div>
              <div className="productActions">
                <button className="btn addToCartBtn" onClick={handleAddToCart}>
                  Adicionar ao Carrinho
                </button>
                <Link to="/cart" className="btn viewCartBtn">
                  Ver Carrinho
                </Link>
              </div>
            </div>
          </>
        ) : (
          <p>Carregando detalhes do produto...</p>
        )}
      </div>
      <div className="productReviewSection">
        <h3>Avaliações</h3>
        {/* {product &&
          {
            <ProductReview productId={id} 
          }} */}
      </div>
    </div>
  );
};

export { ProductDetailsPage, ProductReview };
