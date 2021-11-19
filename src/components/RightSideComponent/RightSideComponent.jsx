import React from "react";

/* React-Datatable */
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

/* CSS */
import "./RightSideComponent.css";

function RightSideComponent({ rowId, Columns, Data }) {
  const rows = [];

  const columns = [];

  const getRowId = (row, rowId) => {
    let id;
    for(const [key, value] of Object.entries(row)){
      if (key === rowId) {
        return id = value;
      }
    }
    return id;
  };

  return (
    <>
      <DataGrid
        rows={Data ? Data : rows}
        columns={Columns ? Columns : columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        autoWidth
        getRowId={(row) => getRowId(row, rowId)}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </>
  );
}

export default RightSideComponent;
