import { Link } from "react-router-dom"
import { iconFacebook, iconGmail, iconInstagram, iconLinkedin, iconTelegram, iconWhatsapp, iconYoutube  } from "../img/imgs"
import "../styles/ContactLines.css"

const ContactLine1 = () => {
    return(
    <div className="contactsLine" id="contactsLineHome">
    <span> 
        <Link href="https://www.facebook.com/nestinformatica/"> 
            <img id="iconFacebook" className="social-media" srcSet={iconFacebook} alt=""/>
        </Link>
    </span>
    <span>
      <Link href="#"> 
        <img className="social-media" srcSet={iconGmail} alt=""/> 
      </Link>
    </span>
    <span>
      <Link href="https://www.instagram.com/nestinformatica/"> 
        <img className="social-media" srcSet={iconInstagram}  alt=""/> 
      </Link>
    </span>
    <span> 
      <Link  href="https://www.linkedin.com/company/nestinformatica/"> 
        <img className="social-media" srcSet={iconLinkedin} alt=""/> 
      </Link>
    </span>
    <span> 
      <Link href="#"> 
       <img className="social-media" srcSet={iconTelegram} alt=""/> 
      </Link>
    </span>
    <span> 
      <Link href="#"> 
        <img className="social-media" srcSet={iconWhatsapp} alt=""/> 
      </Link>
    </span>
    <span> 
      <Link href="https://www.youtube.com/channel/UCBH2a3RXY619wpctYJU8IbQ"> 
          <img className="social-media" srcSet={iconYoutube} alt=""/>  
      </Link>
    </span>
</div>
)
}

const ContactLine2 = () =>{
    return(
        <div className="contactsLine-2">
        <span>
        <Link href="https://www.facebook.com/nestinformatica/"> 
                <img id="iconFacebook" className="social-media" srcSet={iconFacebook} alt=""/>
            </Link>
        </span> 
        <span> 
          <Link href="#"> 
            <img className="social-media" srcSet={iconGmail} alt=""/> 
          </Link>
        </span>
        <span> 
          <Link href="https://www.instagram.com/nestinformatica/"> 
            <img className="social-media" srcSet={iconInstagram}  alt=""/> 
          </Link>
        </span>
        <span> 
          <Link  href="https://www.linkedin.com/company/nestinformatica/"> 
            <img className="social-media" srcSet={iconLinkedin} alt=""/> 
          </Link>
        </span>
        <span> 
          <Link href="#"> 
           <img className="social-media" srcSet={iconTelegram} alt=""/> 
          </Link>
        </span>
        <span> 
          <Link href="#"> 
            <img className="social-media" srcSet={iconWhatsapp} alt=""/> 
          </Link>
        </span>
        <span> 
          <Link href="https://www.youtube.com/channel/UCBH2a3RXY619wpctYJU8IbQ"> 
              <img className="social-media" srcSet={iconYoutube} alt=""/>  
          </Link>
        </span>
  </div>
)
}
export {ContactLine1, ContactLine2 }