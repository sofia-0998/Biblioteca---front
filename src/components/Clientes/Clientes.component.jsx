import React, { useState, useEffect, useMemo, memo } from "react";
import { get, post, put, remove } from "../../helpers/httpService";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { toast } from "react-toastify";
import { toastConfiguracion } from "../../helpers/toastConfiguracion";
import { Button, IconButton, Typography } from "@mui/material";
import { Pencil, Trash } from "lucide-react";
import NuevoCliente from "./NuevoCliente.component";
import EditarCliente from "./EditarCliente.componente";
import BorrarCliente from "./BorrarCliente.component";

const Clientes = () => {
  const [data, setData] = useState([]);
  const [abrirModal, setAbrirModal] = useState(false);
  const [abrirModalEditar, setAbrirModalEditar] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState();
  const [abrirModalBorrar, setAbrirModalBorrar] = useState(false);
  const [clienteBorrar, setClienteBorrar] = useState();

  const columns = useMemo(() => [
    {
      accessorKey: "ID_Cliente",
      header: "ID",
      size: 150,
    },
    {
      accessorKey: "Nombre",
      header: "Nombre",
      size: 150,
    },
    {
      accessorKey: "Apellido",
      header: "Apellido",
      size: 150,
    },
    {
      accessorKey: "Telefono",
      header: "Telefono",
      size: 150,
    },
    {
      accessorKey: "Email",
      header: "Email",
      size: 150,
    },
    {
      accessorKey: "Calle",
      header: "Calle",
      size: 150,
    },
    {
      accessorKey: "Numero",
      header: "Numero",
      size: 150,
    },
    {
      accessorKey: "Barrio",
      header: "Barrio",
      size: 150,
    },
  ]);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await get("/Cliente");
      setData(response);
    } catch {
      console.log("Error");
      toast.error("¡Error al obtener clientes!", toastConfiguracion);
    }
  };

  const newCliente = async (cliente) => {
    try {
      await post("/Cliente", cliente);
      setAbrirModal(false);
      fetchClientes();
      toast.success("¡Cliente agregado!", toastConfiguracion);
    } catch {
      console.log("Error");
      toast.error("¡Error al agregar cliente!", toastConfiguracion);
    }
  };

  const updateCliente = async (cliente) => {
    try {
      await put(`/Cliente/${cliente.ID_Cliente}`, cliente);
      setClienteSeleccionado(null);
      setAbrirModalEditar(false);
      fetchClientes();
      toast.success("¡Cliente actualizado!", toastConfiguracion);
    } catch {
      console.log("Error");
      toast.error("¡Error al actualizar cliente!", toastConfiguracion);
    }
  };

  const deleteCliente = async () => {
    try {
      await remove(`/Cliente/${clienteBorrar.ID_Cliente}`);
      setClienteBorrar(null);
      setAbrirModalBorrar(false);
      fetchClientes();
      toast.success("¡Cliente eliminado!", toastConfiguracion);
    } catch {
      console.log("Error");
      toast.error("¡Error al eliminar cliente!", toastConfiguracion);
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
            setClienteSeleccionado(row.original);
            setAbrirModalEditar(true);
          }}
        >
          <Pencil />
        </IconButton>
        <IconButton
          variant="contained"
          color="error"
          onClick={() => {
            setClienteBorrar(row.original);
            setAbrirModalBorrar(true);
          }}
        >
          <Trash />
        </IconButton>
      </div>
    ),
  });

  //Memorizacion para prevenir renders innecesarios
  const MemorizedNuevoCliente = memo(NuevoCliente);
  const MemorizedEditarCliente = memo(EditarCliente);
  const MemorizedBorrarCliente = memo(BorrarCliente);

  return (
    <div>
      <Typography>Clientes</Typography>
      <Button variant="contained" onClick={() => setAbrirModal(true)}>
        Registrar Cliente
      </Button>
      <MaterialReactTable table={table} />
      <MemorizedNuevoCliente
        open={abrirModal}
        onClose={() => setAbrirModal(false)}
        onSave={newCliente}
      />
      <MemorizedEditarCliente
        open={abrirModalEditar}
        onClose={() => setAbrirModalEditar(false)}
        onSave={updateCliente}
        cliente={clienteSeleccionado}
      />
      <MemorizedBorrarCliente
        open={abrirModalBorrar}
        onClose={() => setAbrirModalBorrar(false)}
        onDelete={deleteCliente}
        cliente={clienteBorrar}
      />
    </div>
  );
};

export default Clientes;
