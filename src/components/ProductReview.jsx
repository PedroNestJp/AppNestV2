import { useState, useEffect } from "react";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import "../styles/ProductDetailsPage.css";
import { BsStarFill } from "react-icons/bs";

function ProductReview({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [reviewCount, setReviewCount] = useState(0);
  const navigate = useNavigate(); // Call useNavigate directly

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
      if (!user) {
        // Add this check to ensure the user is logged in before submitting a review
        alert("Faça seu login para poder fazer uma avaliação");
        return;
      }

      const reviewData = {
        productId,
        review: newReview,
        userName: user.displayName,
        userId: user.uid, // Add the UID of the current user to the review data
      };

      await addDoc(collection(db, "reviews"), reviewData);
      alert("Agradecemos a sua avaliação");

      setNewReview("");

      // Reload the page after submitting the review
      window.location.reload();
    } catch (error) {
      console.error("Erro ao enviar a avaliação:", error);
    }
  };

  const user = auth.currentUser; // Add this line to get the current logged in user

  return (
    <div className="userReviewArea">
      <div className="inputReviewArea">
        <h2 className="reviewsTitle">
          <BsStarFill /> Avaliações
        </h2>
        <form className="formReviewArea" onSubmit={handleSubmit}>
          <input
            type="text"
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Digite aqui"
          />
          {user ? (
            <button
              onClick={handleSubmit}
              className="btn reviewBtn"
              type="submit"
            >
              Enviar
            </button>
          ) : (
            <Link to="/login">
              <button className="btn reviewBtn" type="submit">
                Enviar
              </button>
            </Link>
          )}
        </form>
      </div>
      <div className="reviewsAreaMain">
        <h2 className="reviewsTitle">
          <BsStarFill /> Avaliações
        </h2>
        {reviews.length > 0 ? (
          <div className="ulReviewArea">
            <div className="ratingText">
              <Link to="#reviewsArea"> ({reviewCount}) avaliações </Link>{" "}
            </div>
            {reviews.map((review) => (
              <div className="reviewsArea" key={review.id}>
                <div className="reviewArea" id="reviewArea">
                  <div className="liUserReview">
                    {review.userName && (
                      <>
                        <strong>Usuário: </strong>
                        {review.userName}
                      </>
                    )}
                  </div>
                  <div className="lineProducDeails"> </div>
                  <div className="review"> {review.review} </div>
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
