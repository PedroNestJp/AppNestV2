import React from 'react';
import * as BsIcons from 'react-icons/bs'
import { Link } from 'react-router-dom';
import '../styles/Home.css'


const ProductCard = ({ id, name, price, imageUrl, description }) => {
  return (
    <div className="hl-1 styleBox">
      <Link
        to='/login'
        className="favoriteIcon"
        alt="Icone Favoitos">
        <BsIcons.BsHeartFill />
      </Link>
      <Link to='/nestpcGamer_1'>
        <img className="img-hl-1" src={imageUrl} alt={name} />
      </Link>
      <span>{name}</span>
      <span className=" currentPrice-hl-1 currentPrice-hl" >{price}</span>
      <span className='descriptionProduct'>{description}</span>
      <Link className='button-buy' to={`/products/${id}`}> View Details</Link>
    </div>
  );
};

<div className="hl-1 styleBox">
  <Link
    to='/login'
    className="favoriteIcon"
    alt="Icone Favoitos">
    <BsIcons.BsHeartFill />
  </Link>
  <Link to='/nestpcGamer_1'>
    <img
      className="img-hl-1"
      srcSet={''}
      alt=""
    />
  </Link>

  <div className="descValue  desc-hl-1">
    <span className='descriptionProduct' > NESTPC GAMER, i3-10100f, GTX1650 4GB GDDR6, 16GB RAM 3200MHZ 2X8GB, SSD 512GB, FONTE 500W 80+ BRONZE, 3 FANS RGB</span>
    <span className="oldPrice-hl-1 oldPrice-hl"> DE R$2.999,00 POR: </span>
    <span className=" currentPrice-hl-1 currentPrice-hl"> R$2.599,00 </span>
    <span className=" installmentPrice-hl-1 installmentPrice-hl "> OU 12X DE R$280,00 </span>
  </div>
  <Link className='button-buy' to='/nestPcOne'>
    VER MAIS
    <button> </button>
  </Link>
</div>

export default ProductCard;
