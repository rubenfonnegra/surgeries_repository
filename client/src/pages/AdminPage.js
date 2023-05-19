import { Link } from "react-router-dom";
import { useSurgeries } from "../context/surgeryContext";
import { VscEmptyWindow } from "react-icons/vsc";
import { AiOutlineUser } from "react-icons/ai";
import { AdminSurgeryCard } from "../components/AdminSurgeryCard";
import { BsKey } from "react-icons/bs";
import { useState } from "react";

export function AdminPage() {
  const { surgeries } = useSurgeries();
  const [search, setSearch] = useState("");

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
      <div className="mt-1 text-3xl font-semibold text-gray-900">
      <VscEmptyWindow className="w-48 h-48 text-Black" />
      <h1 className="text-Black text-2xl">No hay Cirugías</h1>
      <p>
        <Link
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-blue-800"
          to="/SurgeryFormPage"
        >
          {" "}
          Crear{" "}
        </Link>
      </p>
    </div>
    );

  return (
    <div className="flex">
      <div className="flex flex-col h-screen p-3 bg-blue-900 shadow w-60">
        <div className="space-y-3">
          <div className="flex items-center">
            <h2 className="text-xl font-bold text-white">Administrador</h2>
          </div>
          <div className="flex-1">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
              <li className="rounded-sm">
                <button className="rounded-full text-white bg-blue-900 transition ease-in-out delay-150 bg-blue-300 hover:-translate-y-1 hover:scale-110 hover:bg-blue-500 duration-300 ...">
                  <Link
                    className="flex items-center p-2 space-x-3 rounded-md"
                    to="/AdminPage"
                  >
                    <BsKey className="w-6 h-6 text-gray-100" />
                    <span className="text-gray-100">Admin</span>
                  </Link>
                </button>
              </li>
              <li className="rounded-sm">
                <button className="rounded-full text-white bg-blue-900 transition ease-in-out delay-150 bg-blue-300 hover:-translate-y-1 hover:scale-110 hover:bg-blue-500 duration-300 ...">
                  <Link
                    className="flex items-center p-2 space-x-3 rounded-md"
                    to="/UsersPage"
                  >
                    <AiOutlineUser className="w-6 h-6 text-gray-100" />
                    <span className="text-gray-100">Usuarios</span>
                  </Link>
                </button>
              </li>
              <li className="rounded-sm">
              <button className="rounded-full text-white bg-blue-900 transition ease-in-out delay-150 bg-blue-300 hover:-translate-y-1 hover:scale-110 hover:bg-blue-500 duration-300 ...">
                <a
                  href="/"
                  className="flex items-center p-2 space-x-3 rounded-md"
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
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  <span className="text-gray-100">Logout</span>
                </a>
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
                <button className="ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                  <Link className=" font-bold" to="/SurgeryFormPage">
                    crear
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6 mb-6 lg:grid-cols-3">
          {results.map((surgery) => (
            <AdminSurgeryCard surgery={surgery} key={surgery._id} />
          ))}
        </div>
      </div>
    </div>
  );
}
