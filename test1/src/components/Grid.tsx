import { AgGridReact } from 'ag-grid-react'
import React from 'react'

interface GridProps {
  rowData: any;
  colDefs: any;
}

const Grid = ({ rowData, colDefs }: GridProps) => {
  return (
    <AgGridReact
      rowData={rowData}
      columnDefs={colDefs as any}
    />
  )
}

export default Grid