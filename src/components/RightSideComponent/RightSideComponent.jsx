import React from "react";

/* React-Datatable */
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

/* CSS */
import "./RightSideComponent.css";

function RightSideComponent({ Columns, Data }) {
  const rows = [{ id: 1 }];

  const columns = [
    {
      headerName: "id",
      field: "id",
    },
  ];

  return (
    <>
      <DataGrid
        rows={Data ? Data : rows}
        columns={Columns ? Columns : columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        autoWidth
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </>
  );
}

export default RightSideComponent;
