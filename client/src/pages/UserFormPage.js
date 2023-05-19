import { Link, useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useUsers } from "../context/userContext";
import * as Yup from "yup";
import { useEffect, useState } from "react";

export function UserFormPage() {
  const { createUser, getUser, updatePost } = useUsers();
  const navigate = useNavigate();
  const params = useParams();
  const [user, setUser] = useState({
    nombre: "",
    roll: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    (async () => {
      if (params.id) {

        const user = await getUser(params.id);

        setUser(user);
      }
    })();
  }, [getUser, params.id]);

  return (
    <div className="flex items-center justify-center">
      <div className="bg-zinc-800 p-10 shadow-md shadow-black">
        <header className="flex justify-between items-center py-4 text-white">
          <h3 className="text-xl">Nuevo Usuario</h3>
          <Link
            className="text-gray-400 text-sm hover:text-gray-300"
            to="/UsersPage"
          >
            Go to Back
          </Link>
        </header>

        <Formik
          initialValues={user}
          validationSchema={Yup.object({
            nombre: Yup.string().required("nombre es requerido"),
            roll: Yup.string().required("roll es requerido"),
            email: Yup.string().required("email es requerida"),
            password: Yup.string().required("password es requerido"),
          })}
          onSubmit={async (values, actions) => {
            if (params.id) {
              await updatePost(params.id, values);
            } else {
              await createUser(values);
            }

            navigate("/UsersPage");
          }}
          enableReinitialize
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <label
                htmlFor="title"
                className="text-sm block fond-bold text-white"
              >
                Nombre
              </label>
              <Field
                name="nombre"
                placeholder="nombre"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full mb-4"
              />
              <ErrorMessage
                component={"p"}
                className="text-red-400 text-sm"
                name="nombre"
              />
              <br />
              <label
                htmlFor="title"
                className="text-sm block fond-bold text-white"
              >
                Roll
              </label>
              <Field
                name="roll"
                placeholder="roll"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full mb-4 "
                rows={3}
              />
              <ErrorMessage
                component={"p"}
                className="text-red-400 text-sm"
                name="roll"
              />
              <br />
              <label
                htmlFor="title"
                className="text-sm block fond-bold text-white"
              >
                Email
              </label>
              <Field
                name="email"
                placeholder="email"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full mb-4"
                rows={3}
              />
              <ErrorMessage
                component={"p"}
                className="text-red-400 text-sm"
                name="email"
              />
              <br />
              <label
                htmlFor="title"
                className="text-sm block fond-bold text-white"
              >
                Password
              </label>
              <Field
                type="password"
                name="password"
                placeholder="password"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full mb-4"
              />
              <ErrorMessage
                component={"p"}
                className="text-red-400 text-sm"
                name="password"
              />
              <br />

              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded mt-2 text-white focus:outline-none disabled:bg-indigo-400"
              >
                Save
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
