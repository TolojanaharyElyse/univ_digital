import { useState, useEffect,useRef } from "react";
import axios from "axios";
import { useParams,Link } from "react-router-dom";
import html2canvas from 'html2canvas-pro'
import jsPDF from 'jspdf'

export default function StudentList() {
  const [data, setData] = useState([]);
  const { student_id } = useParams();
  function fetchData() {
    axios
      .get(`http://127.0.0.1:8000/api/students/${student_id}/`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  useEffect(() => {
    fetchData();
  }, [student_id]); 
  const printRef = useRef(null)
  const handleDownloadPdf= async () =>{
    
    const element = printRef.current;
    if(!element){
      return
    }
    const canvas = await html2canvas(element,
      {
        scale:2,
        useCORS: true,  
        allowTaint: true,  
        logging: true,  
        onclone: (clonedDoc) => {
          // Ensure all images have CORS attributes
          clonedDoc.querySelectorAll('img').forEach(img => {
            img.setAttribute('crossorigin', 'anonymous');
            img.style.objectFit = 'contain';
          });
        }
      })
    const img_data = canvas.toDataURL("image/png")
    const pdf = new jsPDF({
      orientation:'portrait',
      unit:'px',
      format:'a4'
    });

    const imgProps = pdf.getImageProperties(img_data)
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
    console.log(data.name)
    pdf.addImage(img_data,'PNG',0,0,pdfWidth,pdfHeight)
    pdf.save(`cart_de_${data.name}.pdf`)
  }

  return (
    <div className="flex flex-row justify-evenly m-10">
      <div className="mr-8">
        <div className="leading-9 text-2xl text-gray-700">
          <h1 className="card-title text-3xl font-bold pb-5 text-blue-700">Detail de l'etudiant</h1>
          <p className="">
            <b>Nom : </b>{data.name} 
          </p>

          <p>
            <b>Prénom :</b>{data.first_name} 
          </p>

          <p className="">
            <b>Date de naissance : </b>
            {data.date_de_naissance}
          </p>

          <p>
            <b>Lieu de naissance : </b>{data.lieu_de_naissance}
          </p>

          <p>
            <b>Sexe : </b>{data.sexe}
          </p>

          <p className="">
            <b>Mention : </b>
            {data.mention}
          </p>

          <p className="">
            <b>parcours : </b>
            {data.parcours}
          </p>

          <p className="">
            <b>Grade : </b>
            {data.grade}
          </p>

          <p className="">
            <b>Niveau : </b>
            {data.niveau}
          </p>

      
          <p className="">
            <b>Numero d'incription : </b>
            {data.numero_d_inscription}
          </p>
        </div>
      </div>
      <div className="card-cart flex  justify-end">
      
        <h1 className="card-title text-2xl pb-5 text-blue-700">Carte d'etudiant de:  <b> {data.name}</b></h1>
        
        <div ref={printRef} className="cart">
          <h1 className="cart-title">Carte d'etudiant</h1>
          <div className="identities">
            <div className="identity">
              <img
                    src={`http://127.0.0.1:8000${data.photo}`}
                    alt={data.name}
                    className="id-image"
                  />
              <div className="leading-4">
                <h2 className="text-black mb-2 font-bold underline">Mon identité</h2>
                <h2 className="">
                  <b>Nom : </b>{data.name} {data.first_name} 
                </h2>

                <p className="">
                  <b>Date de naissance : </b>
                  {data.date_de_naissance}
                </p>

                <p className="">
                  <b>Mention : </b>
                  {data.mention}
                </p>

                <p className="">
                  <b>parcours : </b>
                  {data.parcours}
                </p>

                <p className="">
                  <b>Grade : </b>
                  {data.grade}
                </p>

                <p className="">
                  <b>Niveau : </b>
                  {data.niveau}
                </p>

            
                <p className="">
                  <b>Numero d'incription : </b>
                  {data.numero_d_inscription}
                </p>
              </div>
            </div>
            <div className="qr_code">
              <img className="qr-image" src={`http://127.0.0.1:8000${data.qr_code}`} alt={data.name} />
            </div>
          </div>
        </div>
        <button onClick={handleDownloadPdf} className="bg-blue-700 text-white w-32 h-10 mt-5 rounded">Download card</button>
      </div>
    </div>
  )
}
