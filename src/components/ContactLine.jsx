import { Link } from "react-router-dom";
import "../styles/ContactLines.css";
import { socialMediaLinks } from "../data/contactsLinks";

export const ContactLine = (id) => {
  return (
    <div className="contactsLine" id={id}>
      {socialMediaLinks.map((link, index) => (
        <span key={index}>
          <Link to={link.href}>
            <img
              key={index}
              id={link.id}
              className="social-media"
              srcSet={link.srcSet}
              alt={link.alt}
            />
          </Link>
        </span>
      ))}
    </div>
  );
};