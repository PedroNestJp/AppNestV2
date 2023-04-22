import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ id, title, price, imageUrl, desc }) => {
  return (
    <div>
      <img src={imageUrl} alt={title} />
      <div>{title}</div>
      <div>{price}</div>
      <div>{desc}</div>
      <Link to={`/products/${id}`}>View Details</Link>
    </div>
  );
};

export default ProductCard;
