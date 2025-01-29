import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { RegisterDialog } from '../components/dialogs/RegisterDialog.tsx';

export const Invited = () => {
    const navigate = useNavigate();

    // Extract query parameters using React Router's hook
    const [searchParams] = useSearchParams();
    const inviteToken = searchParams.get("token"); // Extract the 'token' parameter
    const [invitationMessage, setInvitationMessage] = useState({"type": "", "message": ""})

    const [dialogOpen, setDialogOpen] = useState(false); // Manage dialog visibility
    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        id: ""
    });

    // Function to fetch invite data
    const fetchInviteData = async (token: string) => {
        try {
            console.log("Processing invite token:", token); // Debug log for the token

            const res = await fetch("/invite", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Declare JSON content
                },
                body: JSON.stringify({token}), // Send token in the request body
            });

            const data = await res.json(); // Parse response JSON
            if (data.error) {
                setInvitationMessage({type: "error", message: data.message})
                navigate(`/?messageType=error&message=${data.message}` ); // Redirect if no token is present
                throw new Error(`Failed to fetch invite data: ${res}`);
            }
            setUserInfo({
                firstName: data.first_name || "",
                lastName: data.last_name || "",
                email: data.email || "",
                id: data.id || "",
            });
            setDialogOpen(true); // Open dialog after successful fetch
            setInvitationMessage({type: "success", message: "Invitation is successfully consumed"})
        } catch (error) {
            console.error("Error fetching invite data:", error);
            setInvitationMessage({type: "error", message: "Error fetching invite data"})
        }
    };

    useEffect(() => {
        if (inviteToken) {
            fetchInviteData(inviteToken); // Fetch data only if token exists
        } else {
            alert("No invite token found. Redirecting to the homepage.");
            setInvitationMessage({type: "error", message: "No token found"})
        }
    }, [inviteToken, navigate]); // Dependencies include `inviteToken` and `navigate`

    return (
        <div>
            {/* Pass the user information and dialog controls to RegisterDialog */}
            <RegisterDialog
                open={dialogOpen}
                userInfo={userInfo}
                onClose={() => setDialogOpen(false)} // Close dialog handler
            />
        </div>
    );
};
