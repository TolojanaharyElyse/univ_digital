import axios from "axios";
import ChoiceInput from "./ChoiceInput";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function AddFaculte() {
  const [directeurs, setDirecteurs] = useState([]);
  

  function fetchDirecteur() {
    axios
      .get(`http://127.0.0.1:8000/api/teacher/responsable/directeur/`)
      .then((response) => {
        setDirecteurs(response.data);
        
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  useEffect(() => {
    fetchDirecteur();
  }, []);

  const handleclick = (e) => {
    const formData = new FormData(e.target);
    e.preventDefault();
    const directeurs_id = formData.get("directeurs");
    
  };

  return (
    <div>
      <h1 className="text-center pt-10 text-3xl text-zinc-700 underline">
        Ajouter une faculte
      </h1>
      <div className="flex justify-end">
        <Link to="/">
          <button className="bg-gray-400 flex flex-row justify-center mb-4 mr-5 h-10 w-30 text-white rounded">
            <img className="w-7 h-7 m-1" src="image/abri.png" alt="home" />
            <p className="m-2">Home</p>
          </button>
        </Link>
      </div>

      <form
        encType="multipart/form-data"
        className="bg-white shadow-md w-1/2 m-auto bg-zinc-300 rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={(e) => {
          handleclick(e);
        }}
      >
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Nom
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Nom"
            name="name"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor='directeurs'
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Directeur
          </label>
          <select
            name='directeurs'
            id='directeurs'
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            {directeurs.map((element) => (
              <option key={element.id} value={element.id}>
                {element.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-center">
          <button className="bg-blue-600 text-white rounded-lg w-40 h-14">
            Ajouter
          </button>
        </div>
      </form>
    </div>
  );
}
