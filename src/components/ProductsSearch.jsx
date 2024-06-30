import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RxMagnifyingGlass } from 'react-icons/rx';

function ProductsSearch() {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = () => {
    navigate(`/results?query=${searchInput}`);
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
      </form>
  );
}

export default ProductsSearch;
