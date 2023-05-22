import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUsers } from "../context/userContext";
import { MdNoAccounts } from "react-icons/md";

import axios from "axios";

export function LoginPage() {

  const { users } = useUsers();



  const [nombre, setUsername] = useState("");

  const [password, setPassword] = useState("");
  const [error, setError] = useState('');

  const navigate = useNavigate();

  if (users.length === 0)
  return (
    <div className="mx-48 flex flex-col justfy-center items-centers block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-blue-100 dark:bg-blue-800 dark:border-blue-700 dark:hover:bg-blue-700">
      <MdNoAccounts className="w-48 h-48 text-white" />
      <h1 className="text-white text-2xl">No hay Usuarios</h1>
      <br></br>
      <p>
        <Link
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-blue-800"
          to="/UserFormPage"
        >
          {" "}
          Crear{" "}
        </Link>
      </p>
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:4000/userfind", {
        nombre,
        password,
      });
      setUsername("");
      setPassword("");
      setError("")
      navigate('/AdminPage');
    } catch (error) {
      console.error(error);
      setError('Contraseña inválida');
    }
  };

  return (
    
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      
      {" "}
      <div className="w-full max-w-xs mx-auto">
        {" "}

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          {" "}
          <h2 className="text-lg font-semibold mb-4 text-center">
            Iniciar sesión
          </h2>{" "}

          <div className="mb-4">
            {" "}
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Nombre de usuario
            </label>{" "}
            <input
              type="text"
              id="username"
              value={nombre}
              onChange={(e) => setUsername(e.target.value)}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />{" "}
          </div>{" "}
          <div className="mb-6">
            {" "}
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Contraseña
            </label>{" "}
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />{" "}
          </div>{" "}
          <div className="text-red-500"> {error && <div>{error}</div>}</div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Iniciar sesión{" "}
          </button>{" "}
          <Link
            className="text-gray-400 text-sm hover:text-gray-300"
            to="/"
          >
            Go to Back
          </Link>

        </form>{" "}
      </div>{" "}
    </div>
  );
}
