import React, { useEffect, useState, useMemo } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"
import { TableGrid } from "../components/table/TableGrid.tsx"
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid



export const Employees = () => {
  const { employee } = useOutletContext()
  const navigate = useNavigate()
//{ "firstName": "", "lastName": "", "email": ""}
  const [employees, setEmployees] = useState([{ "firstName": "", "lastName": "", "email": ""}])
  
  const [colDefs, setColDefs] = useState([
   { field: "firstName" },
   { field: "lastName" },
   { field: "email" },
  ])

  const defaultColDef = useMemo(() => { 
    return {
          width: 500,
          cellStyle: { fontWeight: 'bold' },
      };
  }, []);

  
  useEffect(() => {
    let x = []
    if (employee.accessToken !== "") {
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      headers.append('Authorization', 'Bearer ' + employee.accessToken)

      const requestOptions = {
        method: "GET",
        headers: headers,
      }
      console.log("Hello")
      fetch("/admin/employees", requestOptions)
        .then((response) => response.json())
        .then(data => {
   
          data.map((item) => {
            let empl = {
              firstName: item.first_name,
              lastName: item.last_Name,
              email: item.email,
            }
           setEmployees(employees => [...employees, empl])
          })
        })
    } else {
      navigate("/")
    }
   

  }, [])
  return (
    <div className="Employees">
        // wrapping container with theme & size
    <div
     className="ag-theme-quartz-dark" // applying the Data Grid theme
     style={{ height: 500}} // the Data Grid will fill the size of the parent container
    >
      <AgGridReact
          rowData={employees}
          columnDefs={colDefs}
          defaultColDef={defaultColDef} 
      />
    </div>
    </div>
  )
}