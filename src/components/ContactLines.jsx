import { Link } from "react-router-dom";
import { iconFacebook, iconGmail, iconInstagram, iconLinkedin, iconTelegram, iconWhatsapp, iconYoutube } from "../img/imgs";
import "../styles/ContactLines.css";

const socialMediaLinks = [
  { href: "https://www.facebook.com/nestinformatica/", srcSet: iconFacebook, alt: "Facebook", id: "iconFacebook" },
  { href: "#", srcSet: iconGmail, alt: "Gmail" },
  { href: "https://www.instagram.com/nestinformatica/", srcSet: iconInstagram, alt: "Instagram" },
  { href: "https://www.linkedin.com/company/nestinformatica/", srcSet: iconLinkedin, alt: "Linkedin" },
  { href: "#", srcSet: iconTelegram, alt: "Telegram" },
  { href: "#", srcSet: iconWhatsapp, alt: "Whatsapp" },
  { href: "https://www.youtube.com/channel/UCBH2a3RXY619wpctYJU8IbQ", srcSet: iconYoutube, alt: "Youtube" }
];

const ContactLine = ({ className, id }) => {
  return (
    <div className={className} id={id}>
      {socialMediaLinks.map((link, index) => (
        <span key={index}>
          <Link to={link.href}>
            <img id={link.id} className="social-media" srcSet={link.srcSet} alt={link.alt} />
          </Link>
        </span>
      ))}
    </div>
  );
};

const ContactLine1 = () => <ContactLine className="contactsLine" id="contactsLineHome" />;
const ContactLine2 = () => <ContactLine className="contactsLine-2" />;

export { ContactLine1, ContactLine2 };