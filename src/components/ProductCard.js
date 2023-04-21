import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ id, name, price, imageUrl }) => {
  return (
    <div>
      <img src={imageUrl} alt={name} />
      <div>{name}</div>
      <div>{price}</div>
      <Link to={`/products/${id}`}>View Details</Link>
    </div>
  );
};

export default ProductCard;
