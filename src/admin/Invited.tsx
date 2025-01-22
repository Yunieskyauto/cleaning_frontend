import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RegisterDialog } from '../components/dialogs/RegisterDialog.tsx';

export const Invited = () => {
    const [searchParams] = useSearchParams(); // React hook to access query parameters
    const inviteToken = searchParams.get("token"); // Extract the value of 'token'
    const [dialogOpen, setDialogOpen] = useState(false);
    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        id: ""
    });

    useEffect(() => {
        const handleSubmit = async () => {
            try {
                console.log("Invite token:", inviteToken); // Debugging the token
                const res = await fetch("/invite", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json", // Indicates JSON data
                    },
                    body: JSON.stringify({ token: inviteToken }), // Properly stringify the data
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch invite data");
                }

                const data = await res.json(); // Wait for the response and parse it as JSON
                setUserInfo({
                    firstName: data.first_name || "",
                    lastName: data.last_name || "",
                    email: data.email || "",
                    id: data.id || ""
                });
            
            } catch (error) {
                console.error("Error:", error);
            }
        };

        if (inviteToken) {
            handleSubmit(); // Only call if token is available
        }
        setDialogOpen(true); // Ensure the dialog opens when the token is processed
    }, [inviteToken]); // Re-run effect if inviteToken changes

    return (
        <div>
            {/* Pass the userInfo as a prop to RegisterDialog */}
            <RegisterDialog
                open={dialogOpen}
                userInfo={userInfo} // Passing user info here
                onClose={() => setDialogOpen(false)} // Handle dialog close
            />
        </div>
    );
};