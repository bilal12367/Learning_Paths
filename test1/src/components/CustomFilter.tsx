import { GridApi } from 'ag-grid-enterprise'
import React, { useEffect, useState } from 'react'

const CustomFilter = (props: any) => {
  const [rowData, setRowData] = useState<any[]>([])
  useEffect(() => {
    console.log("Triggered: ",props)
    let newRowData = Object.values(props.api.rowModel.rowsToDisplay).map((data: any) => {
      return data.data.make;
    })
    console.log('rowData', newRowData)
    const set : Set<string> = new Set(newRowData);
    setRowData(Array.from(set))
  }, [])

  useEffect(() => {
    console.log("Triggered with props: ", props)
  }, props)

  return (
    <div>
      {
        Object.values(rowData).map((item: any) => {
          console.log(item);
          return <div>{item}</div>
        })
      }
    </div>
  )
}

export default CustomFilter