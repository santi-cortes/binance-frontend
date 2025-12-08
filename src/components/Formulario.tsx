import { useForm } from "react-hook-form";
import type { FormValues } from "../types";

export const Formulario = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitSuccessful },
    reset,
  } = useForm<FormValues>({
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      age: "",
      city: "",
      comment: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Formulario enviado:", data);
    reset();
  };

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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {fields.map(({ label, name, type }) => {
          const error = errors[name]?.message;

          return (
            <div key={name} className="flex flex-col">
              <label className="text-gray-700 mb-1 font-medium">{label}</label>

              <input
                type={type}
                {...register(name, {
                  required: `${label} obligatorio`,
                  ...(name === "email" && {
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Email inválido",
                    },
                  }),
                })}
                className={`px-4 py-3 rounded-xl border outline-none shadow-sm
              ${
                error
                  ? "border-red-400 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              }`}
              />

              {error && (
                <span className="text-red-600 text-sm mt-1">{error}</span>
              )}
            </div>
          );
        })}

        <div className="flex flex-col">
          <label className="text-gray-700 mb-1 font-medium">Comentario</label>

          <textarea
            rows={3}
            {...register("comment", { required: "Comentario obligatorio" })}
            className={`px-4 py-3 rounded-xl border resize-none outline-none shadow-sm
          ${
            errors.comment
              ? "border-red-400 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          }`}
          />

          {errors.comment && (
            <span className="text-red-600 text-sm mt-1">
              {errors.comment.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className={`w-full mt-4 py-3 rounded-xl font-semibold shadow-lg transition
        ${
          !isValid
            ? "bg-gray-400 cursor-not-allowed opacity-60"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
        >
          Enviar
        </button>

        {isSubmitSuccessful && (
          <div className="mt-6 flex justify-center">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-2xl shadow-lg flex items-center gap-3 animate-fade-in">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="font-semibold tracking-wide">
                ¡Formulario enviado correctamente!
              </span>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
