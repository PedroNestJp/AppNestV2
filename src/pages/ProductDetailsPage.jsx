import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getDoc,
  doc,
  updateDoc,
  setDoc,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "./contexts/AuthProvider";
import "../styles/ProductDetailsPage.css";
import Cronometro from "../components/Contador";
import ProductReview from "../components/ProductReview";
import { getReviewCount } from "../components/ReviewUtils";
import { BsStarFill, BsFillCollectionFill } from "react-icons/bs";
import { FaFileSignature, FaTools, FaTruck } from "react-icons/fa";
import Header from "../components/Header";

const ProductDetailsPage = (productId) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [reviewCount, setReviewCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviewCount = async () => {
      const count = await getReviewCount(productId);
      setReviewCount(count);
      console.log(count);
    };

    fetchReviewCount();
  }, [productId]);
  console.log(productId);
  console.log(reviewCount);

  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(
        collection(doc(db, "users", user.uid), "favorites"),
        (snapshot) => {
          setFavorites(snapshot.docs.map((doc) => doc.id));
        }
      );
      return unsubscribe;
    }
  }, [user]);

  useEffect(() => {
    const getProduct = async () => {
      const productRef = doc(db, "products", id);
      const snapshot = await getDoc(productRef);
      const data = snapshot.data();
      setProduct(data);
    };

    getProduct();
  }, [id]);

  const handleAddToFavorites = async (productId) => {
    if (favorites.includes(productId)) {
      alert("Este produto já está nos favoritos!");
      return;
    }

    try {
      const favoritesRef = doc(db, "users", user.uid, "favorites", productId);
      await setDoc(favoritesRef, { addedAt: new Date() });
      alert("Produto adicionado aos favoritos com sucesso ✅");
    } catch (error) {
      alert(
        "Ocorreu um erro ao adicionar o produto aos favoritos: " + error.message
      );
    }
  };

  const handleAddToCart = async () => {
    try {
      setIsLoading(true);
      const cartDoc = doc(db, "carts", user.uid);
      const snapshot = await getDoc(cartDoc);

      if (snapshot.exists()) {
        const cart = snapshot.data();
        const productIndex = cart.items.findIndex((item) => item.id === id);
        console.log(cart, productIndex);

        if (productIndex !== -1) {
          cart.items[productIndex].quantity++;
          console.log(productIndex);
        } else {
          cart.items.push({ id: id, quantity: 1 });
        }

        await updateDoc(cartDoc, cart);
        console.log(cart, cartDoc);
      } else {
        await setDoc(cartDoc, { items: [{ id: id, quantity: 1 }] });
      }
      alert("Produto adicionado ao carrinho com sucesso ✅");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const { name, price, imageUrl, description, oldPrice, installmentPrice } =
    product;

  return (
    <>
      <Header />

      <div className="mainContentProduct">
        <div className="containerProductFather">
          <div className="containerProductChild1">
            <div className="imgProduct">
              {/* <span className='imgsProductsSub'>
              <img id={name} src={imageUrl} alt={name} />
              <img id={name} src={imageUrl} alt={name} />
              <img id={name} src={imageUrl} alt={name} />
            </span>   */}
              <img className="imgPrincipal" src={imageUrl} alt={name} />
            </div>

            <div className="containerProductDesc">
              <div className="promotionCall">
                <Cronometro />
                <div className="cardsPromo">
                  <div className="offerDiscaunt">
                    <span> 2 </span>
                    <span> Vendidos </span>
                  </div>
                  <div className="numberOfSales">
                    <span> 15% </span>
                    <span> Desconto no pix </span>
                  </div>
                </div>
              </div>
              <div className="descText">{description}</div>
              <div className="rating">
                <div className="ratingStars"> ⭐⭐⭐⭐⭐ {reviewCount} </div>
              </div>
              <div className="hanking">
                <button className="buttonTop10">TOP 10</button>
                <label> MAIS VENDIDOS</label>
              </div>
              <div className="value">
                <span className="oldPriceNestPcOneSc">
                  {" "}
                  DE R${oldPrice} POR:{" "}
                </span>
                <span className="currentPriceProductScreen"> R${price} </span>
                <span className=" installmentPriceProductScreen">
                  {" "}
                  OU 12X DE R$ {installmentPrice}{" "}
                </span>
                <span className="discountPix"> 10% de desconto no pix </span>
              </div>
              <div className="addCart">
                <button
                  className="addCartButton"
                  onClick={() =>
                    user !== null
                      ? handleAddToFavorites(id)
                      : (alert("faça seu login para então favoritar itens"),
                        navigate("/login"))
                  }
                >
                  Adicionar aos favoritos
                </button>
                <button
                  className="addCartButton"
                  disabled={isLoading}
                  onClick={() =>
                    user !== null
                      ? handleAddToCart(id)
                      : (alert(
                          "Faça seu login para então adicionar itens ao carrinho"
                        ),
                        navigate("/login"))
                  }
                >
                  Adicionar ao carrinho
                </button>
              </div>
            </div>
          </div>
        </div>
        <div></div>
        <div className="containerProductChild2">
          <div className="reviewsArea">
            <h1 className="reviewsTitle">
              {" "}
              <BsStarFill /> Avaliações{" "}
            </h1>
            <div className="reviews">
              {" "}
              <ProductReview productId={product} />{" "}
            </div>
          </div>
          <div className="descArea">
            <h1 className="descTitle">
              {" "}
              <BsFillCollectionFill /> Descrição{" "}
            </h1>
            <div className="desc"> {product.description} </div>
            <div className="desc img">
              <img
                alt="imageProduct"
                title="imagem do produto"
                src={imageUrl}
              />
            </div>
          </div>
        </div>
        <div class="serviceIncluded">
          <div class="mounting">
            <FaTools
              class="img-serviceIncluded"
              src="https://hotsite.pichau.com.br/descricao/descpc/montagem.svg"
              alt=""
            />
            <h5>MONTAGEM</h5>
            <p>
              Os computadores serão montados. Acompanham BIOS e Drivers
              atualizados. Todos os cabos são posicionados pela parte traseira
              do gabinete dando uma aparência mais limpa ao computador.
            </p>
          </div>
          <div class="delivery">
            <FaTruck
              class="img-serviceIncluded"
              src="https://hotsite.pichau.com.br/descricao/descpc/entrega.svg"
              alt=""
            />
            <h5>ENTREGA</h5>
            <p>
              São enviadas todas as caixas e acessórios presentes nos
              equipamentos. Embalado com caixa de papelão de ondas duplas e
              fitas de segurança com cola quimicamente ativa.
            </p>
          </div>
          <div class="warranty">
            <FaFileSignature
              class="img-serviceIncluded"
              src="https://hotsite.pichau.com.br/descricao/descpc/garantia.svg"
              alt=""
            />
            <h5>GARANTIA</h5>
            <p>
              A garantia é por peça, o prazo será indicado na nota fiscal. Os
              computadores acompanham lacres de seurança, portanto não poderá
              abrir seu gabinete e modificar pois ocasionará perca total da
              garantia
            </p>
          </div>
        </div>
        <article class="PrDtPgWarnings">
          <h4 class="laranja">ATENÇÃO</h4>
          <p>- Se atente à Entradas de Vídeo escolhidas no ato do pedido. </p>
          <p>
            <strong>
              Algumas placas de vídeo não possuem saída de vídeo VGA
            </strong>{" "}
            impossibilitando a utilização de alguns monitores.
            <br />
          </p>
          <p>
            Caso haja algum erro ou incompatibilidade na escolha, será entrado
            em contato com o cliente avisando sobre, porém, o cliente ao
            finalizar o pedido via Full Custom já se declara ciente que tal
            situação foge ao controle da TerabyteShop e a mesma não possui
            responsabilidade nem dever de arcar com custos extras em virtude da
            escolha de produtos incompatíveis.
          </p>
          <br />
          <p>
            - Caso tenha alguma dificuldade com a escolha dos itens e
            customização da configuração, você pode{" "}
            <strong>contatar o atendimento para auxilio</strong> no link à
            seguir:
          </p>
          <strong>
            <Link to="">
              <span>CLIQUE AQUI!</span>
            </Link>
          </strong>
          <br />- Gabinetes com a informação{" "}
          <strong>S-FAN não acompanham os fans</strong>. As imagens são
          meramente ilustrativas.
          <br />
        </article>
      </div>
    </>
  );
};

export default ProductDetailsPage;
