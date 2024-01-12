import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getDoc,
  doc,
  updateDoc,
  setDoc,
  collection
} from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../contexts/AuthProvider";
import "../../styles/ProductDetailsPage.css";
import Cronometro from "../../components/Contador";
import ProductReview from "../../components/ProductReview";
import { BsFillCollectionFill } from "react-icons/bs";
import {
  FaCartPlus,
  FaFileSignature,
  FaPlusCircle,
  FaTools,
  FaTruck,
} from "react-icons/fa";
import Header from "../../components/Header";
import Reviews from "../../components/Reviews";
import LoadingOverlay from "../../components/LoadingOverlay";
import ModalAlert from "../../components/ModalAlert";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    const favoritesDoc = doc(collection(db, "favorites"), user.uid);
    getDoc(favoritesDoc)
      .then((doc) => {
        if (doc.exists()) {
          const { products } = doc.data();
          setFavorites(products);
          setIsFavorite(products.includes(id));
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, [user, id]);

  

  const handleAddToFavorites = (productId) => {
    const updatedFavorites = isFavorite
      ? favorites.filter((id) => id !== productId)
      : [...favorites, productId];
    const favoritesDoc = doc(collection(db, "favorites"), user.uid);
    setDoc(favoritesDoc, { products: updatedFavorites })
      .then(() => {
        setFavorites(updatedFavorites);
        setIsFavorite(!isFavorite);
        setAlertMessage("Produto adicionado a lista de desejos ✅")
      })
      .catch((error) => {
        console.error("Error adding product to favorites:", error);
      });
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const productRef = doc(db, "products", id);
        const snapshot = await getDoc(productRef);
        if (snapshot.exists()) {
          setProduct(snapshot.data());
        }
      } catch (error) {
        console.error(error);
      }
    };

    getProduct();
  }, [id]);

  

  const handleAddToCart = async () => {
    try {
      setIsLoading(true);
      const cartDoc = doc(db, "carts", user.uid);
      const snapshot = await getDoc(cartDoc);

      if (snapshot.exists()) {
        const cart = snapshot.data();
        const productIndex = cart.items.findIndex((item) => item.id === id);

        if (productIndex !== -1) {
          cart.items[productIndex].quantity++;
        } else {
          const productRef = doc(db, "products", id);
          const productSnapshot = await getDoc(productRef);
          const productData = productSnapshot.data();
          cart.items.push({ id: id, quantity: 1, product: productData });
        }

        await updateDoc(cartDoc, cart);
      } else {
        const productRef = doc(db, "products", id);
        const productSnapshot = await getDoc(productRef);
        const productData = productSnapshot.data();
        await setDoc(cartDoc, {
          items: [{ id: id, quantity: 1, product: productData }],
        });
      }
      setAlertMessage("Produto adicionado ao carrinho com sucesso ✅");
    } catch (error) {
      console.error(error);
      setAlertMessage("Ocorreu um erro ao adicionar o produto ao carrinho.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!product) {
    return <LoadingOverlay />;
  }

  const { name, price, imageUrl, description, oldPrice, installmentPrice } =
    product;

  const handleRedirectToLogin = () => {
    setAlertMessage("Faça login para continuar.");
    navigate("/login");
  };

  return (
    <div className="productDetailsPageMain" >
      <Header />
      <div className="mainContentProduct">
        <div className="containerProductFather">
          <div className="containerProductChild1">
            <div className="imgProduct">
              <img className="imgPrincipal" src={imageUrl} alt={name} />
              <div className="descText">{description}</div>
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
                    <span> 10% </span>
                    <span> Desconto no pix </span>
                  </div>
                </div>
              </div>
              <div className="areaDescriptionPrdct">
                <div className="rating">
                  <div className="ratingStars">
                    {Reviews}
                    <a href="#reviewsArea"> ⭐⭐⭐⭐⭐</a>{" "}
                  </div>
                </div>
                <div className="hanking">
                  <button className="buttonTop10">TOP 10</button>
                  <label> MAIS VENDIDOS</label>
                </div>
                <div className="value">
                  <span className="oldPriceSpan">
                    DE<p className="oldPrice">R${oldPrice},99</p> POR:
                  </span>
                  <span className="currentPriceProductScreen">
                    R${price},99
                  </span>
                  <span className=" installmentPriceProductScreen">
                    OU 10X DE R$ {installmentPrice},99
                  </span>
                  <span className="discountPix">10% de desconto no pix</span>
                </div>
                <div className="addCart">
                  <button
                    className="btnBuyNow"
                    disabled={isLoading}
                    onClick={() => {
                      if (user !== null) {
                        handleAddToCart(id);
                      } else {
                        handleRedirectToLogin();
                      }
                    }}
                  >
                    COMPRAR AGORA
                  </button>
                  {alertMessage && (
                    <ModalAlert
                      message={alertMessage}
                      onClose={() => {
                        setAlertMessage(null);
                      }}
                    />
                  )}

                  <button
                    className="addCartButton"
                    disabled={isLoading}
                    onClick={() => {
                      if (user !== null) {
                        handleAddToCart(id);
                      } else {
                        handleRedirectToLogin();
                      }
                    }}
                  >
                    <FaCartPlus /> ADICIONAR AO CARRINHO
                  </button>
                  {alertMessage && (
                    <ModalAlert
                      message={alertMessage}
                      onClose={() => {
                        setAlertMessage(null);
                      }}
                    />
                  )}

                  <button
                    style={{ height: "2rem" }}
                    className="addCartButton"
                    onClick={() => {
                      if (user !== null) {
                        handleAddToFavorites(id);
                      } else {
                        handleRedirectToLogin();
                      }
                    }}
                  >
                    <FaPlusCircle /> ADICIONAR A LISTA DE DESEJOS
                  </button>
                  {alertMessage && (
                    <ModalAlert
                      message={alertMessage}
                      onClose={() => {
                        setAlertMessage(null);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Reviews Area */}
        <div id="reviews" className="reviews">
          <ProductReview productId={product} />
        </div>
        {/* descArea */}
        <div className="descArea">
          <h2 className="descTitle">
            {" "}
            <BsFillCollectionFill /> Descrição{" "}
          </h2>
          <div className="desc"> {product.description} </div>
          <div className="desc img">
            <img alt="imageProduct" title="imagem do produto" src={imageUrl} />
          </div>
        </div>
        <div className="serviceIncluded">
          <div className="mounting">
            <FaTools
              className="img-serviceIncluded"
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
          <div className="delivery">
            <FaTruck
              className="img-serviceIncluded"
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
          <div className="warranty">
            <FaFileSignature
              className="img-serviceIncluded"
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
        <section className="PrDtPgWarnings">
          ATENÇÃO
          <div className="videoInput">
            <h3>
              {" "}
              Se atente à Entradas de Vídeo escolhidas no ato do pedido.{" "}
            </h3>
            <p>
              <strong>
                Algumas placas de vídeo não possuem saída de vídeo VGA
              </strong>
            </p>
            <p>impossibilitando a utilização de alguns monitores.</p>
          </div>
          <div className="incompatibilities">
            <p>
              Caso haja algum erro ou incompatibilidade na escolha, será entrado
              em contato com o cliente avisando sobre, porém, o cliente ao
              finalizar o pedido já se declara ciente que tal situação foge ao
              controle da Nest Informática e a mesma não possui responsabilidade
              nem dever de arcar com custos extras em virtude da escolha de
              produtos incompatíveis.
            </p>
          </div>
          <div className="warningLink">
            <h3> Duvidas?: </h3>- Caso tenha alguma dificuldade com a escolha do
            item e da configuração, você pode
            <strong>contatar o atendimento para auxilio</strong> no link à
            seguir:
            <br />
            <strong>
              <Link to="https://api.whatsapp.com/message/JVU7KU5D3563D1?autoload=1&app_absent=0">
                <span>CLIQUE AQUI!</span>
              </Link>
            </strong>
          </div>
          <div className="warnings">
            <h3> Gabinetes: </h3>- Gabinetes com a informação
            <strong>S-FAN ou X-FAN não acompanham cooler traseiro</strong>. Caso
            necessite de um cooler adicional para instalação no local, basta
            adquirir um cooler de <strong>120x120mm</strong> compatível.
          </div>
          <div className="warnings">
            <h3> Prazos : </h3>- Computadores podem demorar até{" "}
            <strong>30 dias úteis</strong> para serem montados e enviados pois
            cada produto é adquirido para a montagem e a mesma é efetuada
            somente após a confirmação do pagamento.
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
