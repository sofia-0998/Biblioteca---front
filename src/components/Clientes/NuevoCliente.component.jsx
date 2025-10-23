import React, { useState, useCallback } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
} from "@mui/material";

const NuevoCliente = ({ open, onClose, onSave }) => {
  const [Nombre, setNombre] = useState("");
  const [Apellido, setApellido] = useState("");
  const [Telefono, setTelefono] = useState("");
  const [Email, setEmail] = useState("");
  const [Calle, setCalle] = useState("");
  const [Numero, setNumero] = useState("");
  const [Barrio, setBarrio] = useState("");

  const handleSave = useCallback(() => {
    const nuevoCliente = {
      Nombre,
      Apellido,
      Telefono,
      Email,
      Calle,
      Numero,
      Barrio,
    };
    onSave(nuevoCliente);
  }, [Nombre, Apellido, Telefono, Email, Calle, Numero, Barrio, onSave]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm">
      <DialogTitle>Registrar Cliente</DialogTitle>
      <DialogContent>
        <TextField
          name="Nombre"
          fullWidth
          label="Nombre"
          variant="outlined"
          required
          sx={{ marginTop: 2 }}
          onChange={(e) => setNombre(e.target.value)}
        />
        <TextField
          name="Apellido"
          fullWidth
          label="Apellido"
          variant="outlined"
          required
          sx={{ marginTop: 2 }}
          onChange={(e) => setApellido(e.target.value)}
        />
        <TextField
          name="Telefono"
          fullWidth
          label="Telefono"
          variant="outlined"
          sx={{ marginTop: 2 }}
          onChange={(e) => setTelefono(e.target.value)}
        />
        <TextField
          name="Email"
          fullWidth
          label="Email"
          variant="outlined"
          required
          sx={{ marginTop: 2 }}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          name="Calle"
          label="Calle"
          variant="outlined"
          sx={{ marginTop: 2, width: "60%" }}
          onChange={(e) => setCalle(e.target.value)}
        />
        <TextField
          name="Numero"
          label="Numero"
          variant="outlined"
          sx={{ marginTop: 2, width: "35%", marginLeft: "5%" }}
          onChange={(e) => setNumero(e.target.value)}
        />
        <TextField
          name="Barrio"
          fullWidth
          label="Barrio"
          variant="outlined"
          sx={{ marginTop: 2 }}
          onChange={(e) => setBarrio(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={() => onClose()}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={handleSave}>
          Registrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default NuevoCliente;
