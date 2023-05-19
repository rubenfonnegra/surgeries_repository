import { Link, useParams } from "react-router-dom";
import { useEffect, useState} from "react";
import { useSurgeries } from "../context/surgeryContext";

export function SurgeryAdminFindPage() {
  const { getSurgery } = useSurgeries();
  const params = useParams();
  const [surgery, setSurgery] = useState(null)

   useEffect(() => {
     const fetchData = async () => {
       if (params.id) {
         const surgeryData = await getSurgery(params.id);
         setSurgery(surgeryData);
       }
     };
     fetchData()
   }, [getSurgery, params.id]);

  return (   
     <div>
       {surgery && (
        <div className="flex items-center justify-center">
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
             {surgery.nombre}
          </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {surgery.descripcion}
             </p>
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Técnica
             </h5>
             <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {surgery.tecnica}
            </p>
             <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
               Variante
             </h5>
             <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
               {surgery.variante}
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
               {surgery.image && <img src={surgery.image.url} />}
            </p>
             <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
               Referencia
             </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
               {surgery.referencia}
             </p>
             <Link
               to="/AdminPage"
               className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
             >
               Read more
               <svg
                 aria-hidden="true"
                 class="w-4 h-4 ml-2 -mr-1"
                 fill="currentColor"
                 viewBox="0 0 20 20"
                 xmlns="http://www.w3.org/2000/svg"
               >
                 <path
                   fill-rule="evenodd"
                   d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                   clip-rule="evenodd"
                 ></path>
               </svg>
             </Link>
           </div>
           </div>

       )} 
    </div>

  );
}
