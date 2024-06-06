import React, { useState } from 'react'
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import "ag-grid-enterprise"
const FirstPage = () => {
  const [rowData, setRowData] = useState([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Tesla", model: "Model Y", price: 35432, electric: true },
    { make: "Ford", model: "F-Series", price: 324, electric: false },
    { make: "Ford", model: "F-Series", price: 64534, electric: false },
    { make: "Ford", model: "F-Series", price: 6435, electric: false },
    { make: "Toyota", model: "Corolla", price: 3243256, electric: false },
    { make: "Ford", model: "F-Series", price: 97645, electric: false },
    { make: "Ford", model: "F-Series", price: 54626, electric: false },
    { make: "Ford", model: "F-Series", price: 8875, electric: false },
  ]);
  const [colDefs, setColDefs] = useState([
    { field: "make", filter: 'agSetColumnFilter ', floatingFilter: true},
    { field: "model", filter: 'agSetColumnFilter ', floatingFilter: true },
    { field: "price" , floatingFilter: true},
    { field: "electric", floatingFilter: true }
  ]);


  const setNewList = () => {
    setRowData([
      
    ])
  }

  return (
    <div
      className="ag-theme-quartz" // applying the grid theme
      style={{ height: 500 }} // the grid will fill the size of the parent container
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs as any}
      />
      <button onClick={setNewList}>Click me</button>
    </div>
  )
}

export default FirstPage