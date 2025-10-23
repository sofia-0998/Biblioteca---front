import React, { useState, useEffect, useMemo } from "react";
import { get, post, put, remove } from "../../helpers/httpService";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import {
  Button,
  IconButton,
  Typography,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
} from "@mui/material";
import { Pencil, Trash } from "lucide-react";

const Clientes = () => {
  const [data, setData] = useState([]);
  const [abrirModal, setAbrirModal] = useState(false);
  const [nuevoCliente, setNuevoCliente] = useState();
  const [abrirModalEditar, setAbrirModalEditar] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState();
  const [abrirModalBorrar, setAbrirModalBorrar] = useState(false);
  const [clienteBorrar, setClienteBorrar] = useState();

  const columns = useMemo(() => [
    {
      accessorKey: "Id_Cliente",
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
      const response = await get("/cliente");
      setData(response);
    } catch {
      console.log("Error");
    }
  };

  const newCliente = async () => {
    try {
      await post("/cliente", nuevoCliente);
      setNuevoCliente({});
      setAbrirModal(false);
      fetchClientes();
    } catch {
      console.log("Error");
    }
  };

  const updateCliente = async () => {
    try {
      console.log(clienteSeleccionado);
      await put(
        `/cliente/${clienteSeleccionado.Id_Cliente}`,
        clienteSeleccionado
      );
      setClienteSeleccionado(null);
      setAbrirModalEditar(false);
      fetchClientes();
    } catch {
      console.log("Error");
    }
  };

  const deleteCliente = async () => {
    try {
      await remove(`/cliente/${clienteBorrar.Id_Cliente}`);
      setClienteBorrar(null);
      setAbrirModalBorrar(false);
      fetchClientes();
    } catch {
      console.log("Error");
    }
  };

  const ActualizarCliente = (e) => {
    const { name, value } = e.target;
    setNuevoCliente({
      ...nuevoCliente,
      [name]: value,
    });
  };

  const ActualizarClienteSeleccionado = async (e) => {
    const { name, value } = e.target;
    setClienteSeleccionado({
      ...clienteSeleccionado,
      [name]: value,
    });
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

  return (
    <div>
      <Typography>Clientes</Typography>
      <Button variant="contained" onClick={() => setAbrirModal(true)}>
        Registrar Cliente
      </Button>
      <MaterialReactTable table={table} />

      <Dialog
        open={abrirModal}
        onClose={() => setAbrirModal(false)}
        maxWidth="sm"
      >
        <DialogTitle>Registrar Cliente</DialogTitle>
        <DialogContent>
          <TextField
            name="Nombre"
            fullWidth
            label="Nombre"
            variant="outlined"
            required
            sx={{ marginTop: 2 }}
            onChange={ActualizarCliente}
          />
          <TextField
            name="Apellido"
            fullWidth
            label="Apellido"
            variant="outlined"
            required
            sx={{ marginTop: 2 }}
            onChange={ActualizarCliente}
          />
          <TextField
            name="Telefono"
            fullWidth
            label="Telefono"
            variant="outlined"
            sx={{ marginTop: 2 }}
            onChange={ActualizarCliente}
          />
          <TextField
            name="Email"
            fullWidth
            label="Email"
            variant="outlined"
            required
            sx={{ marginTop: 2 }}
            onChange={ActualizarCliente}
          />
          <TextField
            name="Calle"
            label="Calle"
            variant="outlined"
            sx={{ marginTop: 2, width: "60%" }}
            onChange={ActualizarCliente}
          />
          <TextField
            name="Numero"
            label="Numero"
            variant="outlined"
            sx={{ marginTop: 2, width: "35%", marginLeft: "5%" }}
            onChange={ActualizarCliente}
          />
          <TextField
            name="Barrio"
            fullWidth
            label="Barrio"
            variant="outlined"
            sx={{ marginTop: 2 }}
            onChange={ActualizarCliente}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            onClick={() => setAbrirModal(false)}
          >
            Cancelar
          </Button>
          <Button variant="contained" onClick={newCliente}>
            Registrar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={abrirModalEditar}
        onClose={() => setAbrirModalEditar(false)}
        maxWidth="sm"
      >
        <DialogTitle>Editar Cliente</DialogTitle>
        <DialogContent>
          <TextField
            name="Nombre"
            defaultValue={clienteSeleccionado ? clienteSeleccionado.Nombre : ""}
            fullWidth
            label="Nombre"
            variant="outlined"
            required
            sx={{ marginTop: 2 }}
            onChange={ActualizarClienteSeleccionado}
          />
          <TextField
            name="Apellido"
            defaultValue={
              clienteSeleccionado ? clienteSeleccionado.Apellido : ""
            }
            fullWidth
            label="Apellido"
            variant="outlined"
            required
            sx={{ marginTop: 2 }}
            onChange={ActualizarClienteSeleccionado}
          />
          <TextField
            name="Telefono"
            defaultValue={
              clienteSeleccionado ? clienteSeleccionado.Telefono : ""
            }
            fullWidth
            label="Telefono"
            variant="outlined"
            sx={{ marginTop: 2 }}
            onChange={ActualizarClienteSeleccionado}
          />
          <TextField
            name="Email"
            defaultValue={clienteSeleccionado ? clienteSeleccionado.Email : ""}
            fullWidth
            label="Email"
            variant="outlined"
            required
            sx={{ marginTop: 2 }}
            onChange={ActualizarClienteSeleccionado}
          />
          <TextField
            name="Calle"
            defaultValue={clienteSeleccionado ? clienteSeleccionado.Calle : ""}
            label="Calle"
            variant="outlined"
            sx={{ marginTop: 2, width: "60%" }}
            onChange={ActualizarClienteSeleccionado}
          />
          <TextField
            name="Numero"
            defaultValue={clienteSeleccionado ? clienteSeleccionado.Numero : ""}
            label="Numero"
            variant="outlined"
            sx={{ marginTop: 2, width: "35%", marginLeft: "5%" }}
            onChange={ActualizarClienteSeleccionado}
          />
          <TextField
            name="Barrio"
            defaultValue={clienteSeleccionado ? clienteSeleccionado.Barrio : ""}
            fullWidth
            label="Barrio"
            variant="outlined"
            sx={{ marginTop: 2 }}
            onChange={ActualizarClienteSeleccionado}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            onClick={() => setAbrirModalEditar(false)}
          >
            Cancelar
          </Button>
          <Button variant="contained" onClick={updateCliente}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={abrirModalBorrar}
        onClose={() => setAbrirModalBorrar(false)}
      >
        <DialogTitle>
          ¿Estás seguro de que deseas eliminar este cliente?
        </DialogTitle>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            onClick={() => setAbrirModalBorrar(false)}
          >
            Cancelar
          </Button>
          <Button variant="contained" onClick={deleteCliente}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Clientes;
