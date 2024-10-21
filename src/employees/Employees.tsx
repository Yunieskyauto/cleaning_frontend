import React, { useEffect } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"
export const Employees = () => {
  const { employee } = useOutletContext()
  const navigate = useNavigate()
  useEffect(() => {
    if (employee.accessToken !== "") {
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      headers.append('Authorization', 'Bearer ' + employee.accessToken)

      const requestOptions = {
        method: "GET",
        headers: headers,
      }

      fetch("/admin/employees", requestOptions)
        .then((response) => response.json())
        .then(data => {
          console.log(data)
        })
    } else {
      navigate("/")
    }
  }, [employee])
  return (
    <div className="Employees">Employees</div>
  )
}