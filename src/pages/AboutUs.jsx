import React from "react";

const AboutUs = () => {
  const sectionStyle = {
    width: "100%",
    maxWidth: "800px",
    margin: "20px auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const headingStyle = {
    textAlign: "center",
  };

  const listStyle = {
    listStyle: "none",
    padding: 0,
  };

  const listItemStyle = {
    marginBottom: "10px",
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        margin: "20px",
      }}
    >
      <h1>Quem Somos</h1>

      <p>
        Somos uma loja virtual de informática que oferece uma ampla variedade de
        PCS gamers customizados ou pré-definidos de alta qualidade que serão
        ideais para a finalidade que você procura.
      </p>
      <section style={sectionStyle}>
        <h2 style={headingStyle}>Nossa História</h2>
        <p>
          Desde nossa fundação em 10/08/2021, nosso objetivo é fornecer aos
          nossos clientes os melhores PCs de acordo com o quanto você investirá,
          e uma busca incessante por um atendimento com excelência.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>Nossa Equipe</h2>
        <p>
          Nossa equipe é composta por técnicos altamente qualificados que vão
          entender perfeitamente a sua necessidade. Estamos sempre prontos para
          atender às necessidades de nossos clientes e oferecer o melhor serviço
          possível.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>Nossos Produtos</h2>
        <p>
          Trabalhamos com diversos tipos de configurações de computadores além
          de alguns outros periféricos como monitor, teclado, mouse e mesa
          gamer. Trabalhamos apenas com as melhores marcas do mercado, para
          garantir a qualidade e a satisfação de nossos clientes.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle}>Contato</h2>
        <p>
          Entre em contato conosco para obter mais informações sobre nossos
          produtos e serviços.
        </p>
        <ul style={listStyle}>
          <li style={listItemStyle}>Telefone: (83) 9 86377109</li>
          <li style={listItemStyle}>E-mail: nestinformaticajp@gmail.com.br</li>
        </ul>
      </section>
    </div>
  );
};export default AboutUs
