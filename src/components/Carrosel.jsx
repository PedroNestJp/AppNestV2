import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import ProductCard from "./ProductCard";
import { useFetchProducts } from "../hooks/fetchProducts";
import { useMemo } from "react";
import { useGroupSize } from "../hooks/useGroupSize";

const ProductGroup = ({ group }) => (
  <div>
    {group.map(({ id, ...product }) => (
      <ProductCard key={id} id={id} {...product} />
    ))}
  </div>
);
export const Carrosel = () => {
  const { products, loading } = useFetchProducts();
  const groupSize = useGroupSize();

  const productGroups = useMemo(() => {
    const groups = [];
    for (let i = 0; i < products.length; i += groupSize) {
      groups.push(products.slice(i, i + groupSize));
    }
    return groups;
  }, [products, groupSize]);

  if (!products) {
    return loading;
  }

  return (
    <section className="container-2" title="container-2">
      <div className="highLightsBoxs" id="highlightsBoxs">
        <Carousel
          showArrows
          infiniteLoop={false}
          showThumbs={false}
          preventScrollOnTouchMove
          swipeable
          emulateTouch
        >
          {productGroups.map((group, index) => (
            <ProductGroup key={index} group={group} />
          ))}
        </Carousel>
      </div>
    </section>
  );
};


