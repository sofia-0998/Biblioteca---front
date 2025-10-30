import React, { useState, useEffect, useCallback } from "react";
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

const EditarUsuario = ({ open, onClose, onSave, usuario }) => {
  const [UsuarioSeleccionado, setUsuarioSeleccionado] = useState();

  useEffect(() => {
    setUsuarioSeleccionado(usuario);
  }, [usuario]);

  const handleSave = useCallback(() => {
    onSave(UsuarioSeleccionado);
  }, [UsuarioSeleccionado, onSave]);

  const ActualizarUsuarioSeleccionado = (e) => {
    const { name, value } = e.target;
    setUsuarioSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm">
      <DialogTitle>Editar Usuario</DialogTitle>
      <DialogContent>
        <TextField
          disabled
          name="nombreUsuario"
          label="Nombre de Usuario"
          variant="outlined"
          fullWidth
          margin="normal"
          value={UsuarioSeleccionado ? UsuarioSeleccionado.nombreUsuario : ""}
        />
        <TextField
          name="mail"
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          type="email"
          value={UsuarioSeleccionado ? UsuarioSeleccionado.mail : ""}
          onChange={ActualizarUsuarioSeleccionado}
        />
        <TextField
          name="contrasenaHash"
          type="password"
          label="Contraseña (dejar en blanco para no cambiar)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={UsuarioSeleccionado ? UsuarioSeleccionado.contrasenaHash : ""}
          onChange={ActualizarUsuarioSeleccionado}
        />
        <Autocomplete
          options={roles}
          getOptionLabel={(option) => option}
          value={UsuarioSeleccionado ? UsuarioSeleccionado.rol : ""}
          onChange={(event, newValue) => {
            setUsuarioSeleccionado((prevState) => ({
              ...prevState,
              rol: newValue,
            }));
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Rol"
              variant="outlined"
              fullWidth
              margin="normal"
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="error">
          Cancelar
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default EditarUsuario;
