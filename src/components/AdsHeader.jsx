import { Link } from "react-router-dom";
import { RiWhatsappFill } from 'react-icons/ri';
import '../styles/AdsHeader.css';
import CarouselAds from "./CarouselAds";

const AdsHeader = () => {
  return (
    <>
      <section className="adsDiv" aria-label="Advertisement Carousel Section">
        <CarouselAds />
      </section>
      <span className="chatWhatsapp">
        <Link
          to={process.env.REACT_APP_URL_WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on Whatsapp"
        >
          <RiWhatsappFill className="icon-chat" aria-hidden="true" />
        </Link>
      </span>
    </>
  );
};

export default AdsHeader;
