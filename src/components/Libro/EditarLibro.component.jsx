import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  Autocomplete,
  Switch,
  Typography,
} from "@mui/material";

const EditarLibro = ({
  open,
  onClose,
  onSave,
  generoList,
  editorialList,
  AutorList,
  libro,
}) => {
  const [LibroSeleccionado, setLibroSeleccionado] = useState();

  useEffect(() => {
    setLibroSeleccionado(libro);
  }, [libro]);

  const handleSave = useCallback(() => {
    onSave(LibroSeleccionado);
  }, [LibroSeleccionado, onSave]);

  const ActualizarLibroSeleccionado = (e) => {
    const { name, value } = e.target;
    setLibroSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm">
      <DialogTitle>Editar Libro</DialogTitle>
      <DialogContent>
        <TextField
          name="Titulo"
          value={LibroSeleccionado ? LibroSeleccionado.Titulo : ""}
          fullWidth
          label="Titulo"
          variant="outlined"
          required
          sx={{ marginTop: 2 }}
          onChange={ActualizarLibroSeleccionado}
        />
        <Autocomplete
          options={AutorList}
          getOptionLabel={(option) => option.Nombre}
          value={
            LibroSeleccionado && LibroSeleccionado.Autor
              ? AutorList.find(
                  (autor) =>
                    autor.ID_Autor === parseInt(LibroSeleccionado.Autor)
                ) || null
              : null
          }
          onChange={(event, newValue) => {
            setLibroSeleccionado((prevState) => ({
              ...prevState,
              Autor: newValue ? newValue.ID_Autor : 0,
            }));
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Autor"
              variant="outlined"
              required
              sx={{ marginTop: 2 }}
            />
          )}
        />
        <Autocomplete
          options={generoList}
          getOptionLabel={(option) => option.Nombre_Genero}
          value={
            LibroSeleccionado && LibroSeleccionado.ID_Genero
              ? generoList.find(
                  (genero) => genero.ID_Genero === LibroSeleccionado.ID_Genero
                ) || null
              : null
          }
          onChange={(event, newValue) => {
            setLibroSeleccionado((prevState) => ({
              ...prevState,
              Id_Genero: newValue ? newValue.ID_Genero : null,
            }));
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Género"
              variant="outlined"
              required
              sx={{ marginTop: 2 }}
            />
          )}
        />
        <Autocomplete
          options={editorialList}
          getOptionLabel={(option) => option.Nombre_Editorial}
          value={
            LibroSeleccionado && LibroSeleccionado.ID_Editorial
              ? editorialList.find(
                  (editorial) =>
                    editorial.ID_Editorial === LibroSeleccionado.ID_Editorial
                ) || null
              : null
          }
          onChange={(event, newValue) => {
            setLibroSeleccionado((prevState) => ({
              ...prevState,
              Id_Editorial: newValue ? newValue.ID_Editorial : 0,
            }));
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Editorial"
              variant="outlined"
              required
              sx={{ marginTop: 2 }}
            />
          )}
        />
        <TextField
          name="Cantidad"
          value={LibroSeleccionado ? LibroSeleccionado.Cantidad : ""}
          fullWidth
          label="Cantidad"
          variant="outlined"
          required
          sx={{ marginTop: 2 }}
          onChange={ActualizarLibroSeleccionado}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "16px",
            gap: "16px",
          }}
        >
          <Typography>Estado</Typography>
          <Switch
            name="Estado_libro"
            checked={LibroSeleccionado ? LibroSeleccionado.Estado_libro : false}
            onChange={(e) =>
              setLibroSeleccionado((prevState) => ({
                ...prevState,
                Estado_libro: e.target.checked,
              }))
            }
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={handleSave} color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditarLibro;
