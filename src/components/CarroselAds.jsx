import { Carousel } from "react-responsive-carousel";

export const CarroselAds = () => {
    const imagesAds = [{
        imageUri1: "https://firebasestorage.googleapis.com/v0/b/nest-informatica.appspot.com/o/images%2Fprocessador-amd-ryzen-5-5700x.jpg?alt=media&token=7bdc8166-999a-4e30-a107-0f764178b3e2",
        imageUri2: "https://firebasestorage.googleapis.com/v0/b/nest-informatica.appspot.com/o/images%2Fintel-core-i5-10400.jpg?alt=media&token=5fba487b-5c9b-4c6b-8da6-dddb4322c9c9",
        imageUri3: "https://firebasestorage.googleapis.com/v0/b/nest-informatica.appspot.com/o/images%2Fintel-core-i9-10900kf.jpg?alt=media&token=2fa2bb15-eeb5-400f-88c0-9b6f039d4533",
        imageUri4: "https://firebasestorage.googleapis.com/v0/b/nest-informatica.appspot.com/o/images%2Fintel-core-i7-10700k.jpg?alt=media&token=0f6e5b6e-3e0c-4b6f-9e5d-3b7b7c7b7b7b",
        imageUri5: "https://firebasestorage.googleapis.com/v0/b/nest-informatica.appspot.com/o/images%2Fgeforce-rtx.jpg?alt=media&token=6ecb2a40-a47f-44f0-ad23-f83131bdee5a",
        imageUri6: "https://firebasestorage.googleapis.com/v0/b/nest-informatica.appspot.com/o/images%2F331008700_3455033461479559_8862723695959120508_n.jpg?alt=media&token=0a815323-4737-4362-8e7e-92419b9c70fd",

    }]
    imagesAds.map((image) => {
        return (
            <Carousel
                className="carouselAds"
                showArrows
                infiniteLoop
                autoPlay
                slidesToShow={3}
                showThumbs={false}
                swipeable
                emulateTouch>
                <div>
                    <img
                        id="carouselAdsImg"
                        className="carouselAdsImg"
                        min-height={200}
                        src={image.imageUri1}
                        alt=""
                    />
                </div>
            </Carousel>
        );
    });
};