import React, { useState, useEffect, useMemo, memo } from "react";
import { get, post, put, remove } from "../../helpers/httpService";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Button, Typography, IconButton } from "@mui/material";
import { Pencil, Trash, Check, X } from "lucide-react";
import { toast } from "react-toastify";
import { toastConfiguracion } from "../../helpers/toastConfiguracion";

import NuevoLibro from "./NuevoLibro.component";
import EditarLibro from "./EditarLibro.component.jsx";
import BorrarLibro from "./BorrarLibro.component.jsx";

const Libros = () => {
  const [data, setData] = useState([]);
  const [abrirModalNuevo, setAbrirModalNuevo] = useState(false);
  const [abrirModalEditar, setAbrirModalEditar] = useState(false);
  const [abrirModalBorrar, setAbrirModalBorrar] = useState(false);
  const [libroSeleccionado, setLibroSeleccionado] = useState();
  const [generoList, setGeneroList] = useState([]);
  const [editorialList, setEditorialList] = useState([]);
  const [autorList, setAutorList] = useState([]);
  const columns = useMemo(
    () => [
      {
        accessorKey: "ID_Libro",
        header: "ID",
        size: 150,
      },
      {
        accessorKey: "Titulo",
        header: "Titulo",
        size: 150,
      },
      {
        accessorKey: "Autor",
        header: "Autor",
        size: 150,
        Cell: ({ cell }) => {
          const autor = autorList.find(
            (a) => a.ID_Autor === parseInt(cell.getValue())
          );
          return autor ? (
            <div>
              {autor.Nombre} {autor.Apellido}
            </div>
          ) : (
            "Desconocido"
          );
        },
      },
      {
        accessorKey: "Nombre_Genero",
        header: "Genero",
        size: 150,
      },
      {
        accessorKey: "Nombre_Editorial",
        header: "Editorial",
        size: 150,
      },
      {
        accessorKey: "Cantidad",
        header: "Cantidad",
        size: 150,
      },
      {
        accessorKey: "Estado_libro",
        header: "Estado",
        size: 150,
        Cell: ({ cell }) =>
          cell.getValue() ? <Check color="green" /> : <X color="red" />,
      },
    ],
    [autorList]
  );

  useEffect(() => {
    fetchLibros();
    fetchGeneros();
    fetchEditoriales();
    fetchAutor();
  }, []);

  const fetchLibros = async () => {
    try {
      const response = await get("/libro");
      setData(response);
    } catch {
      console.log("Error");
    }
  };

  const fetchGeneros = async () => {
    try {
      const response = await get("/genero");
      setGeneroList(response);
    } catch {
      console.log("Error");
    }
  };

  const fetchEditoriales = async () => {
    try {
      const response = await get("/editorial");
      setEditorialList(response);
    } catch {
      console.log("Error");
    }
  };

  const fetchAutor = async () => {
    try {
      const response = await get("/autor");
      setAutorList(response);
    } catch {
      console.log("Error");
    }
  };

  const newLibro = async (nuevoLibro) => {
    try {
      await post("/libro", nuevoLibro);
      toast.success("Libro registrado con exito", toastConfiguracion);
      setAbrirModalNuevo(false);
      fetchLibros();
    } catch {
      console.log("Error");
      toast.error("Error al registrar el libro", toastConfiguracion);
    }
  };

  const editarLibro = async (libroActualizado) => {
    try {
      await put(`/libro/${libroActualizado.ID_Libro}`, libroActualizado);
      toast.success("Libro editado con exito", toastConfiguracion);
      setAbrirModalEditar(false);
      fetchLibros();
    } catch {
      console.log("Error");
      toast.error("Error al editar el libro", toastConfiguracion);
    }
  };

  const borrarLibro = async (libro) => {
    try {
      await remove(`/libro/${libro.ID_Libro}`);
      toast.success("Libro eliminado con exito", toastConfiguracion);
      setAbrirModalBorrar(false)
      fetchLibros();
    } catch {
      console.log("Error");
      toast.error("Error al eliminar el libro", toastConfiguracion);
    }
  };

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
            setLibroSeleccionado(row.original);
            setAbrirModalEditar(true);
          }}
        >
          <Pencil />
        </IconButton>
        <IconButton variant="contained" color="error" onClick={() => {
          setLibroSeleccionado(row.original);
          setAbrirModalBorrar(true)
        }}>
          <Trash />
        </IconButton>
      </div>
    ),
  });

  const MemoizedNuevoLibro = memo(NuevoLibro);
  const MemoizedEditarLibro = memo(EditarLibro);
  const MemoizedBorrarLibro = memo(BorrarLibro);

  return (
    <div>
      <Typography>Libros</Typography>
      <Button variant="contained" onClick={() => setAbrirModalNuevo(true)}>
        Registrar Libro
      </Button>
      <MaterialReactTable table={table} />
      <MemoizedNuevoLibro
        open={abrirModalNuevo}
        onClose={() => setAbrirModalNuevo(false)}
        generoList={generoList}
        editorialList={editorialList}
        AutorList={autorList}
        onSave={newLibro}
      />
      <MemoizedEditarLibro
        open={abrirModalEditar}
        onClose={() => setAbrirModalEditar(false)}
        onSave={editarLibro}
        generoList={generoList}
        editorialList={editorialList}
        AutorList={autorList}
        libro={libroSeleccionado}
      />
      <MemoizedBorrarLibro
        open={abrirModalBorrar}
        onClose={() => setAbrirModalBorrar(false)}
        onDelete={borrarLibro}
        libro={libroSeleccionado}
      />
    </div>
  );
};

export default Libros;
