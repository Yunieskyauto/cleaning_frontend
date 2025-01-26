import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const UserEmailVerification = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const emailVerificationToken = searchParams.get("token");

  useEffect(() => {
    const handleEmailVerification = async () => {
      if (!emailVerificationToken) {
        console.error("No email verification token found.");
        navigate("/"); // Redirect to a safe page if no token is found
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

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Email verification failed");
        }

        const data = await res.json();  // TODO add the response message to an alert and add the user to login

        // Navigate to the home page and ask the user to login
        navigate("/");
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
