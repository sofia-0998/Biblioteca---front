import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
//use navigate se usa para navegar mediante codigo
//Link se usa para navegar mediante un html
import { Menu as MenuIcon, House } from 'lucide-react';
import { Users } from 'lucide-react';
import { BookOpenText } from 'lucide-react';
import { LibraryBig } from 'lucide-react';



import {
  AppBar,
  IconButton,
  List,
  ListItem,
  Drawer,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";

const Menu = () => {
  //los estados son variables que se puede rastrear sus cambios
  const [openMenu, setOpenMenu] = useState(false);
  // Obtén la ruta actual
  const location = useLocation();

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${openMenu ? 150 : 50}px)`,
          ml: `${openMenu ? 150 : 50}px`,
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <Typography variant="h4">Biblioteca A5</Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={openMenu}
        onClose={() => setOpenMenu(false)}
        sx={{
          width: openMenu ? "150px" : "50px",
          "& .MuiDrawer-paper": {
            width: openMenu ? "150px" : "50px",
            boxSizing: "border-box",
            transition: "width 0.5s",
            overflowX: "hidden",
            borderRight: "none",
          },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "primary.main",
          }}
        >
          <IconButton
            onClick={() => setOpenMenu(!openMenu)}
            sx={{ color: "white" }}
          >
            <MenuIcon size={40} />
          </IconButton>
        </Toolbar>
        <List
          sx={{
            height: "100vh",
            backgroundColor: "#DEE2DA",
          }}
        >
          <ListItem
            button
            component={Link}
            to="/home"
            onClick={() => setOpenMenu(false)}
            sx={{
              py: 1.5,
              px: 2,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box display="flex" alignItems="center">
              <House sx={{ fontSize: 40 }} />
              <Typography
                variant="h6"
                style={{ marginLeft: 15, marginTop: "5px" }}
              >
                Home
              </Typography>
            </Box>
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/clientes"
            onClick={() => setOpenMenu(false)}
            sx={{
              py: 1.5,
              px: 2,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box display="flex" alignItems="center">
              <Users sx={{ fontSize: 40 }} />
              <Typography
                variant="h6"
                style={{ marginLeft: 15, marginTop: "5px" }}
              >
                Clientes
              </Typography>
            </Box>
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/libros"
            onClick={() => setOpenMenu(false)}
            sx={{
              py: 1.5,
              px: 2,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box display="flex" alignItems="center">
              <BookOpenText sx={{ fontSize: 40 }} />
              <Typography
                variant="h6"
                style={{ marginLeft: 15, marginTop: "5px" }}
              >
                Libros
              </Typography>
            </Box>
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/alquiler"
            onClick={() => setOpenMenu(false)}
            sx={{
              py: 1.5,
              px: 2,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box display="flex" alignItems="center">
              <LibraryBig sx={{ fontSize: 40 }} />
              <Typography
                variant="h6"
                style={{ marginLeft: 15, marginTop: "5px" }}
              >
                Alquiler
              </Typography>
            </Box>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default Menu;