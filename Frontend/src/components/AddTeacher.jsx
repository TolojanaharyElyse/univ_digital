import axios  from "axios";
import ChoiceInput from "./ChoiceInput";
import { Link } from "react-router-dom";



export default function AddTeacher() {
    const CHOICES_RESPONSABLE = ["Directeur", "Chef de mention", "Chef de parcour","Directeur de laboratoire"]; 
    const CHOICES_STATUS = ["Proffesseur", "proffesseur vacataire", "proffesseur assistant"];

    const addTeachers = async (e) => {
        e.preventDefault(); 
        const form = e.target;
        const formData = new FormData(form);
        
        
        try {
            await axios.post('http://127.0.0.1:8000/api/teacher/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).then(() =>{
                // vider le formulaire
                form.reset();
                alert("Enseignant ajouté avec succès !")});
                
        } catch (error) {
            console.error("Erreur lors de l'ajout :", error);
            alert("Une erreur est survenue.");
        }
    };
    return (
        <div className="bg-zinc-300">
        <div >
            <h1 className="text-center pt-10 text-3xl text-zinc-700 underline">Ajouter des proffesseurs</h1>
            <div className="flex justify-end">
                <Link to='/'>
                    <button className='bg-gray-400 flex flex-row justify-center mb-4 mr-5 h-10 w-30 text-white rounded'>
                        <img className="w-7 h-7 m-1" src="image/abri.png" alt="home" />
                        <p className="m-2">Home</p>
                    </button>
                </Link>
            </div>
            <form onSubmit={(e)=>addTeachers(e)} encType="multipart/form-data" className="bg-white shadow-md bg-zinc-300 rounded px-8 pt-6 pb-8 mb-4">
                <div>
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nom</label>
                    <input  
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        type="text" 
                        id="name" 
                        name="name"
                        placeholder="Nom" />
                </div>

                <div>
                    <label htmlFor="prenom" className="block text-gray-700 text-sm font-bold mb-2">Prénom</label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        type="text" 
                        id="prenom" 
                        name="first_name"
                        placeholder="Prénom" />
                </div>

                <div>
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        type="email" 
                        id="email" 
                        name="email"
                        placeholder="Email" />
                </div>
              

                <ChoiceInput label="Responsable" value={CHOICES_RESPONSABLE} name="responsable" options={CHOICES_RESPONSABLE}/>
                <ChoiceInput label="Status" value={CHOICES_STATUS} name="status" options={CHOICES_STATUS}/>

                <div>
                    <label htmlFor="photo" className="block text-gray-700 text-sm font-bold mb-2">Photo</label>
                    <input 
                    type="file"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="photo"
                    placeholder="Photo"
                    name="photo"
                    required = {false} />
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
        </div>
    )
}