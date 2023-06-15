import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { RxMagnifyingGlass } from 'react-icons/rx';

function ProductsSearch() {
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      handleSearch();
    }, 600);
    return () => clearTimeout(delaySearch);
  }, [searchInput]);

  const handleSearchInputChange = (event) => {
    const input = event.target.value;
    setSearchInput(input);
  };

  const handleSearch = async () => {
    if (searchInput.trim() === '') {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const q = query(collection(db, 'products'), where('name', '>=', searchInput));
      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setSearchResults(results);
    } catch (err) {
      setError('An error occurred while searching for products.');
    }

    setLoading(false);
  };

  return (
    <form className="search" action="#">
      <input
        value={searchInput}
        onChange={handleSearchInputChange}
        className="inputSearch"
        id="busque-aqui"
        autoComplete="off"
        placeholder="Busque aqui"
        type="text"
      />
      <button
        className="button-submit"
        type="button"
        alt="icon-lupa"
        title="Pesquisar"
        onClick={handleSearch}
      >
        <RxMagnifyingGlass />
      </button>

      {loading && <p style={{color:'white'}}>Loading...</p>}
      {error && <p>{error}</p>}

      {searchResults.length > 0 && (
        <ul>
          {searchResults.map((product) => (
            <li style={{color:'white'}} key={product.id}>{product.name}</li>
          ))}
        </ul>
      )}
    </form>
  );
}

export default ProductsSearch;
