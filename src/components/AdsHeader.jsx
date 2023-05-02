import { Link } from "react-router-dom";
import * as RiIcons from 'react-icons/ri'
import '../styles/AdsHeader.css'


const AdsHeader = () => {
    return(
  <div>
    <section className="adsDiv">
      <h1 className="ads-text "> ADS </h1>
      <Link to='/'><img className="ads-log" src={'https://firebasestorage.googleapis.com/v0/b/nest-informatica.appspot.com/o/images%2FlogoNestNew.png?alt=media&token=ffd0bd44-299a-4604-b341-d2805997cac2'} alt="logo da Nest" /></Link>
      <h1 className="ads-text "> ADS </h1>
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
