import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const SearchResults = () => {
  const [searchInput, setSearchInput] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      searchProducts();
    }, 300);

    return () => clearTimeout(delaySearch);
  }, [searchProducts]);

  const handleSearchInputChange = (event) => {
    const input = event.target.value;
    setSearchInput(input);
  };

  const searchProducts = async () => {
    if (searchInput.trim() === '') {
      setFilteredProducts([]);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const q = query(collection(db, 'products'), where('name', '>=', searchInput));
      const querySnapshot = await getDocs(q);
      const products = querySnapshot.docs.map((doc) => doc.data());
      setFilteredProducts(products);
    } catch (err) {
      setError('An error occurred while searching for products.');
    }

    setLoading(false);
  };

  return (
    <div>
      <input type="text" value={searchInput} onChange={handleSearchInputChange} />
      <button onClick={searchProducts}>Search</button>

      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {filteredProducts.length > 0 && (
  <ul>
    {filteredProducts.map((product) => (
      <li key={product.id}>{product.name}</li>
    ))}
  </ul>
)}
    </div>
  );
};

export default SearchResults;
