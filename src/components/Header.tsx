import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const { pathname } = useLocation();

  return (
    <header className="w-full bg-white/70 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-800">
          Crypto Dashboard
        </h1>

        <nav className="flex space-x-6 text-lg font-medium">
          <Link
            to="/"
            className={`
              px-4 py-2 rounded-xl transition
              hover:bg-blue-100 hover:text-blue-700
              ${
                pathname === "/"
                  ? "bg-blue-500 text-white shadow-md"
                  : "text-gray-700"
              }
            `}
          >
            Listado
          </Link>

          <Link
            to="/form"
            className={`
              px-4 py-2 rounded-xl transition
              hover:bg-blue-100 hover:text-blue-700
              ${
                pathname === "/form"
                  ? "bg-blue-500 text-white shadow-md"
                  : "text-gray-700"
              }
            `}
          >
            Formulario
          </Link>
        </nav>
      </div>
    </header>
  );
};
