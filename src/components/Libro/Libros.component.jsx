import React, { useState, useEffect,useMemo  } from "react";
import { Link, useLocation } from "react-router-dom";
import { get } from "../../helpers/httpService";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { Button, Typography, Dialog, DialogActions, DialogTitle, DialogContent, TextField } from "@mui/material";


const Libros = () => {
    const [data, setData] = useState({});
    const [abrirModal, setAbrirModal] = useState(false);

    const columns = useMemo(
            () => [
                {
                accessorKey: 'id',
                header: 'ID',
                size: 150,
                },
                {
                accessorKey: 'titulo',
                header: 'Titulo',
                size: 150,
                },
                {
                accessorKey: 'autor',
                header: 'Autor',
                size: 150,
                },
                {
                accessorKey: 'genero',
                header: 'Genero',
                size: 150,
                },
                {
                accessorKey: 'editorial',
                header: 'Editorial',
                size: 150,
                },
                {
                accessorKey: 'cantidad',
                header: 'Cantidad',
                size: 150,
                },
                {
                accessorKey: 'disponible',
                header: 'Disponible',
                size: 150,
                }
        ]
    )

    useEffect(() => {
            fetchLibros()
        }, [])
    
        const fetchLibros = async() =>{
            try {
                const response = await get("/libros")
                setData(response)
            } 
            catch{console.log("Error")}
        }

    const table = useMaterialReactTable({
            columns,
            data, 
      });
      
    return(
        <div>
            <Typography>Libros</Typography>
            <Button variant="contained" onClick={() => setAbrirModal(true)}>Registrar Libro</Button>
            <MaterialReactTable table={table} />  

            <Dialog open={abrirModal} onClose={() => setAbrirModal(false)} maxWidth="sm">
                            <DialogTitle>Registrar Libro</DialogTitle>
                            <DialogContent>
                                <TextField name="id_libro" fullWidth label="codigo" variant="outlined" required sx={{marginTop:1}} />
                                <TextField name="titulo" fullWidth label="Titulo" variant="outlined" required sx={{marginTop:2}} />
                                <TextField name="id_autor" fullWidth label="Autor" variant="outlined" required sx={{marginTop:2}} />
                                <TextField name="id_genero" fullWidth label="Genero" variant="outlined" sx={{marginTop:2}} />
                                <TextField name="id_editorial" fullWidth label="Editorial" variant="outlined" required sx={{marginTop:2}} />
                                <TextField name="cantidad" label="Cantidad" variant="outlined" sx={{marginTop:2, width:"60%"}} />
                                <TextField name="disponible" label="Disponible" variant="outlined" sx={{marginTop:2, width:"35%", marginLeft:"5%"}} />
                            </DialogContent>
                            <DialogActions>
                                <Button variant="contained" color="error" onClick={() => setAbrirModal(false)}>Cancelar</Button>
                                <Button variant="contained">Registrar</Button>
                            </DialogActions>
                        </Dialog> 
        </div>
    )

}

export default Libros;