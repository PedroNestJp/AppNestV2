import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import ProductCard from "./ProductCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Carrosel = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const productsCol = collection(db, "products");
      const snapshot = await getDocs(productsCol);
      const products = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(products);
    };

    getProducts();
  }, []);

  return (
    <section className="container-2" title="container-2">
      <div className="highLightsBoxs" id="highlightsBoxs">
        <Carousel showArrows infiniteLoop showThumbs={false}>
          {Array(Math.ceil(products.length / 2))
            .fill()
            .map((_, i) => (
              <div key={i}>
                {products.slice(i * 5, i * 5 + 10).map(({ id, ...product }) => (
                  <ProductCard key={id} id={id} {...product} />
                ))}
              </div>
            ))}
        </Carousel>
      </div>
    </section>
  );
};

const CarroselAds = () => {
  return (
    <Carousel
      className="carouselAds"
      showArrows
      infiniteLoop
      autoPlay
      slidesToShow={3}
      showThumbs={false}
    >
      <div key={""}>
        <img
          min-height={200}
          src="https://firebasestorage.googleapis.com/v0/b/nest-informatica.appspot.com/o/images%2Fprocessador-amd-ryzen-5-5700x.jpg?alt=media&token=7bdc8166-999a-4e30-a107-0f764178b3e2"
          alt=""
        />
      </div>
      <div>
        <img
          min-height={200}
          src="https://firebasestorage.googleapis.com/v0/b/nest-informatica.appspot.com/o/images%2Fintel-core-i5-10400.jpg?alt=media&token=5fba487b-5c9b-4c6b-8da6-dddb4322c9c9"
          alt=""
        />
      </div>
      <div>
        <img
          min-height={200}
          src="https://firebasestorage.googleapis.com/v0/b/nest-informatica.appspot.com/o/images%2Fgeforce-rtx.jpg?alt=media&token=6ecb2a40-a47f-44f0-ad23-f83131bdee5a"
          alt=""
        />
      </div>
      <div>
        <img
          min-height={200}
          src="https://firebasestorage.googleapis.com/v0/b/nest-informatica.appspot.com/o/images%2Fintel-core-i9-10900kf.jpg?alt=media&token=2fa2bb15-eeb5-400f-88c0-9b6f039d4533"
          alt=""
        />
      </div>
      <div>
        <img
          min-height={200}
          src="https://firebasestorage.googleapis.com/v0/b/nest-informatica.appspot.com/o/images%2Fprocessador-amd-ryzen-5-5600.jpg?alt=media&token=60df218d-0ae3-412a-9165-8ddf09af925a"
          alt=""
        />
      </div>
      <div>
        <img
          min-height={200}
          src="https://firebasestorage.googleapis.com/v0/b/nest-informatica.appspot.com/o/images%2F331008700_3455033461479559_8862723695959120508_n.jpg?alt=media&token=0a815323-4737-4362-8e7e-92419b9c70fd"
          alt=""
        />
      </div>
    </Carousel>
  );
};

const CarouselHome = () => {
  return (
    <Carousel>
      <ProductCard />
    </Carousel>
  );
};

export default CarouselHome;

export { CarouselHome, CarroselAds, Carrosel };
