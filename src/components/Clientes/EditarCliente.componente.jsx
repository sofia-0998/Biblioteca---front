import React, { useState, useCallback, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
} from "@mui/material";

const EditarCliente = ({ open, onClose, onSave, cliente }) => {
  const [clienteSeleccionado, setClienteSeleccionado] = useState();

  useEffect(() => {
    setClienteSeleccionado(cliente);
  }, [cliente]);

  const handleSave = useCallback(() => {
    onSave(clienteSeleccionado);
  }, [clienteSeleccionado, onSave]);

  const ActualizarClienteSeleccionado = (e) => {
    const { name, value } = e.target;
    setClienteSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm">
      <DialogTitle>Editar Cliente</DialogTitle>
      <DialogContent>
        <TextField
          name="Nombre"
          value={clienteSeleccionado ? clienteSeleccionado.Nombre : ""}
          fullWidth
          label="Nombre"
          variant="outlined"
          required
          sx={{ marginTop: 2 }}
          onChange={ActualizarClienteSeleccionado}
        />
        <TextField
          name="Apellido"
          value={clienteSeleccionado ? clienteSeleccionado.Apellido : ""}
          fullWidth
          label="Apellido"
          variant="outlined"
          required
          sx={{ marginTop: 2 }}
          onChange={ActualizarClienteSeleccionado}
        />
        <TextField
          name="Telefono"
          value={clienteSeleccionado ? clienteSeleccionado.Telefono : ""}
          fullWidth
          label="Telefono"
          variant="outlined"
          sx={{ marginTop: 2 }}
          onChange={ActualizarClienteSeleccionado}
        />
        <TextField
          name="Email"
          value={clienteSeleccionado ? clienteSeleccionado.Email : ""}
          fullWidth
          label="Email"
          variant="outlined"
          required
          sx={{ marginTop: 2 }}
          onChange={ActualizarClienteSeleccionado}
        />
        <TextField
          name="Calle"
          value={clienteSeleccionado ? clienteSeleccionado.Calle : ""}
          label="Calle"
          variant="outlined"
          sx={{ marginTop: 2, width: "60%" }}
          onChange={ActualizarClienteSeleccionado}
        />
        <TextField
          name="Numero"
          value={clienteSeleccionado ? clienteSeleccionado.Numero : ""}
          label="Numero"
          variant="outlined"
          sx={{ marginTop: 2, width: "35%", marginLeft: "5%" }}
          onChange={ActualizarClienteSeleccionado}
        />
        <TextField
          name="Barrio"
          value={clienteSeleccionado ? clienteSeleccionado.Barrio : ""}
          fullWidth
          label="Barrio"
          variant="outlined"
          sx={{ marginTop: 2 }}
          onChange={ActualizarClienteSeleccionado}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={() => onClose()}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={handleSave}>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditarCliente;
