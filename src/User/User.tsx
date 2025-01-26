import React from "react"
import { useLocation } from "react-router-dom"


export const User = () => {
   const location = useLocation()
   console.log(location.state.firstName)
    return(
        <>
        User
        </>
    )
}