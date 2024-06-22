import { Link } from "react-router-dom";
import * as RiIcons from 'react-icons/ri'
import '../styles/AdsHeader.css'
import { CarroselAds } from "./Carrosel";

const AdsHeader = () => {
  return (
    <>
      <section className="adsDiv">
        <CarroselAds />
      </section>
      <span className="chatWhatsapp">
        <Link
          to={process.env.REACT_APP_URL_WHATSAPP}
          target="_blank"
          rel="noreferrer"
        >
          <RiIcons.RiWhatsappFill alt="Chat do Whatsapp" className="icon-chat" />
        </Link>
      </span>
    </>
  )
}
export default AdsHeader
