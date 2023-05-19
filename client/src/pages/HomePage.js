import { useSurgeries } from "../context/surgeryContext";
import { Link, useNavigate } from "react-router-dom";
import { VscEmptyWindow } from "react-icons/vsc";
import { AiOutlineLogin } from "react-icons/ai";
import { SurgeryCard } from "../components/SurgeryCard";
import { useState } from "react";



export function HomePage() {
  const { surgeries } = useSurgeries();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const searcher = (e) => {
    setSearch(e.target.value);
  };

  let results = [];
  if (!search) {
    results = surgeries;
  } else {
    results = surgeries.filter((dataSurgeries) =>
      dataSurgeries.nombre.toLowerCase().includes(search.toLocaleLowerCase())
    );
  }

  if (surgeries.length === 0)
    return (
      <div className="mx-48 justfy-center items-centers bloc p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-blue-100 dark:bg-blue-800 dark:border-blue-700 dark:hover:bg-blue-700"
        onClick={()=> navigate(`/LoginPage`)}
      >
        <VscEmptyWindow className="w-48 h-48 text-white" />
        <h1 className="text-white text-2xl">No hay Cirugías</h1>
      </div>
    );

  return (
    <div className="flex">
      <div className="flex flex-col h-screen p-3 bg-blue-900 shadow w-60">
        <div className="space-y-3">
          <div className="flex items-center">
            <h2 className="text-xl font-bold text-white">Cirugías</h2>
          </div>
          <div className="flex-1">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
              <li className="rounded-sm">
                <button className="rounded-full mr-4 text-white bg-blue-900 transition ease-in-out delay-150 bg-blue-300 hover:-translate-y-1 hover:scale-110 hover:bg-blue-500 duration-300 ...">
                  <Link
                    className="flex items-center p-2 space-x-3 rounded-md"
                    to="/"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-gray-100"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                    <span className="text-gray-200">Cirugías</span>
                  </Link>
                </button>
              </li>
              <li className="rounded-sm">
                <button className="rounded-full text-white bg-blue-900 transition ease-in-out delay-150 bg-blue-300 hover:-translate-y-1 hover:scale-110 hover:bg-blue-500 duration-300 ...">
                  <Link
                    className="flex items-center p-2 space-x-3 rounded-md"
                    to="/LoginPage"
                  >
                    <AiOutlineLogin className="w-6 h-6 text-gray-100" />
                    <span className="text-gray-100">Login</span>
                  </Link>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container mx-auto ml-5 mt-5">
        <div className="container mx-auto ml-5 mt-5">
          <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-1">
            <div className="flex items-center">
              <div className="flex space-x-1">
                <input
                  value={search}
                  onChange={searcher}
                  type="text"
                  className="block w-full px-4 py-2 text-blue-700 bg-white border rounded-full focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Search..."
                />
                <button className="px-4 text-white bg-blue-600 rounded-full ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
          {results.map((surgery) => (
            <SurgeryCard surgery={surgery} key={surgery._id} />
          ))}
        </div>
      </div>
    </div>
  );
}
