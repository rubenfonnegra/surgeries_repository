import { useNavigate } from "react-router-dom";


export function SurgeryCard({ surgery }) {

  const navigate = useNavigate();
// "/SurgeryFindPage/:id/:descripcion/:nombre/:referencia/:tecnica/:variante"
  return (
    <div className="bg-white rounded-lg shadow-md shadow-black hover:bg-gray-300 hover:cursor-pointer"
    onClick={()=> navigate(`/SurgeryFindPage/${surgery._id}`)}>
      
      <div className="px-4 py-7">
        <h1>{surgery.nombre}</h1>
      </div>
    </div>
  );
}


//${surgery.descripcion}/${surgery.nombre}/${surgery.referencia}/${surgery.tecnica}/${surgery.variante}