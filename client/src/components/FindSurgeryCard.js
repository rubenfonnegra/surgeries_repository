import { useNavigate } from "react-router-dom";


export function FindSurgeryCard({ surgery }) {

  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-sm shadow-md shadow-black hover:bg-gray-300 hover:cursor-pointer"
    onClick={()=> navigate(`/SurgeryFindPage/${surgery._id}`)}>
      <div className="px-4 py-7">
        <h1>{surgery.nombre}</h1>
        <h1>{surgery.nombre}</h1>
        <h1>{surgery.nombre}</h1>
        <h1>{surgery.nombre}</h1>
        <h1>{surgery.nombre}</h1>
      </div>
    </div>
  );
}