import { useState, useEffect } from 'react';
import { fetchLivres } from '../services/api';
import { useEmprunt } from '../context/EmpruntContext';
import Message from './Message';

const ListLivre = () => {
  const [livres, setLivres] = useState([]);
  const { emprunts, empruntLivre } = useEmprunt();
  const [messages, setMessages] = useState({});

  useEffect(() => {
    const getLivres = async () => {
      try {
        const data = await fetchLivres();
        const livresAvecDisponibilite = data.map(livre => ({
          ...livre,
          disponible: livre.disponible ?? true
        }));
        setLivres(livresAvecDisponibilite);
      } catch {
        console.error("Erreur lors du chargement des livres");
      }
    };
    getLivres();
  }, []);

  const isEmprunte = (livreId) => {
    const livre = livres.find(l => l.id === livreId);
    return emprunts.some(emprunt => emprunt.id === livreId) || !livre?.disponible;
  };

  const handleEmprunt = (livre) => {
    empruntLivre(livre);
    setMessages((prevMessages) => ({
      ...prevMessages,
      [livre.id]: 'Livre emprunté avec succès!'
    }));

    setTimeout(() => {
      setMessages((prevMessages) => {
        const updatedMessages = { ...prevMessages };
        delete updatedMessages[livre.id];
        return updatedMessages;
      });
    }, 3000);
  };

  return (
    <div className="p-6">
 
      {Object.keys(messages).map((livreId) => (
        <Message key={livreId} text={messages[livreId]} />
      ))}

      <h1 className="text-3xl font-semibold mb-6 text-gray-900 tracking-tight">Liste des livres</h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full text-sm text-left text-gray-500">
        <thead className="bg-gradient-to-r from-gray-500 to-gray-700 text-white text-xs uppercase tracking-wider">
        <tr>
              <th className="px-6 py-3 border-b border-gray-300 text-center">Titre</th>
              <th className="px-6 py-3 border-b border-gray-300 text-center">Auteur</th>
              <th className="px-6 py-3 border-b border-gray-300 text-center">Statut</th>
              <th className="px-6 py-3 border-b border-gray-300 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {livres.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">Aucun livre disponible</td>
              </tr>
            ) : (
              livres.map((livre) => (
                <tr key={livre.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 border-b">{livre.titre}</td>
                  <td className="px-6 py-4 border-b">{livre.auteur}</td>
                  <td className="px-6 py-4 border-b">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded ${!isEmprunte(livre.id) ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}
                    >
                      {!isEmprunte(livre.id) ? 'Disponible' : 'Indisponible'}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-b text-center">
                    {!isEmprunte(livre.id) ? (
                      <button
                        onClick={() => handleEmprunt(livre)}
                        className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                        >
                        Emprunter
                      </button>
                    ) : (
                      <span className="text-gray-400">Non disponible</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListLivre;
