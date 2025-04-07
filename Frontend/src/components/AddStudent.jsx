import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";


export default function AddStudent() {
     

    const addStudent = async (e) => {
        e.preventDefault(); 
        const form = e.target;
        const formData = new FormData(form);
        
        
        try {
            await axios.post('http://127.0.0.1:8000/api/students/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).then(() =>{
                // vider le formulaire
                form.reset();
                alert("Étudiant ajouté avec succès !")});
                
        } catch (error) {
            console.error("Erreur lors de l'ajout :", error);
            alert("Une erreur est survenue.");
        }
    };

    return(
        <div>
            <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
                Ajouter un étudiant
            </h1>
            <div className="flex justify-end">
                <Link to='/'>
                    <button className='bg-gray-400 flex flex-row justify-center mb-4 mr-5 h-10 w-30 text-white rounded'>
                        <img className="w-7 h-7 m-1" src="image/abri.png" alt="home" />
                        <p className="m-2">Home</p>
                    </button>
                </Link>
            </div>
            
            <form encType="multipart/form-data" onSubmit={addStudent} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
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
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first_name">
                        Prénom
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="first_name"
                        type="text"
                        placeholder="Prénom"
                        name="first_name"
                    />
                </div>

                
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date_de_naissance">
                        Date de naissance
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="date_de_naissance"
                        type="date"
                        placeholder="Date de naissance"
                        name="date_de_naissance"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lieu_de_naissance">
                        Lieu de naissance
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="lieu_de_naissance"
                        type="text"
                        placeholder="Lieu de naissance"
                        name="lieu_de_naissance"
                    />
                </div>

            
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mention">
                        Mention
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="mention"
                        type="text"
                        placeholder="Mention"
                        name="mention"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="parcours">
                        Parcours
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="parcours"
                        type="text"
                        placeholder="Parcours"
                        name="parcours"
                    />
                </div>

                {/* Champ Grade */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="grade">
                        Grade
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="grade"
                        type="text"
                        placeholder="Grade"
                        name="grade"
                    />
                </div>

                {/* Champ Niveau */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="niveau">
                        Niveau
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="niveau"
                        type="number"
                        placeholder="Niveau"
                        name="niveau"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Email"
                        name="email"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone_number">
                        Numéro de téléphone
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="phone_number"
                        type="text"
                        placeholder="Numéro de téléphone"
                        name="phone_number"
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photo">
                        Photo
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="photo"
                        type="file"
                        placeholder="Photo"
                        name="photo"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Sexe
                    </label>
                    <div className="flex items-center space-x-4">
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                className="form-radio h-4 w-4 text-blue-600"
                                name="sexe"
                                value="Masculin"
                                defaultChecked
                            />
                            <span className="ml-2">Masculin</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                className="form-radio h-4 w-4 text-blue-600"
                                name="sexe"
                                value="Féminin"
                            />
                            <span className="ml-2">Féminin</span>
                        </label>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <button className="bg-blue-600 text-white rounded-lg w-40 h-14">Ajouter</button>
                </div>
            </form>        
        </div>
    )
}