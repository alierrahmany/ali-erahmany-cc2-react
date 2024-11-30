import React, { createContext, useContext, useState } from 'react';

const EmpruntContext = createContext();

export const useEmprunt = () => useContext(EmpruntContext);

export const EmpruntProvider = ({ children }) => {
  const [emprunts, setEmprunts] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const empruntLivre = (livre) => {
    setEmprunts([...emprunts, { ...livre, dateEmprunt: new Date() }]);
    setMessage('Livre emprunté avec succès');
  };

  const returnLivre = (livreId) => {
    setEmprunts(emprunts.filter(livre => livre.id !== livreId));
    setMessage('Livre retourné avec succès');
  };

  return (
    <EmpruntContext.Provider value={{
      emprunts,
      empruntLivre,
      returnLivre,
      message,
      loading,
      setLoading
    }}>
      {children}
    </EmpruntContext.Provider>
  );
};
