import { useContext } from "react";

/* Material UI */
import { Paper, IconButton } from "@mui/material";

/* Context */
import { filterMenuContext } from "../../context/filterMenuContext";

/* Material Icons */
import ManageSearch from "@mui/icons-material/ManageSearch";
import CloseIcon from "@mui/icons-material/Close";

/* React-Datatable */
import { DataGrid } from "@mui/x-data-grid";

/* CSS */
import "./RightSideComponent.css";

function RightSideComponent({ rowId, Columns, Data, children }) {
  const rows = [];

  const columns = [];

  const getRowId = (row, rowId) => {
    let id;
    for (const [key, value] of Object.entries(row)) {
      if (key === rowId) {
        return (id = value);
      }
    }
    return id;
  };

  const FilterMenuContext = useContext(filterMenuContext);

  return (
    <>
      <Paper variant="outlined" sx={{ display: "flex", justifyContent: "space-between",margin: ".3rem auto" }}>
        <IconButton
          onClick={() =>
            FilterMenuContext.setFilterMenu(!FilterMenuContext.filterMenu)
          }
        >
          {FilterMenuContext.filterMenu ? (
            <CloseIcon color="primary" />
          ) : (
            <ManageSearch color="primary" />
          )}
        </IconButton>
        {children}
      </Paper>
      <div style={{ display: "flex", height: "80vh" }}>
        <div style={{ height: "100%", flexGrow: 1 }}>
          <DataGrid
            rows={Data ? Data : rows}
            columns={Columns ? Columns : columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            autoWidth
            getRowId={(row) => getRowId(row, rowId)}

            /* filterModel={{
              items: [
                {
                  columnField: "SE_Id",
                  operatorValue: "contains",
                  value: "11",
                },
              ],
            }} */
          />
        </div>
      </div>
    </>
  );
}

export default RightSideComponent;
