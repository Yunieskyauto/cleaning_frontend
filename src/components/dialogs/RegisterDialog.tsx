import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
} from "@mui/material";

export const RegisterDialog = ({open, userInfo, onClose}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [formState, setFormState] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [fistNamedDisabled, setFirstNameDisabled] = useState(false);
  const [lastNameDisabled, setLastNameDisabled] = useState(false);
  const [emailDisabled, setEmailDisabled] = useState(false);

  
  useEffect(() => {
    setOpenDialog(open);

    // Initialize form state with userInfo values when userInfo changes
    if (userInfo) {
      setFormState((prevState) => ({
        ...prevState,
        first_name: userInfo.firstName || "",
        last_name: userInfo.lastName || "",
        email: userInfo.email || "",
      }));
      if (userInfo.first_name !== "") {
        setFirstNameDisabled(true)
      }
      if (userInfo.last_name !== "") {
        setLastNameDisabled(true)
      }
      if (userInfo.email !== "") {
        setEmailDisabled(true)
      }
    }
  }, [open, userInfo]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        // Debugging the form state and user info
        console.log("user:", { id: userInfo.id, password: formState.password });

        // Make the POST request
        const res = await fetch("/password-set", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Indicates JSON data
            },
            body: JSON.stringify({
                id: userInfo.id, // Correctly pass the ID
                password: formState.password, // Correctly pass the password
            }), // Properly stringify the data
        });

        // Check for response status
        if (!res.ok) {
            const errorMessage = `Failed to set password: ${res.status} ${res.statusText}`;
            throw new Error(errorMessage);
        }

        // Parse the JSON response
        const data = await res.json();
        console.log("response:", data); // Debugging the response

        // You can add further actions here (e.g., updating state, showing a success message, etc.)
    } catch (error) {
        console.error("Error during password set:", error);
    } finally {
        // Always close the dialog, whether the request succeeds or fails
        handleCloseDialog(false);
    }
};


  const handleCloseDialog = (isOpen) => {
    setOpenDialog(isOpen);
    onClose(isOpen);
  };

  return (
    <Dialog
      open={openDialog}
      onClose={() => handleCloseDialog(false)}
      PaperProps={{
        sx: {
          borderRadius: "10px",
          padding: "0px",
          width: "400px",
          maxWidth: "90%",
          overflow: "hidden",
        },
        component: "form",
        onSubmit: handleSubmit,
      }}
    >
      {/* Gray Box Header */}
      <Box
        sx={{
          bgcolor: "#d3d3d3",
          color: "black",
          textAlign: "center",
          padding: 3,
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        Welcome!
        <Typography
          variant="body2"
          sx={{
            marginTop: 1,
            color: "black",
            fontSize: "14px",
          }}
        >
          Glad to have you here. Please fill out the details below.
        </Typography>
      </Box>

      {/* Form Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          padding: 3,
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          label="First Name"
          name="first_name"
          value={formState.first_name}
          onChange={handleInputChange}
          required
          disabled={fistNamedDisabled}
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Last Name"
          name="last_name"
          value={formState.last_name}
          onChange={handleInputChange}
          required
          disabled={lastNameDisabled}
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Email"
          name="email"
          type="email"
          value={formState.email}
          onChange={handleInputChange}
          required
          disabled={emailDisabled}
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Password"
          name="password"
          type="password"
          value={formState.password}
          onChange={handleInputChange}
          required
        />

        <DialogActions sx={{ justifyContent: "center", width: "100%", mt: 2 }}>
          <Button
            onClick={() => handleCloseDialog(false)}
            color="secondary"
            variant="outlined"
            sx={{
              borderRadius: "8px",
              padding: "10px 20px",
              fontSize: "16px",
              borderColor: "#4a4a4a",
              color: "#4a4a4a",
              "&:hover": {
                borderColor: "#333",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "#4a4a4a",
              borderRadius: "8px",
              padding: "10px 20px",
              fontSize: "16px",
              color: "white",
              "&:hover": {
                backgroundColor: "#333",
              },
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
