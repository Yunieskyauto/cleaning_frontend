import { useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const UserEmailVerification = ({ onLoggedUser, onError }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const emailVerificationToken = searchParams.get("token");

  /** ✅ Memoized function to handle email verification */
  const handleEmailVerification = useCallback(async () => {
    if (!emailVerificationToken) {
      onError("We couldn't locate the invitation token");
      return;
    }

    try {
      const res = await fetch("/user-email-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: emailVerificationToken }),
      });

      const data = await res.json();

      if (res.ok) {
        onLoggedUser(data);
      } else {
        console.log("Verification Failed:", data);
        onError("Invitation is invalid or has been consumed.");
      }
    } catch (error) {
      onError("An error occurred during email verification.");
    }
    navigate("/");
  }, [emailVerificationToken, onLoggedUser, onError]);

  /** ✅ Runs only when `emailVerificationToken` is available */
  useEffect(() => {
    if (emailVerificationToken) {
      handleEmailVerification();
    }
  }, [emailVerificationToken, handleEmailVerification]);

  return null;
};
