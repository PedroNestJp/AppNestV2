import React, { useState } from "react";
import "../styles/BudgetBuilder.css";
import Header from "../components/Header";

const BudgetBuilder = () => {
  const [selectedOptions, setSelectedOptions] = useState({
    processor: "",
    motherboard: "",
    ram: "",
    ssd: "",
    gpu: "",
    powerSupply: "",
    case: "",
  });

  const clearAllSelections = () => {
    setSelectedOptions({
      processor: "",
      motherboard: "",
      ram: "",
      ssd: "",
      gpu: "",
      powerSupply: "",
      case: "",
    });
  };
  const prices = {
    processor: {
      "i3-10100": 650,
      "i3-12100": 900,
      "i5-10400": 820,
      "i5-11400": 1020,
      "i5-12400": 1200,
      "i7-10700k": 1650,
      "i7-11700F": 1650,
      "i7-12700": 20000,
      "i9-11900": 2500,
      "i9-12900": 3000,
      "Ryzen 3 4100": 500,
      "Ryzen 5 4500": 550,
      "Ryzen 5 4600G": 700,
      "Ryzen 5 5500": 700,
      "Ryzen 5 5600G": 950,
      "Ryzen 7 5700X": 1300,
      "Ryzen 7 5800X3D": 2450,
      "Ryzen 9 5900X": 2250,
    },
    motherboard: {
      A320: 400,
      A520: 500,
      B450: 600,
      B550: 650,
      H610: 550,
      B560: 600,
      B660: 800,
      Z590: 2400,
      Z690: 2500,
      X570: 1850,
    },
    ram: {
      "8GB": 150,
      "16GB": 300,
      "32GB": 600,
    },
    ssd: {
      "256GB": 170,
      "500GB": 350,
      "1TB": 600,
    },
    gpu: {
      "GTX 1650": 950,
      "RTX 2060": 1350,
      "RTX 3060": 1900,
      "RTX 4060": 2100,
      "RTX 4070": 4200,
      "RX 6500XT": 1200,
      "RX 6600": 1400,
      "RX 7600": 1850,
      "RX 7700 XT": 3300,
    },
    powerSupply: {
      "500W": 220,
      "650W": 320,
      "750W": 150,
    },
    case: {
      Office: 140,
      "Gamer básico": 170,
      "Gamer Full RGB": 300,
    },
  };

  const calculateTotal = () => {
    return Object.keys(selectedOptions).reduce(
      (acc, category) =>
        acc + (selectedOptions[category] ? prices[category][selectedOptions[category]] : 0),
      0
    );
  };

  const handleOptionSelect = (category, option) => {
    setSelectedOptions((prevOptions) => {
      const updatedOptions = { ...prevOptions };
  
      // Se a opção já está selecionada, desmarque-a
      if (updatedOptions[category] === option) {
        updatedOptions[category] = "";
      } else {
        updatedOptions[category] = option;
      }
  
      return updatedOptions;
    });
  };
  

  const renderOptions = (options, category) => {
    return options.map((option) => (
      <div
        key={option}
        className={`option ${selectedOptions[category] === option ? "selectedBudget" : ""}`}
        onClick={() => handleOptionSelect(category, option)}
      >
        {option}
      </div>
    ));
  };

  const renderCard = (title, options, category) => {
    const selected = selectedOptions[category];

    return (
      <div className={`optionsCard ${selected ? "selectedCard" : ""}`} key={category}>
        <h2 className="h2">{title}</h2>
        {selected ? (
          <div className="selectedOption">
            {selected} - R$ {prices[category][selected]}
          </div>
        ) : (
          <div className="optionsContainer">{renderOptions(options, category)}</div>
        )}
      </div>
    );
  };
  const sendBudgetViaWhatsApp = () => {
    const totalBudget = calculateTotal();
    let message = `Configuração do PC:\n\n`;

    Object.keys(selectedOptions).forEach((category) => {
      const selectedOption = selectedOptions[category];
      if (selectedOption) {
        message += `${category}: ${selectedOption} - R$ ${prices[category][selectedOption]}\n`;
      }
    });

    message += `\nTotal: R$ ${totalBudget}\n\n`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.location.href = whatsappUrl;
  };

  return (
    <>
      <Header />
      <div className="containerBudget">
        <div className="breadcrumb">
          {Object.keys(selectedOptions).map((category, index, array) => (
            <React.Fragment key={category}>
              <span
                className={`breadcrumbItem${index === array.length - 1 ? " active" : ""}`}
              >
                {selectedOptions[category] || "Escolha"}
              </span>
              {index < array.length - 1 && (
                <span className="breadcrumbSeparator"> &gt; </span>
              )}
            </React.Fragment>
          ))}
        </div>
        <h1 className="h1">Escolha as suas configurações</h1>

        <div className="optionsContainer">
          {renderCard(
            "Processador",
            [
              "i3-10100",
              "i3-12100",
              "i5-10400",
              "i5-11400",
              "i5-12400",
              "i7-10700k",
              "i7-11700F",
              "i9-11900",
              "Ryzen 5 4500",
              "Ryzen 5 4600G",
              "Ryzen 5 5500",
              "Ryzen 5 5600G",
              "Ryzen 7 5700X",
              "Ryzen 7 5800X3D",
              "Ryzen 9 5900X",
            ],
            "processor"
          )}

          {renderCard(
            "Placa Mãe",
            [
              "A320",
              "A520",
              "B450",
              "B550",
              "H610",
              "B560",
              "B660",
              "Z590",
              "Z690",
              "X570",
            ],
            "motherboard"
          )}

          {renderCard("Memória RAM", ["8GB", "16GB", "32GB"], "ram")}

          {renderCard("SSD", ["256GB", "500GB", "1TB"], "ssd")}

          {renderCard(
            "Placa de Vídeo",
            [
              "GTX 1650",
              "RTX 2060",
              "RTX 3060",
              "RTX 4060",
              "RTX 4070",
              "RX 6500XT",
              "RX 6600",
              "RX 7600",
              "RX 7700 XT",
            ],
            "gpu"
          )}

          {renderCard(
            "Fonte de Alimentação",
            ["500W", "650W", "750W"],
            "powerSupply"
          )}

          {renderCard(
            "Gabinete",
            ["Office", "Gamer básico", "Gamer Full RGB"],
            "case"
          )}
        </div>
        <button className="button-clear" onClick={clearAllSelections}>
            Limpar Seleções
          </button>

        <div className="totalBudget">
          <h2 className="h1" id="ocBaseTxt">Orçamento Base: R$ {calculateTotal()}</h2>
          <button className="button-buy" id="btnSendBudgetWpp" onClick={sendBudgetViaWhatsApp}>Enviar orçamento via WhatsApp</button>
        </div>
      </div>
    </>
  );
};

export default BudgetBuilder;
