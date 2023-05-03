import React from 'react';
import * as BsIcons from 'react-icons/bs'
import { Link } from 'react-router-dom';
import '../styles/Home.css'


const 
ProductCard = ({ id, name, price, oldPrice, installmentPrice, imageUrl, description }) => {
  return (
    <div className="hl-1 styleBox">
      <Link
        to='/favorites'
        className="favoriteIcon"
        alt="Icone Favoitos">
        <BsIcons.BsHeartFill />
      </Link>
      <Link to='/'>
        <img className="img-hl-1" src={imageUrl} alt={name} />
      </Link>
      <span>{name}</span>
      <span className=" oldPrice-hl-1 oldPrice-hl" > DE :{oldPrice} POR: </span>
      <span className=" currentPrice-hl-1 currentPrice-hl" >R${price},00</span>
      <span className=" installmentPrice-hl-1 installmentPrice-hl " >12x DE R${installmentPrice},00</span>
      <span className='descriptionProduct'>{description}</span>
      <Link className='button-buy' to={`/products/${id}`}> View Details</Link>
    </div>
  );
};

export default ProductCard;
