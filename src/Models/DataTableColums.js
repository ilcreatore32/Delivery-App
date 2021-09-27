/* DataTable Columns */

/* React-Router */
import { Link } from "react-router-dom";

/* Font-Awesome */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

/* URL handleClick */
const urlEnvios = "/Envios";
const urlServicios = "/Servicios";
const urlVehiculos = "/Vehiculos";

/* Envios Columns */
export const EnviosColumns = [
  {
    headerName: "id",
    field: "id",
  },
  {
    headerName: "Ubicación",
    field: "",
  },
  {
    headerName: "Productos",
    field: "",
  },
  {
    headerName: "Valor del Pedido",
    field: "",
  },
  {
    headerName: "Peso Total",
    field: "",
  },
  {
    headerName: "Fecha del Pedido",
    field: "",
  }
];

/* Servicios Columns */
export const ServiciosColumns = [
  {
    name: "id",
    selector: "id",
    sortable: true,
  },
  {
    name: "Medio de Transporte",
    selector: "",
    sortable: true,
  },
  {
    name: "Horario",
    selector: "",
    sortable: true,
  },
  {
    name: "Precio",
    selector: "",
    sortable: true,
  },
  {
    name: "Disponibilidad",
    selector: "",
    sortable: true,
  },
  {
    name: "Areas de Operacionciones",
    selector: "",
    sortable: true,
  },

  {
    cell: ({ id }) => (
      <Link to={`${urlServicios}/${id}`}>
        <FontAwesomeIcon style={{ color: "#EF233C" }} icon={faInfoCircle} />
      </Link>
    ),
    allowOverflow: true,
    button: true,
    width: "2rem",
  },
];

/* Vehiculos Columns */
export const VehiculosColumns = [
  {
    name: "id",
    selector: "id",
    sortable: true,
  },
  {
    name: "Tipo de Vehiculo",
    selector: "",
    sortable: true,
  },
  {
    name: "Nombre",
    selector: "",
    sortable: true,
  },
  {
    name: "Año",
    selector: "",
    sortable: true,
  },
  {
    name: "Pasajeros",
    selector: "",
    sortable: true,
  },
  {
    name: "Capacidad de Carga",
    selector: "date",
    sortable: true,
  },
  {
    name: "Matricula",
    selector: "",
    sortable: true,
  },
  {
    cell: ({ id }) => (
      <Link to={`${urlVehiculos}/${id}`}>
        <FontAwesomeIcon style={{ color: "#EF233C" }} icon={faInfoCircle} />
      </Link>
    ),
    allowOverflow: true,
    button: true,
    width: "2rem",
  },
];

/* Admin Envios Columns */
export const AdminEnviosColumns = [
  {
    name: "id",
    selector: "id",
    sortable: true,
  },
  {
    name: "Ubicación",
    selector: "",
    sortable: true,
  },
  {
    name: "Productos",
    selector: "",
    sortable: true,
  },
  {
    name: "Valor del Pedido",
    selector: "",
    sortable: true,
  },
  {
    name: "Peso Total",
    selector: "",
    sortable: true,
  },
  {
    name: "Fecha del Pedido",
    selector: "",
    sortable: true,
  },
  {
    cell: ({ id }) => (
      <Link to={`${urlEnvios}/${id}`}>
        <FontAwesomeIcon style={{ color: "#EF233C" }} icon={faInfoCircle} />
      </Link>
    ),
    allowOverflow: true,
    button: true,
    width: "2rem",
  },
  {
    cell: (
      { id } //Cambiar URL por PUT
    ) => (
      <Link to={`${urlEnvios}/${id}`}>
        <FontAwesomeIcon style={{ color: "#EF233C" }} icon={faEdit} />
      </Link>
    ),
    allowOverflow: true,
    button: true,
    width: "2rem",
  },
  {
    cell: (
      { id } //Cambiar URL por DELETE
    ) => (
      <Link to={`${urlEnvios}/${id}`}>
        <FontAwesomeIcon style={{ color: "#EF233C" }} icon={faTrashAlt} />
      </Link>
    ),
    allowOverflow: true,
    button: true,
    width: "2rem",
  },
];

/* Admin Servicios Columns */
export const AdminServiciosColumns = [
  {
    name: "id",
    selector: "id",
    sortable: true,
  },
  {
    name: "Medio de Transporte",
    selector: "",
    sortable: true,
  },
  {
    name: "Horario",
    selector: "",
    sortable: true,
  },
  {
    name: "Precio",
    selector: "",
    sortable: true,
  },
  {
    name: "Disponibilidad",
    selector: "",
    sortable: true,
  },
  {
    name: "Areas de Operacionciones",
    selector: "",
    sortable: true,
  },
  {
    cell: ({ id }) => (
      <Link to={`${urlEnvios}/${id}`}>
        <FontAwesomeIcon style={{ color: "#EF233C" }} icon={faInfoCircle} />
      </Link>
    ),
    allowOverflow: true,
    button: true,
    width: "2rem",
  },
  {
    cell: (
      { id } //Cambiar URL por PUT
    ) => (
      <Link to={`${urlEnvios}/${id}`}>
        <FontAwesomeIcon style={{ color: "#EF233C" }} icon={faEdit} />
      </Link>
    ),
    allowOverflow: true,
    button: true,
    width: "2rem",
  },
  {
    cell: (
      { id } //Cambiar URL por DELETE
    ) => (
      <Link to={`${urlEnvios}/${id}`}>
        <FontAwesomeIcon style={{ color: "#EF233C" }} icon={faTrashAlt} />
      </Link>
    ),
    allowOverflow: true,
    button: true,
    width: "2rem",
  },
];

/* Admin Vehiculos Columns */
export const AdminVehiculosColumns = [
  {
    name: "id",
    selector: "id",
    sortable: true,
  },
  {
    name: "Tipo de Vehiculo",
    selector: "",
    sortable: true,
  },
  {
    name: "Nombre",
    selector: "",
    sortable: true,
  },
  {
    name: "Año",
    selector: "",
    sortable: true,
  },
  {
    name: "Pasajeros",
    selector: "",
    sortable: true,
  },
  {
    name: "Capacidad de Carga",
    selector: "date",
    sortable: true,
  },
  {
    name: "Matricula",
    selector: "",
    sortable: true,
  },
  {
    cell: ({ id }) => (
      <Link to={`${urlEnvios}/${id}`}>
        <FontAwesomeIcon style={{ color: "#EF233C" }} icon={faInfoCircle} />
      </Link>
    ),
    allowOverflow: true,
    button: true,
    width: "2rem",
  },
  {
    cell: (
      { id } //Cambiar URL por PUT
    ) => (
      <Link to={`${urlEnvios}/${id}`}>
        <FontAwesomeIcon style={{ color: "#EF233C" }} icon={faEdit} />
      </Link>
    ),
    allowOverflow: true,
    button: true,
    width: "2rem",
  },
  {
    cell: (
      { id } //Cambiar URL por DELETE
    ) => (
      <Link to={`${urlEnvios}/${id}`}>
        <FontAwesomeIcon style={{ color: "#EF233C" }} icon={faTrashAlt} />
      </Link>
    ),
    allowOverflow: true,
    button: true,
    width: "2rem",
  },
];
