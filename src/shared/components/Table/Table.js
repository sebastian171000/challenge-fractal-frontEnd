/** @format */

import React from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { Link } from "react-router-dom";

const Table = (props) => {
  const columns = [
    {
      headerName: "First Name",
      field: "firstName",
      checkboxSelection: true,
    },
    {
      headerName: "Last Name",
      field: "lastName",
    },
    {
      headerName: "Phone",
      field: "phone",
    },
    {
      headerName: "Email",
      field: "email",
    },
    {
      headerName: "action",
      editable: false,
      sortable: false,
      filter: false,
      cellRendererFramework: (params) => (
        <Link className='btnUpdate' to={`update/${params.data._id}`}>
          Update
        </Link>
      ),
    },
  ];
  const defaultColDef = {
    sortable: true,
    editable: true,
    filter: true,
    flex: 1,
    floatingFilter: true,
  };

  return (
    <div className='ag-theme-alpine' style={{ height: 400, width: 900 }}>
      <AgGridReact
        rowData={props.data}
        columnDefs={columns}
        defaultColDef={defaultColDef}
      />
    </div>
  );
};

export default Table;
