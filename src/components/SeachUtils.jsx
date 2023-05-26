import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

export const searchProducts = async (searchInput) => {
  if (searchInput.trim() === '') {
    return [];
  }

  try {
    const q = query(collection(db, 'products'), where('name', '>=', searchInput));
    const querySnapshot = await getDocs(q);
    const results = querySnapshot.docs.map((doc) => doc.data());
    return results;
  } catch (err) {
    console.error('An error occurred while searching for products:', err);
    return [];
  }
};
