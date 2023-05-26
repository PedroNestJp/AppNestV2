import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import * as RxIcons from 'react-icons/rx';
import { db } from '../firebase';

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
      console.log(searchResults);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const q = query(collection(db, 'products'), where('name', '>=', searchInput));
      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setSearchResults(results);
      console.log(results)
    } catch (err) {
      setError('An error occurred while searching for products.');
    }

    setLoading(false);
    console.log(searchResults);
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
        <RxIcons.RxMagnifyingGlass onClick={handleSearch} />
      </button>
    </form>
  );
}

export default ProductsSearch;
