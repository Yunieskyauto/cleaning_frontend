import React, { useEffect, useState } from "react"
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import "./home.scss"
export const Home = () => {
  const { userName } = useOutletContext();
  const[welcome, setWelcome] = useState("Home")
  useEffect(() => {
    if (userName !== "") {
       setWelcome("Welcome " + userName)
    }
  }, [userName])
    return (
        <div className="home">
          {welcome}
        </div>
    )
}