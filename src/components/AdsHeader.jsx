import { Link } from "react-router-dom";
import * as RiIcons from 'react-icons/ri'
import '../styles/AdsHeader.css'
import {CarroselAds} from "./Carrosel";


const AdsHeader = () => {
    return(
  <div>
    <section className="adsDiv">
<CarroselAds/>
    </section>
    <span className="chatWhatsapp">
      <Link
        to="https://api.whatsapp.com/message/JVU7KU5D3563D1?autoload=1&app_absent=0"
        target="_blank"
        rel="noreferrer"
      >
        <RiIcons.RiWhatsappFill alt="Chat do Whatsapp" className="icon-chat" />
      </Link>
    </span>
  </div>
  )
}
export default AdsHeader
