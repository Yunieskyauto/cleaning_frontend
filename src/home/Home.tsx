import React, { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom";
import "./home.scss"
export const Home = () => {
  const { userRole } = useOutletContext();
  const[welcome, setWelcome] = useState("Home")
  useEffect(() => {
   if (userRole.accessLevel == 2) {
    setWelcome("Hello employee")
   }
   if (userRole.accessLevel == 1) {
    setWelcome("Hello Admin")
   }
   if (userRole.accessLevel == 3) {
    setWelcome("Hello client")
   }
  }, [userRole])
    return (
        <div className="home">
          {welcome}
        </div>
    )
}