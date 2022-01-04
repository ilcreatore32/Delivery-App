import React, {useContext} from "react";

import { OpenEditContext } from "../context/openEditContext";

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
import { CustomOptionsButtons } from "./CustomOptionsButtons";

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
    field: "actions",
    headerName: "Acciones",
    headerAlign: "center",
    align: "center",
    width: 200,
    sortable: false,
    renderCell: ( thisRow) => {
      return (
        <CustomOptionsButtons thisRow={thisRow} page="shippment"/>
      );
    },
  },
];

/* Servicios Columns */
export const ServiciosColumns: GridColDef[] = [
  {
    headerName: "Id",
    field: "ST_Id",
    headerAlign: "center",
    align: "center",
    width: 90,
    sortable: true,
  },
  {
    headerName: "Medio de Transporte",
    field: "MT_Nombre",
    headerAlign: "center",
    align: "center",
    width: 210,
    sortable: true,
  },
  {
    headerName: "Inicio",
    field: "ST_HorarioIni",
    headerAlign: "center",
    align: "center",
    width: 120,
    sortable: true,
  },
  {
    headerName: "Fin",
    field: "ST_HorarioFin",
    headerAlign: "center",
    align: "center",
    width: 100,
    sortable: true,
  },
  {
    headerName: "Precio",
    field: "ST_Precio",
    headerAlign: "center",
    align: "center",
    width: 120,
    sortable: true,
  },
  {
    headerName: "Estatus",
    field: "ST_Status",
    headerAlign: "center",
    align: "center",
    width: 130,
    sortable: true,
  },
  {
    headerName: "Áreas de Operaciones",
    field: "Áreas",
    headerAlign: "center",
    align: "center",
    width: 220,
    sortable: true,
  },
  {
    field: "actions",
    headerName: "Acciones",
    headerAlign: "center",
    align: "center",
    width: 200,
    sortable: false,
    renderCell: (thisRow) => {
      return (
        <>
          <IconButton
            component={Link}
            to={`/Servicios/Detalles/${thisRow.row.ST_Id}`}
          >
            <VisibilityTwoToneIcon />
          </IconButton>
          <IconButton
            component={Link}
            to={`/Servicios/Detalles/${thisRow.row.ST_Id}`}
          >
            <EditTwoToneIcon color="info" />
          </IconButton>
          <IconButton
            component={Link}
            to={`/Servicios/Eliminar/${thisRow.row.ST_Id}`}
          >
            <DeleteTwoToneIcon color="error" />
          </IconButton>
        </>
      );
    },
  },
];

/* Vehiculos Columns */
export const VehiculosColumns: GridColDef[] = [
  {
    headerName: "Id",
    field: "Vehiculo_Id",
    headerAlign: "center",
    align: "center",
    width: 90,
    sortable: true,
  },
  {
    headerName: "Matricula",
    field: "Vehiculo_Matricula",
    headerAlign: "center",
    align: "center",
    width: 140,
    sortable: true,
  },
  {
    headerName: "Marca",
    field: "Vehiculo_Marca",
    headerAlign: "center",
    align: "center",
    width: 120,
    sortable: true,
  },
  {
    headerName: "Modelo",
    field: "Vehiculo_Modelo",
    headerAlign: "center",
    align: "center",
    width: 125,
    sortable: true,
  },
  {
    headerName: "Año",
    field: "Vehiculo_Anio",
    headerAlign: "center",
    align: "center",
    width: 110,
    sortable: true,
  },
  {
    headerName: "Pasajeros",
    field: "Vehiculo_Pasajeros",
    headerAlign: "center",
    align: "center",
    width: 150,
    sortable: true,
  },
  {
    headerName: "Capacidad de Carga",
    field: "Vehiculo_CapacidadCarga",
    headerAlign: "center",
    align: "center",
    width: 215,
    sortable: true,
  },
  {
    field: "actions",
    headerName: "Acciones",
    headerAlign: "center",
    align: "center",
    width: 200,
    sortable: false,
    renderCell: (thisRow) => {
      return (
        <>
          <IconButton
            component={Link}
            to={`/Vehiculos/Detalles/${thisRow.row.Vehiculo_Id}`}
          >
            <VisibilityTwoToneIcon />
          </IconButton>
          <IconButton
            component={Link}
            to={`/Vehiculos/Editar/${thisRow.row.Vehiculo_Id}`}
          >
            <EditTwoToneIcon color="info" />
          </IconButton>
          <IconButton
            component={Link}
            to={`/Vehiculos/Eliminar/${thisRow.row.Vehiculo_Id}`}
          >
            <DeleteTwoToneIcon color="error" />
          </IconButton>
        </>
      );
    },
  },
];

/* Pagos Columns */
export const PagosColumns: GridColDef[] = [
  {
    headerName: "Id",
    field: "PS_Id",
    headerAlign: "center",
    align: "center",
    width: 90,
    sortable: true,
  },
  {
    headerName: "Método de Pago",
    field: "PS_Metodo",
    headerAlign: "center",
    align: "center",
    width: 190,
    sortable: true,
  },
  {
    headerName: "Fecha",
    field: "PS_Fecha",
    headerAlign: "center",
    align: "center",
    width: 200,
    sortable: true,
  },
  {
    headerName: "Monto",
    field: "PS_Monto",
    headerAlign: "center",
    align: "center",
    width: 120,
    sortable: true,
  },
  {
    headerName: "Estatus",
    field: "PS_Status",
    headerAlign: "center",
    align: "center",
    width: 130,
    sortable: true,
  },
  {
    headerName: "Usuario",
    field: "Persona_Nombre",
    headerAlign: "center",
    align: "center",
    width: 138,
    sortable: true,
  },
  {
    field: "actions",
    headerName: "Acciones",
    headerAlign: "center",
    align: "center",
    width: 200,
    sortable: false,
    renderCell: (thisRow) => {
      return (
        <>
          <IconButton
            component={Link}
            to={`/Pagos/Detalles/${thisRow.row.PS_Id}`}
          >
            <VisibilityTwoToneIcon />
          </IconButton>
          <IconButton
            component={Link}
            to={`/Pagos/Editar/${thisRow.row.PS_Id}`}
          >
            <EditTwoToneIcon color="info" />
          </IconButton>
          <IconButton
            component={Link}
            to={`/Pagos/Eliminar/${thisRow.row.PS_Id}`}
          >
            <DeleteTwoToneIcon color="error" />
          </IconButton>
        </>
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
    width: 125,
    sortable: true,
  },
  {
    headerName: "Nombre",
    field: "Persona_Nombre",
    headerAlign: "center",
    align: "center",
    width: 130,
    sortable: true,
  },
  {
    headerName: "Apellido",
    field: "Persona_Apellido",
    headerAlign: "center",
    align: "center",
    width: 130,
    sortable: true,
  },
  {
    headerName: "Correo",
    field: "Usuario_Correo",
    headerAlign: "center",
    align: "center",
    width: 200,
    sortable: true,
  },
  {
    headerName: "Estatus",
    field: "Suscripcion_Status",
    headerAlign: "center",
    align: "center",
    width: 130,
    sortable: true,
  },
  {
    field: "actions",
    headerName: "Acciones",
    headerAlign: "center",
    align: "center",
    width: 200,
    sortable: false,
    renderCell: (thisRow) => {
      return (
        <>
          <IconButton
            component={Link}
            to={`/Usuarios/Detalles/${thisRow.row.Persona_Id}`}
          >
            <VisibilityTwoToneIcon />
          </IconButton>
          <IconButton
            component={Link}
            to={`/Usuarios/Editar/${thisRow.row.Persona_Id}`}
          >
            <EditTwoToneIcon color="info" />
          </IconButton>
          <IconButton
            component={Link}
            to={`/Usuarios/Eliminar/${thisRow.row.Persona_Id}`}
          >
            <DeleteTwoToneIcon color="error" />
          </IconButton>
        </>
      );
    },
  },
];
