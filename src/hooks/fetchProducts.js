import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

export const useFetchProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const productsCol = collection(db, 'products');
          const snapshot = await getDocs(productsCol);
          const productsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setProducts(productsData);
        } catch (error) {
          console.error('Error fetching products:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchProducts();
    }, []);
  
    return { products, loading };
  };