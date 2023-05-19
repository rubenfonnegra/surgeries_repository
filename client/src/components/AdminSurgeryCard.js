import toast from "react-hot-toast";
import { useSurgeries } from "../context/surgeryContext";
import { useNavigate } from "react-router-dom";

export function AdminSurgeryCard({ surgery }) {
  const navigate = useNavigate();
  const { deleteSurgery } = useSurgeries();
  const handleDelete = (id, nombre) => {
    toast(
      (t) => (
        <div className="text-white">
          <p>
            ¿Estás seguro que quieres Eliminar <strong>{nombre}</strong> ?
          </p>
          <br />
          <div>
            <button
              className="bg-red-500 hover:bg-red-400 px-3 py-2 text-sm text-white rounded-sm mx-2"
              onClick={() => {
                deleteSurgery(id);
                toast.dismiss(t.id);
              }}
            >
              Eliminar
            </button>
            <button
              className="bg-slate-400 hover:bg-slate-500 px-3 py-2 text-white rounded-sm mx-2"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancelar
            </button>
          </div>
        </div>
      ),
      {
        style: {
          background: "#081FA1",
        },
      }
    );
  };
  return (
    <div>
      <div
        className="bg-white rounded-lg shadow-md shadow-black hover:bg-gray-300 hover:cursor-pointer"
      >
        <div className="px-4 py-7">
          <div className="flex-justify-between">
            <h3>{surgery.nombre}</h3>
            <button
              className="bg-red-600 text-sm px-2 py-1 rounded-sm text-white"
              onClick={() => handleDelete(surgery._id, surgery.nombre)}
            >
              Eliminar
            </button>
            <button
              className="bg-gray-600 text-sm ml-5 px-2 py-1 rounded-sm text-white"
              onClick={() => navigate(`/SurgeryFormPage/${surgery._id}`)}
            >
              Editar
            </button>
            <button
              className="bg-blue-600 text-sm ml-5 px-2 py-1 rounded-sm text-white"
              onClick={() => navigate(`/SurgeryAdminFindPage/${surgery._id}`)}
            >
              Consultar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
