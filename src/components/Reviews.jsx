import { db } from "../firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { useAuth } from "../pages/contexts/AuthProvider";
import { useEffect, useState } from "react";

function Reviews({ productId }) {
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
    }
} export default Reviews