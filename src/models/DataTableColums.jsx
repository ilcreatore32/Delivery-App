/* React-Router */
import { Link } from "react-router-dom";

/* Material UI */
import IconButton from "@mui/material/IconButton";

/* Material UI Icons*/
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

/* Components */
import {
  CustomDeleteArea,
  CustomOptionsButtons,
} from "./CustomOptionsButtons.jsx";
import CustomProductsCell from "./CustomProductsCell";
import CustomAreasCell from "./CustomAreasCell";

/* Envios Columns */
export const EnviosColumns = [
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
    renderCell: (thisRow) => {
      return thisRow.row.SE_Fecha.split("T")[0];
    },
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
    renderCell: (thisRow) => {
      return (
        <>
          <CustomProductsCell thisRow={thisRow} />
        </>
      );
    },
  },
  {
    field: "actions",
    headerName: "Acciones",
    headerAlign: "center",
    align: "center",
    width: 200,
    sortable: false,
    renderCell: (thisRow) => {
      return <CustomOptionsButtons thisRow={thisRow} page="shippment" />;
    },
  },
];

/* Servicios Columns */
export const ServiciosColumns = [
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
    renderCell: (thisRow) => {
      switch (thisRow.row.ST_Status) {
        case "D":
          return "Disponible";
        case "N":
          return "No Disponible";
        case "E":
          return "Eliminado";
        default:
          break;
      }
    },
  },
  {
    headerName: "Áreas de Operaciones",
    field: "Áreas",
    headerAlign: "center",
    align: "center",
    width: 220,
    sortable: true,
    renderCell: (thisRow) => {
      return (
        <>
          <CustomAreasCell thisRow={thisRow} />
        </>
      );
    },
  },
  {
    field: "actions",
    headerName: "Acciones",
    headerAlign: "center",
    align: "center",
    width: 200,
    sortable: false,
    renderCell: (thisRow) => {
      return <CustomOptionsButtons thisRow={thisRow} page="service" />;
    },
  },
];

/* Vehiculos Columns */
export const VehiculosColumns = [
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
    renderCell: (thisRow) => {
      return `${thisRow.row.Vehiculo_CapacidadCarga} Kg`;
    },
  },
  {
    field: "actions",
    headerName: "Acciones",
    headerAlign: "center",
    align: "center",
    width: 200,
    sortable: false,
    renderCell: (thisRow) => {
      return <CustomOptionsButtons thisRow={thisRow} page="vehicle" />;
    },
  },
];

/* Pagos Columns */
export const PagosColumns = [
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
    renderCell: (thisRow) => {
      switch (thisRow.row.PS_Metodo) {
        case "T":
          return "Transferencia";
        case "E":
          return "Efectivo";
        case "P":
          return "Pago Móvil";
        default:
          break;
      }
    },
  },
  {
    headerName: "Fecha",
    field: "PS_Fecha",
    headerAlign: "center",
    align: "center",
    width: 200,
    sortable: true,
    renderCell: (thisRow) => {
      return thisRow.row.PS_Fecha.split("T")[0];
    },
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
    renderCell: (thisRow) => {
      switch (thisRow.row.PS_Status) {
        case "P":
          return "Pendiente";
        case "A":
          return "Aprobado";
        case "R":
          return "Rechazado";
        default:
          break;
      }
    },
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
          <CustomOptionsButtons thisRow={thisRow} page="payment" />
        </>
      );
    },
  },
];

/* Usuarios Columns */
export const UsuariosColumns = [
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
    headerName: "Suscripcion Estatus",
    field: "Suscripcion_Status",
    headerAlign: "center",
    align: "center",
    width: 130,
    sortable: true,
    renderCell: (thisRow) => {
      switch (thisRow.row.Suscripcion_Status) {
        case "S":
          return "Solvente";
        case "P":
          return "Pendiente de pago";
        case "V":
          return "Vencida";
        case "C":
          return "Cancelada";
        default:
          break;
      }
    },
  },
  {
    headerName: "Estatus Cuenta",
    field: "Usuario_Status",
    headerAlign: "center",
    align: "center",
    width: 130,
    sortable: true,
    renderCell: (thisRow) => {
      switch (thisRow.row.Usuario_Status) {
        case "A":
          return "Activa";
        case "P":
          return "Pendiente de Activación";
        case "S":
          return "Suspendida";
        default:
          break;
      }
    },
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
            to={`/Usuarios/Editar/${thisRow.row.Persona_Id}?adminView=true`}
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

/* Areas Columns */
export const AreasColumns = [
  {
    headerName: "Entidad Federal",
    field: "EF_Nombre",
    headerAlign: "center",
    align: "center",
    flex: 1,
    sortable: true,
  },
  {
    headerName: "Municipio",
    field: "Municipio_Nombre",
    headerAlign: "center",
    align: "center",
    flex: 1,
    sortable: true,
  },
  {
    headerName: "Parroquía",
    field: "Parroquia_Nombre",
    headerAlign: "center",
    align: "center",
    flex: 1,
    sortable: true,
  },
  {
    field: "actions",
    headerName: "Acciones",
    headerAlign: "center",
    align: "center",
    flex: 1,
    sortable: false,
    renderCell: (thisRow) => {
      return <CustomDeleteArea thisRow={thisRow} />;
    },
  },
];

/* Areas Columns Disabled */
export const AreasDisabled = [
  {
    headerName: "Entidad Federal",
    field: "EF_Nombre",
    headerAlign: "center",
    align: "center",
    flex: 1,
    sortable: true,
  },
  {
    headerName: "Municipio",
    field: "Municipio_Nombre",
    headerAlign: "center",
    align: "center",
    flex: 1,
    sortable: true,
  },
  {
    headerName: "Parroquía",
    field: "Parroquia_Nombre",
    headerAlign: "center",
    align: "center",
    flex: 1,
    sortable: true,
  },
];
