import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  Autocomplete,
  Box,
  Divider,
} from "@mui/material";
import { Plus, Trash } from "lucide-react";

const NuevoAlquiler = ({ open, onClose, onSave, clienteList, libroList }) => {
  const [Id_Cliente, setId_Cliente] = useState(0);
  const [Detalles, setDetalles] = useState([]);

  // Inicializar fechas con valores válidos para SQL Server
  const today = new Date();
  const [Fecha_Alquiler, setFecha_Alquiler] = useState(today);
  const [Fecha_Devolucion, setFecha_Devolucion] = useState(() => {
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    return nextWeek;
  });

  const handleSave = () => {
    const nuevoAlquiler = {
      Alquiler: {
        Id_Cliente,
        Fecha_Alquiler: Fecha_Alquiler.toISOString(),
        Fecha_Devolucion: Fecha_Devolucion.toISOString(),
      },
      Detalles,
    };

    onSave(nuevoAlquiler);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Registrar Nuevo Alquiler</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
          <Autocomplete
            options={clienteList}
            getOptionLabel={(option) => `${option.Nombre} ${option.Apellido}`}
            onChange={(event, newValue) => {
              setId_Cliente(newValue ? newValue.ID_Cliente : 0);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Cliente" variant="outlined" />
            )}
            sx={{ flexGrow: 1 }}
          />
          <Button
            variant="contained"
            onClick={() =>
              setDetalles([...Detalles, { Id_Libro: 0, Cantidad: 1 }])
            }
            sx={{ height: "fit-content" }}
          >
            <Plus />
            Agregar Libro
          </Button>
        </Box>
        {/* Fechas selector */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
          <TextField
            label="Fecha de Alquiler"
            type="date"
            variant="outlined"
            value={Fecha_Alquiler.toISOString().split("T")[0]}
            onChange={(e) => setFecha_Alquiler(new Date(e.target.value))}
            sx={{ flexGrow: 1 }}
          />
          <TextField
            label="Fecha de Devolución"
            type="date"
            variant="outlined"
            value={Fecha_Devolucion.toISOString().split("T")[0]}
            onChange={(e) => setFecha_Devolucion(new Date(e.target.value))}
            sx={{ flexGrow: 1 }}
          />
        </Box>
        <div>
          {Detalles.map((detalle, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Divider sx={{ mt: 2, mb: 2 }} />
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <Autocomplete
                  options={libroList}
                  getOptionLabel={(option) => option.Titulo}
                  onChange={(event, newValue) => {
                    const nuevosDetalles = [...Detalles];
                    nuevosDetalles[index] = {
                      ...nuevosDetalles[index],
                      Id_Libro: newValue ? newValue.ID_Libro : 0,
                    };
                    setDetalles(nuevosDetalles);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={`Libro ${index + 1}`}
                      variant="outlined"
                    />
                  )}
                  sx={{ flexGrow: 1 }}
                />
                <TextField
                  label="Cantidad"
                  type="number"
                  variant="outlined"
                  value={detalle.Cantidad}
                  onChange={(e) => {
                    const nuevosDetalles = [...Detalles];
                    nuevosDetalles[index] = {
                      ...nuevosDetalles[index],
                      Cantidad: parseInt(e.target.value, 10),
                    };
                    setDetalles(nuevosDetalles);
                  }}
                  sx={{ width: 120 }}
                />
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    const nuevosDetalles = Detalles.filter(
                      (_, i) => i !== index
                    );
                    setDetalles(nuevosDetalles);
                  }}
                  sx={{ height: "fit-content" }}
                >
                  <Trash />
                </Button>
              </Box>
            </Box>
          ))}
        </div>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={onClose}>
          Cancelar
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default NuevoAlquiler;
