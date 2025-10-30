import React, { useEffect } from "react";
//importamos la libreria de react-router-dom (manejo de rutas)
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

//importamos los componentes de las paginas
import Menu from "../components/Menu/Menu.component";
import Login from "../components/Login/Login.component";
import Home from "../components/Home/Home.component";
import Clientes from "../components/Clientes/Clientes.component";
import Libros from "../components/Libro/Libros.component";
import Usuarios from "../components/Usuarios/Usuarios.component";
import Alquiler from "../components/Alquiler/Alquiler.component";

const Router = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/login");
    }
  }, [location, navigate]);

  return (
    <div>
      <div
        style={
          location.pathname !== "/login"
            ? { backgroundColor: "#f5f5f5", height: "100vh", width: "100vw" }
            : {}
        }
      >
        {/* es un if */}
        <div
          style={
            location.pathname !== "/login"
              ? { marginTop: "60px", marginLeft: "60px" }
              : {}
          }
        >
          {location.pathname !== "/login" && <Menu />}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/libros" element={<Libros />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/alquiler" element={<Alquiler />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Router;
