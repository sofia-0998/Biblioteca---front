import React, { useState, useEffect,useMemo  } from "react";
import { Link, useLocation } from "react-router-dom";
import { get } from "../../helpers/httpService";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { Button, Typography, Dialog, DialogActions, DialogTitle, DialogContent, TextField } from "@mui/material";


const Clientes = () => {
    const [data, setData] = useState({});
    const [abrirModal, setAbrirModal] = useState(false);
    const [nuevoCliente, setNuevoCliente] = useState({});

    const columns = useMemo(
        () => [
            {
            accessorKey: 'id',
            header: 'ID',
            size: 150,
            },
            {
            accessorKey: 'nombre',
            header: 'Nombre',
            size: 150,
            },
            {
            accessorKey: 'apellido',
            header: 'Apellido',
            size: 150,
            },
            {
            accessorKey: 'telefono',
            header: 'Telefono',
            size: 150,
            },
            {
            accessorKey: 'email',
            header: 'Email',
            size: 150,
            },
            {
            accessorKey: 'calle',
            header: 'Calle',
            size: 150,
            },
            {
            accessorKey: 'numero',
            header: 'Numero',
            size: 150,
            },
            {
            accessorKey: 'barrio',
            header: 'Barrio',
            size: 150,
            },

        ]
    )
    
    useEffect(() => {
        fetchClientes()
    }, [])

    const fetchClientes = async() =>{
        try {
            const response = await get("/clientes")
            setData(response)
        } 
        catch{console.log("Error")}
    }

    const ActualizarCliente = (e) =>{
        const {name, value} = e.target
        setNuevoCliente(clientePrevio =>({
            ...clientePrevio,
            [name]:value
        })) 
    }

    const table = useMaterialReactTable({
        columns,
        data, 
  });




    return(
        <div>
            <Typography>Clientes</Typography>
            <Button variant="contained" onClick={() => setAbrirModal(true)}>Registrar Cliente</Button>
            <MaterialReactTable table={table} />


            <Dialog open={abrirModal} onClose={() => setAbrirModal(false)} maxWidth="sm">
                <DialogTitle>Registrar Cliente</DialogTitle>
                <DialogContent>
                    <TextField name="dni" value={nuevoCliente.dni || ""} fullWidth label="Documento" variant="outlined" required sx={{marginTop:1}} onChange={ActualizarCliente}/>
                    <TextField name="Nombre" fullWidth label="Nombre" variant="outlined" required sx={{marginTop:2}} onChange={ActualizarCliente}/>
                    <TextField name="Apellido" fullWidth label="Apellido" variant="outlined" required sx={{marginTop:2}} onChange={ActualizarCliente}/>
                    <TextField name="Telefono" fullWidth label="Telefono" variant="outlined" sx={{marginTop:2}} onChange={ActualizarCliente}/>
                    <TextField name="Mail" fullWidth label="Mail" variant="outlined" required sx={{marginTop:2}} onChange={ActualizarCliente}/>
                    <TextField name="Calle" label="Calle" variant="outlined" sx={{marginTop:2, width:"60%"}} onChange={ActualizarCliente}/>
                    <TextField name="Numero" label="Numero" variant="outlined" sx={{marginTop:2, width:"35%", marginLeft:"5%"}} onChange={ActualizarCliente}/>
                    <TextField name="Barrio" fullWidth label="Barrio" variant="outlined" sx={{marginTop:2}} onChange={ActualizarCliente}/>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="error" onClick={() => setAbrirModal(false)}>Cancelar</Button>
                    <Button variant="contained">Registrar</Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}

export default Clientes