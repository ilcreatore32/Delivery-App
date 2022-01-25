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
import MapTwoToneIcon from "@mui/icons-material/MapTwoTone";

export default function CustomAreasCell({ thisRow }) {
  const areaoperacion = thisRow.row.areaoperacion.split(";");
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
        label="Listado de areas"
        icon={<MapTwoToneIcon />}
        color="primary"
        variant="outlined"
        size="small"
        onClick={handleClickOpen}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Listado de Areas de Operaciones</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>
            <Typography variant="body2">
              Estas son todas las areas que contiene este servicio:
            </Typography>
          </DialogContentText>
          <Typography variant="subtitle2" color="primary">
            Total de areas: {areaoperacion.length}{" "}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: ".3rem",
              marginTop: ".5rem",
            }}
          >
            {areaoperacion.map((area) => {
              area = area.replace(/PARROQUIA: |NAN,/gi, " ");
              area = area.replace("MUNICIPIO: ", " ");
              area = area.replace("ENTIDAD FEDERAL: ", " ");
              return <Chip label={area} />;
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
