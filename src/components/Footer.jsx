import React from 'react';
import { Link } from "react-router-dom";
import '../styles/Footer.css';

const footerData = [
  {
    type: "institutional",
    title: "Institutional",
    links: [
      { to: "/aboutUs", title: "Quem somos" },
      { to: "/terms", title: "Termos e Condições de Venda" },
      { to: "/exchangePolicy", title: "Política de Troca e Devoluções" },
    ],
  },
  {
    type: "doubts",
    title: "Dúvidas",
    links: [
      { to: "/howToBuy", title: "Como comprar" },
      { to: "/delivery", title: "Prazos e entregas" },
      { to: "/paymentMethods", title: "Formas de Pagamentos" },
    ],
  },
  {
    type: "help",
    title: "Ajuda",
    links: [
      { to: "/tutorialVideos", title: "Vídeos Tutoriais" },
      { to: "/productHandling", title: "Manuseio do Produto" },
      { to: "https://api.whatsapp.com/message/JVU7KU5D3563D1?autoload=1&app_absent=0", title: "Fale Conosco", external: true },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="info-footer">
        <div className="texts-info-footer">
          {footerData.map((section) => (
            <FooterSection key={section.type} section={section} />
          ))}
        </div>
      </div>
    </footer>
  );
};

const FooterSection = ({ section }) => (
  <div className={section.type}>
    <p>{section.title}</p>
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
