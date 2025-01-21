import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const Invited = () => {
    const [searchParams] = useSearchParams(); // React hook to access query parameters
    const inviteToken = searchParams.get('token'); // Extract the value of 'token'

    console.log( "out",inviteToken)
    useEffect(() => {
        const handleSubmit = async () => {
            try {
                console.log("Invite token:", "Hello");
                const res = await fetch('/invite', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', // Indicates JSON data
                    },
                    body: JSON.stringify({ token: inviteToken }), // Properly stringify the data
                });

                const data = await res.json(); // Wait for the response and parse it as JSON
                console.log("Server Response:", data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        if (inviteToken) {
            handleSubmit(); // Only call if token is available
        }
        console.log( "in",inviteToken)
    }, [inviteToken]); // Re-run effect if inviteToken changes

    return <div className="admin">Admin</div>;
};