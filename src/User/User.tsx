import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"


export const User = () => {
   const navigate = useNavigate();
   const location = useLocation()
   const userId = location.state.id
   const [userName, setUserName] = useState("");

   useEffect(() => {
      const handleUserLoading = async () => {
        /*
        try {
            const res = await fetch("/user/profile", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: userId }),
              });

              if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Loading user failed");
              }

              const data = await res.json();
              setUserName(data.first_name)
              console.log("User Profile data", data)

        }catch(error) {
          console.log("Error loading user profile", error.message);
          // Navigate to home and optionally trigger a failed alert
          navigate("/", { state: { alert: "Error loading user profile. Please try again." } });
        }
        */
      }
      
      handleUserLoading();
   },[])
    return(
        <>
        User
        </>
    )
}