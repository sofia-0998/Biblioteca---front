import React from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

const BorrarLibro = ({ open, onClose, onDelete, libro }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        ¿Estás seguro de que deseas eliminar al libro{" "}
        {libro ? libro.Titulo : ""}?
      </DialogTitle>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={() => onDelete(libro)} color="primary">
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BorrarLibro;
