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
    headerName: "id",
    field: "id",
    sortable: true,
  },
  {
    headerName: "Ubicación",
    field: "location",
    sortable: true,
  },
  {
    headerName: "Productos",
    field: "products",
    sortable: true,
  },
  {
    headerName: "Valor del Pedido",
    field: "price",
    sortable: true,
  },
  {
    headerName: "Peso Total",
    field: "weight",
    sortable: true,
  },
  {
    headerName: "Fecha del Pedido",
    field: "date",
    sortable: true,
  },
  {
    field: "details",
    headerName: "Detalles",
    sortable: false,
    renderCell: (thisRow) => {
      return (
        <IconButton component={Link} to={`/Envios/Detalles/${thisRow.row.id}`}>
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
        <IconButton component={Link} to={`/Envios/Editar/${thisRow.row.id}`}>
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
        <IconButton component={Link} to={`/Envios/Eliminar/${thisRow.row.id}`}>
          <DeleteTwoToneIcon />
        </IconButton>
      );
    },
  },
];

/* Servicios Columns */
export const ServiciosColumns: GridColDef[] = [
  {
    headerName: "id",
    field: "id",
    sortable: true,
  },
  {
    headerName: "Medio de Transporte",
    field: "Medio",
    sortable: true,
  },
  {
    headerName: "Horario",
    field: "Horario",
    sortable: true,
  },
  {
    headerName: "Precio",
    field: "Precio",
    sortable: true,
  },
  {
    headerName: "Disponibilidad",
    field: "Disponibilidad",
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
          to={`/Servicios/Detalles/${thisRow.row.id}`}
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
        <IconButton component={Link} to={`/Servicios/Editar/${thisRow.row.id}`}>
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
          to={`/Servicios/Eliminar/${thisRow.row.id}`}
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
    headerName: "id",
    field: "id",
    sortable: true,
  },
  {
    headerName: "Tipo de Vehiculo",
    field: "Marca",
    sortable: true,
  },
  {
    headerName: "Nombre",
    field: "Modelo",
    sortable: true,
  },
  {
    headerName: "Año",
    field: "Año",
    sortable: true,
  },
  {
    headerName: "Pasajeros",
    field: "Pasajeros",
    sortable: true,
  },
  {
    headerName: "Areas de Operaciones",
    field: "Areas",
    sortable: true,
  },
  {
    headerName: "Capacidad de Carga",
    field: "CapacidadCarga",
    sortable: true,
  },
  {
    headerName: "Matricula",
    field: "Matricula",
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
          to={`/Vehiculos/Detalles/${thisRow.row.id}`}
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
        <IconButton component={Link} to={`/Vehiculos/Editar/${thisRow.row.id}`}>
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
          to={`/Vehiculos/Eliminar/${thisRow.row.id}`}
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
    headerName: "id",
    field: "id",
    sortable: true,
  },
  {
    headerName: "Método de Pago",
    field: "Metodo",
    sortable: true,
  },
  {
    headerName: "Fecha",
    field: "Fecha",
    sortable: true,
  },
  {
    headerName: "Monto",
    field: "Monto",
    sortable: true,
  },
  {
    headerName: "Estatus",
    field: "Estatus",
    sortable: true,
  },
  {
    headerName: "Usuario",
    field: "Usuario",
    sortable: true,
  },
  {
    field: "details",
    headerName: "Detalles",
    sortable: false,
    renderCell: (thisRow) => {
      return (
        <IconButton component={Link} to={`/Pagos/Detalles/${thisRow.row.id}`}>
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
        <IconButton component={Link} to={`/Pagos/Editar/${thisRow.row.id}`}>
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
        <IconButton component={Link} to={`/Pagos/Eliminar/${thisRow.row.id}`}>
          <DeleteTwoToneIcon />
        </IconButton>
      );
    },
  },
];

/* Usuarios Columns */
export const UsuariosColumns: GridColDef[] = [
  {
    headerName: "id",
    field: "id",
    sortable: true,
  },
  {
    headerName: "Cédula",
    field: "Cedula",
    sortable: true,
  },
  {
    headerName: "Nombre Completo",
    field: "Nombre",
    sortable: true,
  },
  {
    headerName: "Correo",
    field: "Correo",
    sortable: true,
  },
  {
    headerName: "Subscripción",
    field: "Subscripcion",
    sortable: true,
  },
  {
    headerName: "Estatus",
    field: "Estatus",
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
