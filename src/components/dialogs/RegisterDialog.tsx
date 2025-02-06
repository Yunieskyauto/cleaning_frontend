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
import { useNavigate } from "react-router-dom";

export const RegisterDialog = ({ open, userInfo, onClose }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const [passwordStateMessage, setPasswordStateMessage] = useState({"type": "", "message": ""})
   
  const navigate = useNavigate();
  // Form state
  const [formState, setFormState] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  // Disabled fields state
  const [disabledFields, setDisabledFields] = useState({
    first_name: false,
    last_name: false,
    email: false,
  });

  // Initialize form state and disabled fields
  useEffect(() => {
    setOpenDialog(open);

    if (userInfo) {
      setFormState({
        first_name: userInfo.firstName || "",
        last_name: userInfo.lastName || "",
        email: userInfo.email || "",
        password: "",
      });

      setDisabledFields({
        first_name: Boolean(userInfo.firstName),
        last_name: Boolean(userInfo.lastName),
        email: Boolean(userInfo.email),
      });
    }

    if (passwordStateMessage.type !== "") {
      navigate(`/?messageType=${passwordStateMessage.type}&message=${passwordStateMessage.message}` ); // Redirect if no token is present
    }
  }, [open, userInfo, passwordStateMessage]);

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/password-set", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userInfo.id,
          password: formState.password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        navigate(`/?alertType=success&message=Your password has been successfully set. Please log in to access the Cleaners feature` ); // Redirect if no token is present
      } else {
        setPasswordStateMessage({type: "error", message: data.memssage})
      }

      handleCloseDialog(false);
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  // Close dialog
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
          padding: 0,
          width: "400px",
          maxWidth: "90%",
          overflow: "hidden",
        },
        component: "form",
        onSubmit: handleSubmit,
      }}
    >
      {/* Dialog Header */}
      <Box
        sx={{
          bgcolor: "#d3d3d3",
          textAlign: "center",
          padding: 3,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
          Welcome!
        </Typography>
        <Typography
          variant="body2"
          sx={{
            marginTop: 1,
            color: "#666",
          }}
        >
          Glad to have you here. Please fill out the details below.
        </Typography>
      </Box>

      {/* Dialog Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
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
          disabled={disabledFields.first_name}
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Last Name"
          name="last_name"
          value={formState.last_name}
          onChange={handleInputChange}
          required
          disabled={disabledFields.last_name}
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
          disabled={disabledFields.email}
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

        {/* Dialog Actions */}
        <DialogActions
          sx={{
            justifyContent: "center",
            marginTop: 2,
            gap: 2,
          }}
        >
          <Button
            onClick={() => handleCloseDialog(false)}
            color="secondary"
            variant="outlined"
            sx={{
              borderRadius: "8px",
              padding: "10px 20px",
              fontSize: "14px",
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
              fontSize: "14px",
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
