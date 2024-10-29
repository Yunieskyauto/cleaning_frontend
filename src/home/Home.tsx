import React, { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom";
import "./home.scss"
export const Home = () => {
  const { employee } = useOutletContext();
  const[welcome, setWelcome] = useState("Home")
  useEffect(() => {
    if (employee.firstName !== "") {
       setWelcome("Welcome " + employee.firstName + " " + employee.lastName)
    }
  }, [employee])
    return (
        <div className="home">
          {welcome}
        </div>
    )
}