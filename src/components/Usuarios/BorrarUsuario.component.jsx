import React from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

const BorrarUsuario = ({ open, onClose, onDelete, usuario }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        ¿Estás seguro de que deseas eliminar al usuario{" "}
        {usuario ? usuario.nombreUsuario : ""}?
      </DialogTitle>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="error">
          Cancelar
        </Button>
        <Button
          onClick={() => onDelete(usuario)}
          variant="contained"
          color="primary"
        >
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BorrarUsuario;
