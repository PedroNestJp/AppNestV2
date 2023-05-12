import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDoc, doc, updateDoc, setDoc, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from './contexts/AuthProvider';
import "../styles/ProductDetailsPage.css"
import Cronometro from "../components/Contador"
import { Carousel } from 'react-responsive-carousel';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(collection(doc(db, 'users', user.uid), 'favorites'), (snapshot) => {
        setFavorites(snapshot.docs.map((doc) => doc.id));
      });
      return unsubscribe;
    }
  }, [user]);

  useEffect(() => {
    const getProduct = async () => {
      const productRef = doc(db, 'products', id);
      const snapshot = await getDoc(productRef);
      const data = snapshot.data();
      setProduct(data);
    };


    getProduct();
  }, [id]);

  const handleAddToFavorites = async (productId) => {
    if (favorites.includes(productId)) {
      alert('Este produto já está nos favoritos!');
      return;
    }

    try {
      const favoritesRef = doc(db, 'users', user.uid, 'favorites', productId);
      await setDoc(favoritesRef, { addedAt: new Date() });
      alert('Produto adicionado aos favoritos com sucesso ✅');
    } catch (error) {
      alert('Ocorreu um erro ao adicionar o produto aos favoritos: ' + error.message);
    }
  };

  const handleAddToCart = async () => {
    try {
      setIsLoading(true);
      const cartDoc = doc(db, 'carts', user.uid);
      const snapshot = await getDoc(cartDoc);


      if (snapshot.exists()) {
        const cart = snapshot.data();
        const productIndex = cart.items.findIndex(
          (item) => item.id === id
        );
        console.log(cart, productIndex)

        if (productIndex !== -1) {
          cart.items[productIndex].quantity++;
          console.log(productIndex)
        } else {
          cart.items.push({ id: id, quantity: 1 });
        }

        await updateDoc(cartDoc, cart);
        console.log(cart, cartDoc)
      } else {
        await setDoc(cartDoc, { items: [{ id: id, quantity: 1 }] });
      }
      alert('Produto adicionado ao carrinho com sucesso ✅')
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const { name, price, imageUrl, description } = product;

  return (
    <div className="mainContentProduct">
      <div className="containerProductFather">
        <div className='containerProductChild1'>
          <div className="imgProduct">
            <img className="imgPrincipal" src={imageUrl} alt={name} />
          </div>
           {/* <span className='imgsProductsSub'>
              <img id={name} src={imageUrl} alt={name} />
            </span>  */}

          <div className="containerProductDesc">
            <div className="promotionCall">
              <Cronometro />
              <div className='cardsPromo' >
                <div className='offerDiscaunt'>
                  <span> 2 </span>
                  <span> Vendidos </span>
                </div>
                <div className='numberOfSales'>
                  <span> 15% </span>
                  <span> Desconto no pix </span>
                </div>
              </div>

            </div>
            <div className="descText" >{description}</div>
            <div className="rating">
              <div className='ratingStars'> ⭐⭐⭐⭐⭐ </div>
              <div className='ratingText'> 2 avaliações </div>
            </div>
            <div className="hanking">
              <button className='buttonTop10'>
                TOP 10
              </button>
              <label> MAIS VENDIDOS</label>
            </div>
            <div className="value">
              <span className="oldPriceNestPcOneSc"> DE R${'oldPrice'} POR: </span>
              <span className="currentPriceProductScreen"> R${price} </span>
              <span className=" installmentPriceProductScreen"> OU 12X DE R${'installmentPrice'} </span>
              <span className="discountPix"> 10% de desconto no pix </span>
            </div >
          {user ? (
            <div className="addCart">
              <button className="addCartButton"
                onClick={() => handleAddToFavorites(id)}>
                Adicionar aos favoritos
              </button>
              <button className="addCartButton"
                onClick={handleAddToCart}
                disabled={isLoading}>
                Adicionar ao carrinho
              </button>
            </div>
          ) : (' Algo deu errado')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;


