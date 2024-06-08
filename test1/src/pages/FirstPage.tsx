import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import "ag-grid-enterprise"
import Grid from '../components/Grid';
import { GridApi } from 'ag-grid-enterprise';
import CustomFilter2 from '../components/CustomFilter2';
import { customFilter } from '../components/CustomFilter3';
import Loader from '../components/Loader';
const FirstPage = () => {

  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [isLoading, setIsLoading] = useState<boolean | null>(false);
  const onGridReady = (params: any) => {
    setGridApi(params.api as GridApi);
  }

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
    { headerName: 'Make', field: "make", filter: customFilter(rowData), floatingFilter: true, filterParams: { rowData, clearButton: true, resetButton: true }, reactiveCustomComponents: true },
    { field: "model", filter: 'agSetColumnFilter ', floatingFilter: true },
    { field: "price", floatingFilter: true },
    { field: "electric", floatingFilter: true }
  ]);

  useEffect(() => {
    console.log("Triggered when rowData changed")
    setColDefs([...colDefs])
    if (gridApi) {
      console.log("Triggered on filter changed")
      gridApi.resetQuickFilter()
      gridApi.setFilterModel(null);
      gridApi.onFilterChanged();
    }
  }, [rowData])


  const setNewList = () => {
    setRowData([])
    setTimeout(() => {
      setRowData([
        { make: "Ford1", model: "F-Series", price: 8875, electric: false },
        { make: "Ford2", model: "S-Series", price: 32532, electric: false },
        { make: "Ford3", model: "A-Series", price: 32456, electric: false },
        { make: "Ford4", model: "X-Series", price: 6435, electric: false },
      ])
    }, 1000)
  }

  return (
    <div
      className="ag-theme-quartz" // applying the grid theme
      style={{ height: 500 }} // the grid will fill the size of the parent container
    >
      <AgGridReact
        onGridReady={onGridReady}
        gridOptions={{
          suppressServerSideFullWidthLoadingRow: true,
          
        }}
        rowData={rowData}
        columnDefs={colDefs as any}
      />
      <button onClick={setNewList}>Click me</button>
    </div>
  )
}

export default FirstPage