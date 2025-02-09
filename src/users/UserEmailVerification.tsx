import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const UserEmailVerification = ({onLoggedUser}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const emailVerificationToken = searchParams.get("token");

  useEffect(() => {
    const handleEmailVerification = async () => {
      if (!emailVerificationToken) {
        navigate(`/?messageType=error&message=We couldn't locate the invitation token`); // Redirect to a safe page if no token is found
        return;
      }

      try {
        const res = await fetch("/user-email-verification", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: emailVerificationToken }),
        });
         
        const data = await res.json();  // TODO add the response message to an alert and add the user to login
        
       
        if (res.ok) {
          onLoggedUser(data);
          navigate(`/?userId=${data.id}`)
        } else {
          navigate(`/?messageType=error&message=Invitation to invalid or consumed`)
          console.log("Dataaaa", data)
        }
        
      } catch (error) {
        console.error("Error during email verification:", error.message);
        // Navigate to home and optionally trigger a failed alert
        navigate("/", { state: { alert: "Email verification failed. Please try again." } });
      }
    };

    handleEmailVerification();
  }, [emailVerificationToken, navigate]);

  return null;
};
