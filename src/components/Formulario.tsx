import { useState } from "react";
import type { FormValues } from "../types";

export const Formulario = () => {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    comment: "",
    age: "",
    city: "",
  });

  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const initialValues: FormValues = {
    name: "",
    email: "",
    age: "",
    city: "",
    comment: "",
  };

  const validateField = (name: string, value: string) => {
    let error = "";

    if (name === "name" && !value) error = "Nombre obligatorio";

    if (name === "email") {
      if (!value) error = "Email obligatorio";
      else if (!/\S+@\S+\.\S+/.test(value)) error = "Email inválido";
    }

    if (name === "comment" && !value) error = "Comentario obligatorio";
    if (name === "age" && !value) error = "Edad obligatoria";
    if (name === "city" && !value) error = "Ciudad obligatoria";

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateAll = () => {
    const newErrors: { [k: string]: string } = {};

    Object.entries(values).forEach(([key, value]) => {
      validateField(key, value);
      if (!value) newErrors[key] = "Campo obligatorio";
    });

    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAll()) {
      setSubmitted(true);
      resetForm();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setSubmitted(false);
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    validateField(e.target.name, e.target.value);
  };

  const hasErrors =
    Object.values(errors).some((e) => e) ||
    Object.values(values).some((v) => !v);

  const fields: { label: string; name: keyof FormValues; type: string }[] = [
    { label: "Nombre", name: "name", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Edad", name: "age", type: "number" },
    { label: "Ciudad", name: "city", type: "text" },
  ];

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white/70 backdrop-blur-md shadow-xl rounded-2xl p-10 border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 tracking-tight">
        Formulario de prueba
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {fields.map(({ label, name, type }) => (
          <div key={name} className="flex flex-col">
            <label className="text-gray-700 mb-1 font-medium">{label}</label>
            <input
              type={type}
              name={name}
              value={values[name]}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`px-4 py-3 rounded-xl border 
                ${
                  errors[name]
                    ? "border-red-400 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                }
                outline-none shadow-sm`}
            />
            {errors[name] && (
              <span className="text-red-600 text-sm mt-1">{errors[name]}</span>
            )}
          </div>
        ))}

        <div className="flex flex-col">
          <label className="text-gray-700 mb-1 font-medium">Comentario</label>
          <textarea
            name="comment"
            rows={3}
            value={values.comment}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`px-4 py-3 rounded-xl border resize-none 
              ${
                errors.comment
                  ? "border-red-400 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              }
              outline-none shadow-sm`}
          />
          {errors.comment && (
            <span className="text-red-600 text-sm mt-1">{errors.comment}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={hasErrors}
          className={`
            w-full mt-4 py-3 rounded-xl font-semibold shadow-lg transition
            ${
              hasErrors
                ? "bg-gray-400 cursor-not-allowed opacity-60"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }
          `}
        >
          Enviar
        </button>

        {submitted && (
          <p className="text-green-600 font-medium text-center mt-4 cursor-pointer">
            Formulario enviado correctamente 🎉
          </p>
        )}
      </form>
    </div>
  );
};
