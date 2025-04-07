
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function App() {
  const [data, setData] = useState([]);

  function fetchData() {
    axios.get('http://127.0.0.1:8000/api/students/')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors du fetch :', error);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  
  const deleteStudent = async (id) => {
    if(confirm("Êtes-vous sûr de vouloir supprimer cet étudiant ?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/students/${id}/`);
        fetchData(); // Recharger les données après la suppression
        alert("Étudiant supprimé avec succès !");
      } catch (error) {
        console.error('Erreur lors de la suppression :', error);
        alert("Erreur lors de la suppression !");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div>
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">Liste des Étudiants</h1>
        <Link to="/add-student">
        <div className="flex justify-end">
          <button className='bg-gray-600 mb-4  h-10 w-40 text-white rounded'>+ Ajouter un etudiant</button>
        </div>
        </Link>
        
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl overflow-hidden shadow-md">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Photo</th>
              <th className="py-3 px-4 text-left">Nom</th>
              <th className="py-3 px-4 text-left">Prénom</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Téléphone</th>
              <th className="py-3 px-4 text-left">Sexe</th>
              <th className="py-3 px-4 text-left" colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((student) => (
              <tr key={student.id} className="border-b hover:bg-gray-100 transition">
                <td className="py-2 px-4">
                  <img
                    src={`http://127.0.0.1:8000${student.photo}`}
                    alt={student.name}
                    className="w-12 h-12 rounded-full object-cover border"
                  />
                </td>
                <td className="py-2 px-4">{student.name}</td>
                <td className="py-2 px-4">{student.first_name}</td>
                <td className="py-2 px-4">{student.email}</td>
                <td className="py-2 px-4">{student.phone_number}</td>
                <td className="py-2 px-4">{student.sexe}</td>
                <td className="py-2 px-4">
                  <Link to={`/students/${student.id}`}>
                    <button className="bg-blue-500 text-white py-1 px-2 rounded">Détails</button>
                  </Link>
                </td>
                <td className="py-2 px-4">
                  <button onClick={ ()=> deleteStudent(student.id)} className="bg-red-500 text-white py-1 px-2 rounded">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>

      
    </div>
  );
}

