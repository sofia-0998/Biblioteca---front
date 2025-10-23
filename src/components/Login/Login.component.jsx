//make simple login html only skeleton html
import React from 'react';
import FondoPantalla from '../Login/library-interior-empty-room-reading-with-books-wooden-shelves_33099-1722.jpg'
import { Button, Typography, Dialog, DialogActions, DialogTitle, DialogContent, TextField } from "@mui/material";

const Login = () => {
    return (
        <div className="login-container" style={{
                backgroundImage: `url(${FondoPantalla})`,
                backgroundSize: 'cover',
                backgroundPosition: 'top',
                minHeight: '100vh', // Si quieres que cubra la pantalla
                width: '100vw',
                paddingTop: '50px'
            }}>

        <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.75)',
                width: '400px',
                height: '600px', 
                borderRadius: '10px', // Opcional: para bordes redondeados
                marginLeft: '80px'
            }}>

        <Typography style={{
            fontSize: '2.5em', 
            fontWeight: 'bold', 
            fontFamily: 'Roboto, sans-serif', // Usa una fuente disponible o importada
            color: 'black',
            textAlign: 'center'
        }}>
            Biblioteca A5
        </Typography>
        <Typography  style={{
            fontSize: '1.5em', 
            fontWeight: 'bold', 
            fontFamily: 'Roboto, sans-serif', // Usa una fuente disponible o importada
            color: 'black',
            textAlign: 'center'
        }}>
            Iniciar Sesion
        </Typography>
        <form className="login-form">
        <div className="form-group">
            <label htmlFor="username" style= {{
                display: 'block', 
                textAlign: 'center',
                marginBottom: '5px',
                fontWeight: 'bold'}}>
            Usuario
            </label>
            <input type="text" id="username" name="Usuario" required style={{
                display: 'block', // Crucial para que margin: auto funcione
                width: '80%',     // Define el ancho para que haya espacio para centrar
                margin: '0 auto', // Centra la caja horizontalmente
                border: '1px solid black', // Ejemplo de borde
                borderRadius: '5px',        // Ejemplo de borde redondeado
                padding: '10px'             // Sugerencia para mejorar el aspecto
            }}/>
        </div>
        <div className="form-group">
            <label htmlFor="password" style= {{
                display: 'block', 
                textAlign: 'center',
                marginBottom: '5px',
                fontWeight: 'bold'}}>
            Contraseña
            </label>
            <input type="password" id="password" name="Contraseña" required style={{
                display: 'block', // Crucial para que margin: auto funcione
                width: '80%',     // Define el ancho para que haya espacio para centrar
                margin: '0 auto', // Centra la caja horizontalmente
                border: '1px solid black', // Ejemplo de borde
                borderRadius: '5px',        // Ejemplo de borde redondeado
                padding: '10px'             // Sugerencia para mejorar el aspecto
            }}/>
        </div>
        <Button variant="contained" style={{
            marginTop: '20px',
            display: 'block',
            margin: '20px auto 0 auto',
            width: 'auto'
        }}>
        Iniciar sesion
        </Button>
        </form>
        </div>
            
    </div>
    );

};
export default Login;


