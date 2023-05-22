import { Link, useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useSurgeries } from "../context/surgeryContext";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


export function SurgeryFormPage() {
  const { createSurgery, getSurgery, updatePost } = useSurgeries();
  const navigate = useNavigate();
  const params = useParams();
  const [surgery, setSurgery] = useState({
    nombre: "",
    descripcion: "",
    tecnica: "",
    variante: "",
    image: null,
    referencia: "",
  });

  useEffect(() => {
    (async () => {
      if (params.id) {
        const surgery = await getSurgery(params.id);
        setSurgery(surgery);
      }
    })();
  }, [getSurgery, params.id]);

  return (
    <div className="flex items-center justify-center">
      <div className="bg-zinc-800 p-10 shadow-md shadow-black">
        <header className="flex justify-between items-center py-4 text-white">
          <h3 className="text-xl">Nueva Cirugía</h3>
          <Link
            className="text-gray-400 text-sm hover:text-gray-300"
            to="/AdminPage"
          >
            Go to Back
          </Link>
        </header>

        <Formik
          initialValues={surgery}
          validationSchema={Yup.object({
            nombre: Yup.string().required("nombre es requerido"),
            descripcion: Yup.string().required("descripción es requerido"),
            tecnica: Yup.string().required("técnica es requerida"),
            variante: Yup.string().required("variante es requerido"),
            referencia: Yup.string().required("referencia es requerida"),
          })}
          onSubmit={async (values, actions) => {

            if (params.id) {
              await updatePost(params.id, values);
            } else {
              await createSurgery(values);
            }

            actions.setSubmitting(false)
            navigate("/AdminPage");
          }}
          enableReinitialize
        >
          {({ handleSubmit, setFieldValue, isSubmitting }) => (
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
                Descripción
              </label>
              <Field
                name="descripcion"
                as="textarea"
                placeholder="descripción"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full mb-4 "
                rows={3}
              />
              <ErrorMessage
                component={"p"}
                className="text-red-400 text-sm"
                name="descripcion"
              />
              <br />
              <label
                htmlFor="title"
                className="text-sm block fond-bold text-white"
              >
                Técnica
              </label>
              <Field
                name="tecnica"
                as="textarea"
                placeholder="técnica"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full mb-4"
                rows={3}
              />
              <ErrorMessage
                component={"p"}
                className="text-red-400 text-sm"
                name="tecnica"
              />
              <br />
              <label
                htmlFor="title"
                className="text-sm block fond-bold text-white"
              >
                Variante
              </label>
              <Field
                name="variante"
                placeholder="variante"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full mb-4"
              />
              <ErrorMessage
                component={"p"}
                className="text-red-400 text-sm"
                name="variante"
              />
              <br />
              <label
                htmlFor="title"
                className="text-sm block fond-bold text-white"
              >
                Imagen
              </label>
              <input
                type="file"
                name="image"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
                onChange={(e) => setFieldValue('image',e.target.files[0])}
              />
              <br />
              <label
                htmlFor="title"
                className="text-sm block fond-bold text-white"
              >
                Referencia
              </label>
              <Field
                name="referencia"
                as="textarea"
                placeholder="referencia"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full mb-4"
                rows={3}
              />
              <ErrorMessage
                component={"p"}
                className="text-red-400 text-sm"
                name="referencia"
              />
              <br />

              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded mt-2 text-white focus:outline-none disabled:bg-indigo-400"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
                ):'Save'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
