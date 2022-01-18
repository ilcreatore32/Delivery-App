import { useState } from "react";

/* Material UI */
import {
  Box,
  Chip,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";

/* Material UI Icons */
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function CustomProductsCell({ thisRow }) {
  const products =
    thisRow?.value?.split(",") || thisRow?.Productos_Envio?.split(",");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Chip
        label="Listado de productos"
        icon={<ShoppingCartIcon />}
        color="primary"
        variant="outlined"
        size="small"
        onClick={handleClickOpen}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Listado de Productos</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>
            <Typography variant="body2">
              Estos son todos los productos que contiene este envío:
            </Typography>
          </DialogContentText>
          <Typography variant="subtitle2" color="primary">
            Total de productos: {products.length}
          </Typography>
          <Box sx={{ display: "flex", gap: ".3rem", marginTop: ".5rem" }}>
            {products.map((product) => {
              return <Chip label={product} />;
            })}
          </Box>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={handleClose} variant="text">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
