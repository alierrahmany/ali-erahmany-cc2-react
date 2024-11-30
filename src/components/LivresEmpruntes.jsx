import { useState } from 'react';
import { useEmprunt } from '../context/EmpruntContext';
import { FaArrowCircleLeft } from 'react-icons/fa';

const LivresEmpruntes = () => {
  const { emprunts, returnLivre } = useEmprunt();
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success'); // 'success' or 'error'

  const handleReturnLivre = (livreId) => {
    returnLivre(livreId);
    setMessage('Livre retourné avec succès!');
    setMessageType('success');
    // Hide the message after 3 seconds
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 pb-2">
         Mes Emprunts
      </h2>

      {message && (
        <div className={`p-4 mb-4 text-white ${messageType === 'success' ? 'bg-green-500' : 'bg-red-500'} rounded`}>
          {message}
        </div>
      )}

      {emprunts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>Aucun livre emprunté pour le moment</p>
        </div>
      ) : (
        <div className="space-y-6">
          {emprunts.map((livre) => (
            <div
              key={livre.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-4 flex justify-between items-center space-x-4">
                <div className="space-y-1 flex-1">
                  <h3 className="font-semibold text-xl text-gray-800">
                    {livre.titre}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {livre.auteur}
                  </p>
                  <p className="text-gray-500 text-xs">
                    Emprunté le: {new Date(livre.dateEmprunt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleReturnLivre(livre.id)}
                  className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                >
                  <FaArrowCircleLeft className="text-lg" />
                  <span>Retourner</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LivresEmpruntes;
