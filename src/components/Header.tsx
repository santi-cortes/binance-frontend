import { Link, useLocation } from "react-router-dom";
import { useUser } from "../context/userContext";

export const Header = () => {
  const { pathname } = useLocation();
  const { name } = useUser();

  const linkBase =
    "relative px-4 py-2 rounded-xl transition font-medium text-gray-700 hover:text-blue-700";

  return (
    <header className="w-full bg-white/60 backdrop-blur-xl border-b border-gray-200 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold tracking-tight text-gray-800">
            Crypto Dashboard
          </h1>

          {name && (
            <span className="text-gray-600 text-sm bg-gray-100 px-3 py-1 rounded-xl shadow-sm">
              👋 Bienvenido, <span className="font-semibold">{name}</span>
            </span>
          )}
        </div>

        <nav className="flex space-x-6 text-lg relative">
          <Link
            to="/"
            className={`${linkBase} ${
              pathname === "/" ? "text-blue-600 font-semibold" : ""
            }`}
          >
            Listado
            {pathname === "/" && (
              <span className="absolute -bottom-1 left-0 right-0 mx-auto w-10 h-1 bg-blue-500 rounded-full animate-pulse" />
            )}
          </Link>

          <Link
            to="/form"
            className={`${linkBase} ${
              pathname === "/form" ? "text-blue-600 font-semibold" : ""
            }`}
          >
            Formulario
            {pathname === "/form" && (
              <span className="absolute -bottom-1 left-0 right-0 mx-auto w-10 h-1 bg-blue-500 rounded-full animate-pulse" />
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};
