import React from 'react';
import { Carousel } from "react-responsive-carousel";
import { imagesAds } from "../data/imagesAds";

const CarouselAds = () => {
    return (
        <Carousel
            showArrows
            infiniteLoop
            autoPlay
            showThumbs={false}
            swipeable
            emulateTouch
            ariaLabel="Carrossel de Anúncios"
        >
            {imagesAds.map((imageUri, index) => (
                <div className="adsDiv" key={index}>
                    <img
                        id="carouselAdsImg"
                        className="carouselAdsImg"
                        style={{ minHeight: '200px' }}
                        src={imageUri}
                        alt={`Anúncio ${index + 1}`}
                    />
                </div>
            ))}
        </Carousel>
    );
};

export default CarouselAds;
