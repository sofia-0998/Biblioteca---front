import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  Autocomplete,
} from "@mui/material";

const roles = ["admin", "usuario"];

const NuevoUsuario = ({ open, onClose, onSave }) => {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [mail, setMail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [rol, setRol] = useState("");

  const handleSave = () => {
    const nuevoUsuario = {
      nombreUsuario,
      mail,
      contrasenaHash: contrasena,
      rol,
    };
    onSave(nuevoUsuario);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm">
      <DialogTitle>Registrar Usuario</DialogTitle>
      <DialogContent>
        <TextField
          name="nombreUsuario"
          fullWidth
          label="Nombre de Usuario"
          variant="outlined"
          required
          sx={{ marginTop: 2 }}
          onChange={(e) => setNombreUsuario(e.target.value)}
        />
        <TextField
          name="mail"
          fullWidth
          label="Email"
          variant="outlined"
          required
          sx={{ marginTop: 2 }}
          onChange={(e) => setMail(e.target.value)}
        />
        <TextField
          name="contrasena"
          type="password"
          fullWidth
          label="Contraseña"
          variant="outlined"
          required
          sx={{ marginTop: 2 }}
          onChange={(e) => setContrasena(e.target.value)}
        />
        <Autocomplete
          options={roles}
          getOptionLabel={(option) => option}
          onChange={(event, newValue) => {
            setRol(newValue ? newValue : "");
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Rol"
              variant="outlined"
              required
              sx={{ marginTop: 2 }}
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default NuevoUsuario;
