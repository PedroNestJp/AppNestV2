import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ id, name, price, imageUrl, description }) => {
  return (
    <div>
      <img width={120} src={imageUrl} alt={name} />
      <div>{name}</div>
      <div>{price}</div>
      <div>{description}</div>
      <Link to={`/products/${id}`}>View Details</Link>
    </div>
  );
};

export default ProductCard;
