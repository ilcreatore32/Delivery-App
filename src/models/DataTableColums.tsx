import React from "react";

/* Material UI DataTable */
import { GridColDef } from "@mui/x-data-grid";

/* React-Router */
import { Link } from "react-router-dom";

/* Material UI */
import IconButton from "@mui/material/IconButton";

/* Material UI Icons*/
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

/* Envios Columns */
export const EnviosColumns: GridColDef[] = [
  {
    headerName: "Id",
    field: "SE_Id",
    headerAlign: "center",
    align: "center",
    width: 100,
    sortable: true,
  },
  {
    headerName: "Fecha",
    field: "SE_Fecha",
    headerAlign: "center",
    align: "center",
    width: 200,
    sortable: true,
  },
  {
    headerName: "Valor del Pedido",
    field: "SE_ValorTotal",
    headerAlign: "center",
    align: "center",
    width: 190,
    sortable: true,
  },
  {
    headerName: "Peso Total",
    field: "SE_PesoTotal",
    headerAlign: "center",
    align: "center",
    width: 150,
    sortable: true,
  },
  {
    headerName: "Productos",
    field: "Productos_Envio",
    headerAlign: "center",
    align: "center",
    width: 200,
    sortable: true,
  },
  {
    field: "details",
    headerName: "Detalles",
    sortable: false,
    renderCell: (thisRow) => {
      return (
        <IconButton
          component={Link}
          to={`/Envios/Detalles/${thisRow.row.SE_Id}`}
        >
          <VisibilityTwoToneIcon />
        </IconButton>
      );
    },
  },
  {
    field: "edit",
    headerName: "Editar",
    sortable: false,
    renderCell: (thisRow) => {
      return (
        <IconButton component={Link} to={`/Envios/Editar/${thisRow.row.SE_Id}`}>
          <EditTwoToneIcon color="info" />
        </IconButton>
      );
    },
  },
  {
    field: "delete",
    headerName: "Eliminar",
    sortable: false,
    renderCell: (thisRow) => {
      return (
        <IconButton
          component={Link}
          to={`/Envios/Eliminar/${thisRow.row.SE_Id}`}
        >
          <DeleteTwoToneIcon color="error" />
        </IconButton>
      );
    },
  },
];

/* Servicios Columns */
export const ServiciosColumns: GridColDef[] = [
  {
    headerName: "Id",
    field: "ST_Id",
    sortable: true,
  },
  {
    headerName: "Medio de Transporte",
    field: "MT_Nombre",
    sortable: true,
  },
  {
    headerName: "Inicio",
    field: "ST_HorarioIni",
    sortable: true,
  },
  {
    headerName: "Fin",
    field: "ST_HorarioFin",
    sortable: true,
  },
  {
    headerName: "Precio",
    field: "ST_Precio",
    sortable: true,
  },
  {
    headerName: "Estatus",
    field: "ST_Status",
    sortable: true,
  },
  {
    headerName: "Areas de Operaciones",
    field: "Areas",
    sortable: true,
  },
  {
    field: "details",
    headerName: "Detalles",
    sortable: false,
    renderCell: (thisRow) => {
      return (
        <IconButton
          component={Link}
          to={`/Servicios/Detalles/${thisRow.row.ST_Id}`}
        >
          <VisibilityTwoToneIcon />
        </IconButton>
      );
    },
  },
  {
    field: "edit",
    headerName: "Editar",
    sortable: false,
    renderCell: (thisRow) => {
      return (
        <IconButton
          component={Link}
          to={`/Servicios/Editar/${thisRow.row.ST_Id}`}
        >
          <EditTwoToneIcon />
        </IconButton>
      );
    },
  },
  {
    field: "delete",
    headerName: "Eliminar",
    sortable: false,
    renderCell: (thisRow) => {
      return (
        <IconButton
          component={Link}
          to={`/Servicios/Eliminar/${thisRow.row.ST_Id}`}
        >
          <DeleteTwoToneIcon />
        </IconButton>
      );
    },
  },
];

/* Vehiculos Columns */
export const VehiculosColumns: GridColDef[] = [
  {
    headerName: "Id",
    field: "Vehiculo_Id",
    sortable: true,
  },
  {
    headerName: "Matricula",
    field: "Vehiculo_Matricula",
    sortable: true,
  },
  {
    headerName: "Marca",
    field: "Vehiculo_Marca",
    sortable: true,
  },
  {
    headerName: "Modelo",
    field: "Vehiculo_Modelo",
    sortable: true,
  },
  {
    headerName: "Año",
    field: "Vehiculo_Anio",
    sortable: true,
  },
  {
    headerName: "Pasajeros",
    field: "Vehiculo_Pasajeros",
    sortable: true,
  },
  {
    headerName: "Capacidad de Carga",
    field: "Vehiculo_CapacidadCarga",
    sortable: true,
  },
  {
    field: "details",
    headerName: "Detalles",
    sortable: false,
    renderCell: (thisRow) => {
      return (
        <IconButton
          component={Link}
          to={`/Vehiculos/Detalles/${thisRow.row.Vehiculo_Id}`}
        >
          <VisibilityTwoToneIcon />
        </IconButton>
      );
    },
  },
  {
    field: "edit",
    headerName: "Editar",
    sortable: false,
    renderCell: (thisRow) => {
      return (
        <IconButton
          component={Link}
          to={`/Vehiculos/Editar/${thisRow.row.Vehiculo_Id}`}
        >
          <EditTwoToneIcon />
        </IconButton>
      );
    },
  },
  {
    field: "delete",
    headerName: "Eliminar",
    sortable: false,
    renderCell: (thisRow) => {
      return (
        <IconButton
          component={Link}
          to={`/Vehiculos/Eliminar/${thisRow.row.Vehiculo_Id}`}
        >
          <DeleteTwoToneIcon />
        </IconButton>
      );
    },
  },
];

/* Pagos Columns */
export const PagosColumns: GridColDef[] = [
  {
    headerName: "Id",
    field: "PS_Id",
    sortable: true,
  },
  {
    headerName: "Método de Pago",
    field: "PS_Metodo",
    sortable: true,
  },
  {
    headerName: "Fecha",
    field: "PS_Fecha",
    sortable: true,
  },
  {
    headerName: "Monto",
    field: "PS_Monto",
    sortable: true,
  },
  {
    headerName: "Estatus",
    field: "PS_Status",
    sortable: true,
  },
  {
    headerName: "Usuario",
    field: "Persona_Nombre",
    sortable: true,
  },
  {
    field: "details",
    headerName: "Detalles",
    sortable: false,
    renderCell: (thisRow) => {
      return (
        <IconButton
          component={Link}
          to={`/Pagos/Detalles/${thisRow.row.PS_Id}`}
        >
          <VisibilityTwoToneIcon />
        </IconButton>
      );
    },
  },
  {
    field: "edit",
    headerName: "Editar",
    sortable: false,
    renderCell: (thisRow) => {
      return (
        <IconButton component={Link} to={`/Pagos/Editar/${thisRow.row.PS_Id}`}>
          <EditTwoToneIcon />
        </IconButton>
      );
    },
  },
  {
    field: "delete",
    headerName: "Eliminar",
    sortable: false,
    renderCell: (thisRow) => {
      return (
        <IconButton
          component={Link}
          to={`/Pagos/Eliminar/${thisRow.row.PS_Id}`}
        >
          <DeleteTwoToneIcon />
        </IconButton>
      );
    },
  },
];

/* Usuarios Columns */
export const UsuariosColumns: GridColDef[] = [
  {
    headerName: "Cedula",
    field: "Persona_Id",
    headerAlign: "center",
    align: "center",
    sortable: true,
  },
  {
    headerName: "Nombre",
    field: "Persona_Nombre",
    headerAlign: "center",
    align: "center",
    sortable: true,
  },
  {
    headerName: "Apellido",
    field: "Persona_Apellido",
    sortable: true,
  },
  {
    headerName: "Correo",
    field: "Usuario_Correo",
    sortable: true,
  },
  {
    headerName: "Estatus",
    field: "Suscripcion_Status",
    sortable: true,
  },
  {
    field: "details",
    headerName: "Detalles",
    sortable: false,
    renderCell: (thisRow) => {
      return (
        <IconButton
          component={Link}
          to={`/Usuarios/Detalles/${thisRow.row.id}`}
        >
          <VisibilityTwoToneIcon />
        </IconButton>
      );
    },
  },
  {
    field: "edit",
    headerName: "Editar",
    sortable: false,
    renderCell: (thisRow) => {
      return (
        <IconButton component={Link} to={`/Usuarios/Editar/${thisRow.row.id}`}>
          <EditTwoToneIcon />
        </IconButton>
      );
    },
  },
  {
    field: "delete",
    headerName: "Eliminar",
    sortable: false,
    renderCell: (thisRow) => {
      return (
        <IconButton
          component={Link}
          to={`/Usuarios/Eliminar/${thisRow.row.id}`}
        >
          <DeleteTwoToneIcon />
        </IconButton>
      );
    },
  },
];
