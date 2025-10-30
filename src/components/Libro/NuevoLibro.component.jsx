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

const NuevoLibro = ({
  open,
  onClose,
  onSave,
  generoList,
  editorialList,
  AutorList,
}) => {
  const [Titulo, setTitulo] = useState("");
  const [ID_Autor, setAutor] = useState(0);
  const [Id_Genero, setGenero] = useState(null);
  const [Id_Editorial, setEditorial] = useState(0);
  const [Cantidad, setCantidad] = useState(0);

  const handleSave = () => {
    const nuevoLibro = {
      Titulo,
      Autor: ID_Autor,
      Id_Genero,
      Id_Editorial,
      Cantidad,
      Estado_libro: true,
    };
    onSave(nuevoLibro);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm">
      <DialogTitle>Registrar Libro</DialogTitle>
      <DialogContent>
        <TextField
          name="Titulo"
          fullWidth
          label="Titulo"
          variant="outlined"
          required
          sx={{ marginTop: 2 }}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <Autocomplete
          options={AutorList}
          getOptionLabel={(option) => option.Nombre}
          onChange={(event, newValue) => {
            setAutor(newValue ? newValue.ID_Autor : 0);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Autor"
              variant="outlined"
              fullWidth
              sx={{ marginTop: 2 }}
              required
            />
          )}
        />
        <Autocomplete
          options={generoList}
          getOptionLabel={(option) => option.Nombre_Genero}
          onChange={(event, newValue) => {
            setGenero(newValue ? newValue.ID_Genero : null);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Género"
              variant="outlined"
              fullWidth
              sx={{ marginTop: 2 }}
              required
            />
          )}
        />
        <Autocomplete
          options={editorialList}
          getOptionLabel={(option) => option.Nombre_Editorial}
          onChange={(event, newValue) => {
            setEditorial(newValue ? newValue.ID_Editorial : 0);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Editorial"
              variant="outlined"
              fullWidth
              sx={{ marginTop: 2 }}
              required
            />
          )}
        />
        <TextField
          name="Cantidad"
          fullWidth
          label="Cantidad"
          variant="outlined"
          required
          sx={{ marginTop: 2 }}
          onChange={(e) => setCantidad(parseInt(e.target.value, 10))}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={handleSave}>
          Registrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NuevoLibro;
