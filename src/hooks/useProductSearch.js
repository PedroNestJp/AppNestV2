import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

const useProductSearch = (searchInput) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const handleSearch = async () => {
      if (searchInput.trim() === '') {
        setSearchResults([]);
        return;
      }

      setLoading(true);
      setError('');

      try {
        const q = query(collection(db, 'products'), where('name', '>=', searchInput), where('name', '<=', searchInput + '\uf8ff'));
        const querySnapshot = await getDocs(q);
        const results = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setSearchResults(results);
      } catch (err) {
        setError('An error occurred while searching for products.');
      } finally {
        setLoading(false);
      }
    };

    const delaySearch = setTimeout(() => {
      handleSearch();
    }, 3000);

    return () => clearTimeout(delaySearch);
  }, [searchInput]);

  return { loading, error, searchResults };
};

export default useProductSearch;
