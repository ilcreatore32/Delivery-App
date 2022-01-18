import { useContext, useEffect, useState } from "react";
import { OpenEditContext } from "../context/openEditContext";
import { DeleteContext } from "../context/deleteContext";

/* Material UI DataTable */
import { GridColDef } from "@mui/x-data-grid";

/* React-Router */
import { Link } from "react-router-dom";

/* Material UI */
import IconButton from "@mui/material/IconButton";

/* Material UI Icons */
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { UserContext } from "../context/UserContextT";

export function CustomOptionsButtons({ thisRow, page }) {
  const { view_type } = useContext(UserContext);
  const {
    setOpenEditShippment,
    setShippmentToEdit,
    setServiceToEdit,
    setOpenEditService,
    setVehicleToEdit,
    setOpenEditVehicle,
    setOpenEditPayment,
    setPaymentToEdit
  } = useContext(OpenEditContext);
  const {
    setOpenDeleteShippment,
    setShippmentToDelete,
    setServiceToDelete,
    setOpenDeleteService,
    setVehicleToDelete,
    setOpenDeleteVehicle,
    setOpenDeletePayment,
    setPaymentToDelete
  } = useContext(DeleteContext);
  const [details, setDetails] = useState("")
  const [displayEdit, setDisplayEdit] = useState(false)
  const [displayDelete, setDisplayDelete] = useState(false)
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
      case "payment":
        setOpenEditPayment(true);
        setPaymentToEdit(thisRow.row.PS_Id);
        return;
      default:
        break;
    }
  };
  const deleteFunction = () => {
    switch (page) {
      case "shippment":
        setOpenDeleteShippment(true);
        setShippmentToDelete(thisRow.row.SE_Id);
        return;
      case "service":
        setOpenDeleteService(true);
        setServiceToDelete(thisRow.row.ST_Id);
        return;
      case "vehicle":
        setOpenDeleteVehicle(true);
        setVehicleToDelete(thisRow.row.Vehiculo_Id);
        return;
      case "payment":
        setOpenDeletePayment(true);
        setPaymentToDelete(thisRow.row.PS_Id);
        return;
      default:
        break;
    }
  };
  useEffect(() => {
    if (!page) return
    switch (page) {
      case "shippment":
        setDetails(`/Envios/Detalles/${thisRow.row.SE_Id}`);
        if (view_type === "A") {
          setDisplayEdit(true)
          setDisplayDelete(true)
        }
        return;
      case "service":
        setDetails(`/Servicios/Detalles/${thisRow.row.ST_Id}`);
        if (view_type === "A" || view_type === "T") {
          setDisplayEdit(true)
          setDisplayDelete(true)
        }
        return;
       case "vehicle":
        setDetails(`/Vehiculos/Detalles/${thisRow.row.Vehiculo_Id}`);
        if (view_type === "A" || view_type === "T") {
          setDisplayEdit(true)
          setDisplayDelete(true)
        }
        return;
      case "payment":
        setDetails(`/Pagos/Detalles/${thisRow.row.PS_Id}`);
        if (view_type === "A") {
          setDisplayEdit(true)
          setDisplayDelete(true)
        }
        return;
      default:
        break;
    }
  },[page])
  return (
    <>
      <IconButton component={Link} to={details}>
        <VisibilityTwoToneIcon />
      </IconButton>
      {displayEdit && <IconButton onClick={editFunction}>
        <EditTwoToneIcon color="info" />
      </IconButton>}
     {displayDelete && <IconButton onClick={deleteFunction}>
        <DeleteTwoToneIcon color="error" />
      </IconButton>}
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
