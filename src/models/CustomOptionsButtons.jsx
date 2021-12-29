import {useContext} from "react";
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

export function CustomOptionsButtons({thisRow}){
  const { setOpenEditShippment, setShippmentToEdit} = useContext(OpenEditContext);
    return (
        <>
          <IconButton
            component={Link}
            to={`/Envios/Detalles/${thisRow.row.SE_Id}`}
          >
            <VisibilityTwoToneIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setOpenEditShippment(true);
              setShippmentToEdit(thisRow.row.SE_Id);
            }}
          >
            <EditTwoToneIcon color="info" />
          </IconButton>
          <IconButton
            component={Link}
            to={`/Envios/Eliminar/${thisRow.row.SE_Id}`}
          >
            <DeleteTwoToneIcon color="error" />
          </IconButton>
        </>
    );    
}