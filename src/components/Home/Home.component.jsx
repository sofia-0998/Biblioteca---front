import { Typography, Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Users, BookOpenText, LibraryBig } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        gap: 4,
      }}
    >
      <Typography variant="h3" sx={{ mb: 4 }} color="primary">
        Bienvenido a Biblioteca A5
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 4,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Button
          onClick={() => navigate("/clientes")}
          sx={{
            width: 200,
            height: 200,
            borderRadius: 5,
            boxShadow: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            backgroundColor: "primary.light",
            color: "black",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "primary.main",
              boxShadow: 6,
              transform: "scale(1.05)",
            },
          }}
        >
          <Users size={60} color="#f5f5f5" />
          <Typography variant="h5" color="#f5f5f5">
            Clientes
          </Typography>
        </Button>

        <Button
          onClick={() => navigate("/libros")}
          sx={{
            width: 200,
            height: 200,
            borderRadius: 5,
            boxShadow: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            backgroundColor: "primary.light",
            color: "black",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "primary.main",
              boxShadow: 6,
              transform: "scale(1.05)",
            },
          }}
        >
          <BookOpenText size={60} color="#f5f5f5" />
          <Typography variant="h5" color="#f5f5f5">
            Libros
          </Typography>
        </Button>

        <Button
          onClick={() => navigate("/alquiler")}
          sx={{
            width: 200,
            height: 200,
            borderRadius: 5,
            boxShadow: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            backgroundColor: "primary.light",
            color: "black",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "primary.main",
              boxShadow: 6,
              transform: "scale(1.05)",
            },
          }}
        >
          <LibraryBig size={60} color="#f5f5f5" />
          <Typography variant="h5" color="#f5f5f5">
            Alquiler
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
