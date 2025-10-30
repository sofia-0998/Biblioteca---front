import React, { useState, useEffect, useMemo, memo } from "react";
import { get, post, put, remove } from "../../helpers/httpService";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Button, Typography, IconButton } from "@mui/material";
import { Pencil, Trash } from "lucide-react";
import { toast } from "react-toastify";
import { toastConfiguracion } from "../../helpers/toastConfiguracion";

import NuevoUsuario from "./NuevoUsuario.component";
import EditarUsuario from "./EditarUsuario.component.jsx";
import BorrarUsuario from "./BorrarUsuario.component.jsx";

const Usuarios = () => {
  const [data, setData] = useState([]);
  const [abrirNuevoUsuario, setAbrirNuevoUsuario] = useState(false);
  const [abrirEditarUsuario, setAbrirEditarUsuario] = useState(false);
  const [abrirBorrarUsuario, setAbrirBorrarUsuario] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState();
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 150,
      },
      {
        accessorKey: "nombreUsuario",
        header: "Nombre de Usuario",
        size: 150,
      },
      {
        accessorKey: "mail",
        header: "Email",
        size: 150,
      },
      {
        accessorKey: "rol",
        header: "Rol",
        size: 150,
      },
    ],
    []
  );

  const fetchUsuarios = async () => {
    try {
      const response = await get("/usuario");
      setData(response);
      toast.success("Usuarios cargados correctamente", toastConfiguracion);
    } catch (error) {
      console.error("Error al cargar los usuarios:", error);
      toast.error("Error al cargar los usuarios", toastConfiguracion);
    }
  };

  const nuevoUsuario = async (usuario) => {
    try {
      await post("/usuario", usuario);
      toast.success("Usuario creado correctamente", toastConfiguracion);
      fetchUsuarios();
      setAbrirNuevoUsuario(false);
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      toast.error("Error al crear el usuario", toastConfiguracion);
    }
  };

  const editarUsuario = async (usuarioActualizado) => {
    try {
      await put(`/usuario/${usuarioActualizado.id}`, usuarioActualizado);
      toast.success("Usuario editado correctamente", toastConfiguracion);
      fetchUsuarios();
      setAbrirEditarUsuario(false);
    } catch (error) {
      console.error("Error al editar el usuario:", error);
      toast.error("Error al editar el usuario", toastConfiguracion);
    }
  };

  const borrarUsuario = async (usuario) => {
    try {
      await remove(`/usuario/${usuario.id}`);
      toast.success("Usuario eliminado correctamente", toastConfiguracion);
      fetchUsuarios();
      setAbrirBorrarUsuario(false);
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      toast.error("Error al eliminar el usuario", toastConfiguracion);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowActions: true,
    displayColumnDefOptions: {
      "mrt-row-actions": {
        muiTableHeadCellProps: { align: "left" },
        size: 100,
      },
    },
    renderRowActions: ({ row }) => (
      <div>
        <IconButton
          variant="contained"
          onClick={() => {
            setUsuarioSeleccionado(row.original);
            setAbrirEditarUsuario(true);
          }}
        >
          <Pencil />
        </IconButton>
        <IconButton
          variant="contained"
          color="error"
          onClick={() => {
            setUsuarioSeleccionado(row.original);
            setAbrirBorrarUsuario(true);
          }}
        >
          <Trash />
        </IconButton>
      </div>
    ),
  });

  const MemoizedNuevoUsuario = memo(NuevoUsuario);
  const MemoizedEditarUsuario = memo(EditarUsuario);
  const MemoizedBorrarUsuario = memo(BorrarUsuario);

  return (
    <>
      <Button variant="contained" onClick={() => setAbrirNuevoUsuario(true)}>
        Registrar Usuario
      </Button>
      <MaterialReactTable table={table} />
      <MemoizedNuevoUsuario
        open={abrirNuevoUsuario}
        onClose={() => setAbrirNuevoUsuario(false)}
        onSave={nuevoUsuario}
      />
      <MemoizedEditarUsuario
        open={abrirEditarUsuario}
        onClose={() => setAbrirEditarUsuario(false)}
        onSave={editarUsuario}
        usuario={usuarioSeleccionado}
      />
      <MemoizedBorrarUsuario
        open={abrirBorrarUsuario}
        onClose={() => setAbrirBorrarUsuario(false)}
        onDelete={borrarUsuario}
        usuario={usuarioSeleccionado}
      />
    </>
  );
};

export default Usuarios;
