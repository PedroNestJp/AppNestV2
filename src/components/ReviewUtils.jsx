import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export async function getReviewCount(productId) {
  try {
    const q = query(collection(db, "reviews"), where("productId", "==", productId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  } catch (error) {
    console.error("Erro ao buscar o número de avaliações:", error);
    return 0;
  }
}
