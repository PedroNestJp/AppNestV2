import React from 'react';
import { Link } from "react-router-dom";
import '../styles/Footer.css';
import { footerInfo } from '../data/footerInfo';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="info-footer">
        <div className="texts-info-footer">
          {footerInfo.map((section) => (
            <FooterSection key={section.type} section={section} />
          ))}
        </div>
      </div>
    </footer>
  );
};

const FooterSection = ({ section }) => (
  <div className={section.type}>
    <h3 className={"title-footer"}>{section.title}</h3>
    <ul>
      {section.links.map((link, index) => (
        <FooterLink key={index} link={link} />
      ))}
    </ul>
  </div>
);

const FooterLink = ({ link }) => (
  <li>
    {link.external ? (
      <a href={link.to} target="_blank" rel="noopener noreferrer" className="texts-links-footer">
        {link.title}
      </a>
    ) : (
      <Link to={link.to} className="texts-links-footer">
        {link.title}
      </Link>
    )}
  </li>
);

const SubFooter = () => {
  return (
    <section className="subFooter">
      <div className="certifications" aria-label="Certificações"></div>
      <div className="businessInformation">
        <div className="logoSubFooter">
          <Link to="/">
            <img
              className="logoSubFooter"
              src="https://firebasestorage.googleapis.com/v0/b/nest-informatica.appspot.com/o/images%2FlogoNestNew.png?alt=media&token=ffd0bd44-299a-4604-b341-d2805997cac2"
              alt="Logo Nest Informática"
            />
          </Link>
        </div>
        <div className="businessTexts">
          <p>NEST INFORMÁTICA ATACADO E VAREJO DE PRODUTOS DE INFORMÁTICA LTDA</p>
          <p>CNPJ: 43.061.678/0001-97 | JOÃO PESSOA-PB</p>
        </div>
        <div className="openingHours">
          <p>ATENDIMENTO</p>
          <p>De segunda a sexta das 8:30 às 12H / 13H às 18H</p>
          <p>SOMOS E-COMMERCE NÃO TEMOS ATENDIMENTO LOCAL</p>
        </div>
      </div>
      <div className="createdBy">
        Criado por - <Link to="">Meu Digital Agência</Link>
      </div>
    </section>
  );
};

export { Footer, SubFooter };
