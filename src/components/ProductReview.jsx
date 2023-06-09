import { useState, useEffect } from "react";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../pages/contexts/AuthProvider";
import { Link } from "react-router-dom";
import "../styles/ProductDetailsPage.css";
import { BsStarFill } from "react-icons/bs";

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
      alert("Agradecemos a sua avaliação");

      // Limpa o campo de nova avaliação
      setNewReview("");
    } catch (error) {
      console.error("Erro ao enviar a avaliação:", error);
    }
  };

  return (
    <div className="userReviewArea">
      <div className="inputReviewArea">
        <h2 className="reviewsTitle">
          <BsStarFill /> Adicione uma avalição
        </h2>
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
      <div className="reviewsArea">
        <h2 className="reviewsTitle">
          <BsStarFill /> Avaliações
        </h2>
        <div className="ratingText">
          <Link to="#reviewsArea"> ({reviewCount}) avaliações </Link>{" "}
        </div>
        {reviews.length > 0 ? (
          <div className="ulReviewArea">
            {reviews.map((review, index) => (
              <div className="reviewsArea">
                <div id="reviewsArea" key={index}>
                  <p className="liReview"> {review.review} - </p>
                  <p className="liUserReview">
                    {review.userName && (
                      <>
                        <strong>Usuário: </strong>
                        {review.userName}
                      </>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Nenhuma avaliação disponível.</p>
        )}
      </div>
    </div>
  );
}

export default ProductReview;
