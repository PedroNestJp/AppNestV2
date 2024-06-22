import React from 'react';
import { useAlert } from '../pages/contexts/AlertContext';
import ModalAlert from './ModalAlert';

function Alert() {
  const { alertMessage, hideAlert } = useAlert(); // Use useAlert para acessar o contexto

  return (
    <div>
      {alertMessage && (
        <ModalAlert
          message={alertMessage}
          onClose={() => {
            hideAlert(); 
          }}
        />
      )}
    </div>
  );
}

export default Alert;
