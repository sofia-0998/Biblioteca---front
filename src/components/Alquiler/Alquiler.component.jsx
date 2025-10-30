import React, { useState, useEffect, useMemo, memo } from "react";
import { get, post, put } from "../../helpers/httpService";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Button, Typography, IconButton } from "@mui/material";
import { Pencil, Trash, Check, X, Package } from "lucide-react";
import { toast } from "react-toastify";
import { toastConfiguracion } from "../../helpers/toastConfiguracion";

import NuevoAlquiler from "./NuevoAlquiler.component";

const Alquiler = () => {
  const [data, setData] = useState([]);
  const [clienteList, setClienteList] = useState([]);
  const [libroList, setLibroList] = useState([]);
  const [abrirModalNuevo, setAbrirModalNuevo] = useState(false);
  const columns = useMemo(
    () => [
      { accessorKey: "ID_Alquiler", header: "ID Alquiler" },
      { accessorKey: "Nombre", header: "Nombre Cliente" },
      { accessorKey: "Apellido", header: "Apellido Cliente" },
      { accessorKey: "Fecha_Alquiler", header: "Fecha de Alquiler" },
      { accessorKey: "Fecha_Devolucion", header: "Fecha de Devolución" },
    ],
    []
  );

  useEffect(() => {
    fetchClientes();
    fetchLibros();
    fetchAlquileres();
  }, []);

  const fetchAlquileres = async () => {
    try {
      const responseAlquiler = await get("/alquiler");
      const responseDetalles = await get("/Detalle_Alquiler");
      const response = responseAlquiler.map((alquiler) => ({
        ...alquiler,
        Detalles: responseDetalles.filter(
          (detalle) => detalle.ID_Alquiler === alquiler.ID_Alquiler
        ),
      }));
      console.log("Alquileres con detalles:", response);
      setData(response);
    } catch (error) {
      console.error("Error al obtener la lista de alquileres:", error);
    }
  };

  const fetchClientes = async () => {
    try {
      const response = await get("/cliente");
      setClienteList(response);
    } catch (error) {
      console.error("Error al obtener la lista de clientes:", error);
    }
  };

  const fetchLibros = async () => {
    try {
      const response = await get("/libro");
      setLibroList(response);
    } catch (error) {
      console.error("Error al obtener la lista de libros:", error);
    }
  };

  const nuevoAlquiler = async (alquilerData) => {
    try {
      await post("/alquiler", alquilerData);
      setAbrirModalNuevo(false);
      toast.success("Alquiler creado con éxito", toastConfiguracion);
    } catch (error) {
      console.error("Error al crear el nuevo alquiler:", error);
      toast.error("Error al crear el nuevo alquiler", toastConfiguracion);
    }
  };

  const obtenerNombreLibro = (idLibro) => {
    const libro = libroList.find((libro) => libro.ID_Libro === idLibro);
    return libro ? libro.Titulo : `Libro ID: ${idLibro}`;
  };

  const marcarComoEntregado = async (detalleId) => {
    try {
      const fechaHoy = new Date().toISOString().split("T")[0];
      await put(`/Detalle_Alquiler/${detalleId}`, {
        Fecha_Devolucion_Real: fechaHoy,
      });
      toast.success("Libro marcado como entregado", toastConfiguracion);
      fetchAlquileres();
    } catch (error) {
      console.error("Error al marcar como entregado:", error);
      toast.error("Error al marcar como entregado", toastConfiguracion);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data,
    enableExpanding: true,
    renderDetailPanel: ({ row }) => (
      <div style={{ padding: "16px" }}>
        <Typography variant="h6">Detalles del Alquiler</Typography>
        {row.original.Detalles && row.original.Detalles.length > 0 ? (
          row.original.Detalles.map((detalle) => (
            <div
              key={detalle.ID_Detalle}
              style={{
                marginBottom: "8px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              {!detalle.Fecha_Devolucion_Real ? (
                <Button
                  onClick={() => marcarComoEntregado(detalle.ID_Detalle)}
                  color="primary"
                  variant="contained"
                  size="small"
                  style={{
                    minHeight: "32px",
                    minWidth: "80px",
                    padding: "4px 8px",
                    fontSize: "12px",
                  }}
                >
                  <Package size={16} style={{ marginRight: "4px" }} />
                  Entregar
                </Button>
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#e8f5e8",
                    color: "#2e7d32",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    minHeight: "32px",
                    minWidth: "90px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  <Check size={16} style={{ marginRight: "4px" }} />
                  Entregado
                </div>
              )}
              <Typography>
                Libro: <strong>{obtenerNombreLibro(detalle.ID_Libro)}</strong> -
                Cantidad: {detalle.Cantidad}
                {detalle.Fecha_Devolucion_Real && (
                  <span style={{ color: "green", marginLeft: "8px" }}>
                    - Entregado ({detalle.Fecha_Devolucion_Real})
                  </span>
                )}
              </Typography>
            </div>
          ))
        ) : (
          <Typography
            variant="body2"
            style={{ fontStyle: "italic", color: "#666" }}
          >
            No hay detalles para este alquiler
          </Typography>
        )}
      </div>
    ),
  });

  const MemoizedNuevoAlquiler = memo(NuevoAlquiler);

  return (
    <div>
      <Typography>Alquiler de Libros</Typography>
      <Button variant="contained" onClick={() => setAbrirModalNuevo(true)}>
        Nuevo Alquiler
      </Button>
      <MaterialReactTable table={table} />
      <MemoizedNuevoAlquiler
        open={abrirModalNuevo}
        onClose={() => setAbrirModalNuevo(false)}
        onSave={nuevoAlquiler}
        clienteList={clienteList}
        libroList={libroList}
      />
    </div>
  );
};

export default Alquiler;
