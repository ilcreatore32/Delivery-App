import { useContext } from "react";
import { OpenEditContext } from "../context/openEditContext";
import { DeleteContext } from "../context/deleteContext";

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

export function CustomOptionsButtons({ thisRow, page }) {
  const {
    setOpenEditShippment,
    setShippmentToEdit,
    setServiceToEdit,
    setOpenEditService,
    setVehicleToEdit,
    setOpenEditVehicle,
  } = useContext(OpenEditContext);
  const editFunction = () => {
    switch (page) {
      case "shippment":
        setOpenEditShippment(true);
        setShippmentToEdit(thisRow.row.SE_Id);
        return;
      case "service":
        setOpenEditService(true);
        setServiceToEdit(thisRow.row.ST_Id);
        return;
      case "vehicle":
        setOpenEditVehicle(true);
        setVehicleToEdit(thisRow.row.Vehiculo_Id);
        return;
      default:
        break;
    }
  };
  return (
    <>
      <IconButton component={Link} to={`/Envios/Detalles/${thisRow.row.SE_Id}`}>
        <VisibilityTwoToneIcon />
      </IconButton>
      <IconButton onClick={editFunction}>
        <EditTwoToneIcon color="info" />
      </IconButton>
      <IconButton component={Link} to={`/Envios/Eliminar/${thisRow.row.SE_Id}`}>
        <DeleteTwoToneIcon color="error" />
      </IconButton>
    </>
  );
}
export function CustomDeleteArea({ thisRow }) {
  const { setRemoveAreaService } = useContext(DeleteContext);
  return (
    <IconButton
      component={Link}
      onClick={() => {
        setRemoveAreaService(thisRow.row);
      }}
    >
      <DeleteTwoToneIcon color="error" />
    </IconButton>
  );
}
