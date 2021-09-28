import React from "react";

/* React-Datatable */
import { DataGrid } from "@mui/x-data-grid";

/* CSS */
import "./RightSideComponent.css";

function RightSideComponent({ Columns, Data }) {

  const rows = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
  ];

  const columns = [
    {
      headerName: "id",
      field: "id",
    }
  ];
  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </>
  );
}

export default RightSideComponent;
