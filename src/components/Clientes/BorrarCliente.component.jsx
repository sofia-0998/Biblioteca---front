import React from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

const BorrarCliente = ({ open, onClose, onDelete, cliente }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        ¿Estás seguro de que deseas eliminar al cliente{" "}
        {cliente ? `${cliente.Nombre} ${cliente.Apellido}` : ""}?
      </DialogTitle>
      <DialogActions>
        <Button variant="contained" color="error" onClick={() => onClose()}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={onDelete}>
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BorrarCliente;
