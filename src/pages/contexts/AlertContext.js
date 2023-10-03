import React, { createContext, useContext, useState } from 'react';

const AlertContext = createContext();

export function useAlert() {
  return useContext(AlertContext);
}

export function AlertProvider({ children }) {
  const [alertMessage, setAlertMessage] = useState(null);

  const showAlert = (message) => {
    setAlertMessage(message);
  };

  const hideAlert = () => {
    setAlertMessage(null);
  };

  return (
    <AlertContext.Provider value={{ alertMessage, showAlert, hideAlert }}>
      {children}
    </AlertContext.Provider>
  );
}
