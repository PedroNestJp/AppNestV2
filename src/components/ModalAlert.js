import React from "react";
import "../styles/ModalAlert.css";

const ModalAlert = ({ message, onClose }) => {
  return (
    <div className="modal-container">
      <div className="modal-content">
        <p className="modal-message">{message}</p>
        <button className="modal-close-btn" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
};

export default ModalAlert;
