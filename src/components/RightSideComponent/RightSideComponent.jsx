import React from "react";

/* React-Datatable */
import DataTable from "react-data-table-component";

/* CSS */
import "./RightSideComponent.css";

function RightSideComponent({ columns, data }) {

  const Styles = {
    headRow: {
      style: {
        border: "none",
      },
    },
    headCells: {
      style: {
        color: "#202124",
        fontSize: "14px",
        width: "100%",
      },
    },
    rows: {
      highlightOnHoverStyle: {
        backgroundColor: "#dc354530",
        borderBottomColor: "#FFFFFF",
        borderRadius: "25px",
        outline: "1px solid #FFFFFF",
      },
    },
    pagination: {
      style: {
        color: "#000",
        border: "none",
        justifyContent: "center",
        margin: ".5rem auto",
        width: "fit-content",
        borderRadius: "14px"
      },
    },
  };

  const paginationOptions = {
    rowsPerPageText: "Filas por Pagina",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  return (
    <>
      <DataTable
        className="table"
        columns={columns}
        data={data}
        pagination
        paginationComponentOptions={paginationOptions}
        fixedHeader
        fixedHeaderScrollHeight="600px"
        customStyles={Styles}
        highlightOnHover
      />
    </>
  );
}

export default RightSideComponent;
