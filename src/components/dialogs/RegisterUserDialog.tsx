import React, { useState, useEffect } from "react";
import { Box, Button, Dialog, TextField, Typography } from "@mui/material";

export const RegisterUserDialog = ({ open, onClose, onRegister, onLogin }) => {

  // Form state
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  });

  // Error state
  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  });

  // Handle input changes
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" })); // Clear error on input
  };

  // Validate inputs
  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors = {
      first_name: formData.first_name ? "" : "First name is required.",
      last_name: formData.last_name ? "" : "Last name is required.",
      email: emailRegex.test(formData.email) ? "" : "Invalid email address.",
      password:
        formData.password.length >= 6
          ? ""
          : "Password must be at least 6 characters.",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
   console.log("Hello worlld")
    
    if (!validateInputs()) return;

    // Mock API call
    fetch("/sign-up-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
       
        if (data.success) {
          onRegister(); // Call parent callback
          handleClose();
        } else {
            // check for server error fidback in case a bad request is made
            let last_name_error = "" 
            let first_name_error = "" 
            let email_error = "" 
            let password_error = "" 
            if (data.Errors !== undefined) {
             if (data.Errors.email != undefined) {
                email_error = data.Errors.email[0]
             }
             if (data.Errors.first_name != undefined) {
                first_name_error = data.Errors.first_name[0]
             }
             if (data.Errors.last_name != undefined) {
                last_name_error = data.Errors.last_name[0]
             }
             if (data.Errors.password != undefined) {
                password_error = data.Errors.password[0]
             }
             setErrors((prev) => ({
                ...prev,
                ...{
                    first_name: first_name_error,
                    last_name: last_name_error,
                    email: email_error,
                    password: password_error
                },
              }));
            }
        }
      })
      .catch((err) => {
        console.error("Error during registration:", err);
      });
      
  };

  // Close dialog
  const handleClose = () => {
    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      password: ""
    });
    setErrors({
      first_name: "",
      last_name: "",
      email: "",
      password: ""
    });
    onClose(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          borderRadius: "10px",
          padding: 4,
          maxWidth: 400,
          width: "100%",
        },
        component: "form",
        onSubmit: handleSubmit,
      }}
    >
      {/* Header */}
      <Box textAlign="center" mb={3}>
        <Typography variant="h5" fontWeight="bold" color="#37474f">
          Create an Account
        </Typography>
        <Typography variant="body2" color="#37474f">
          Join us by filling out the information below.
        </Typography>
      </Box>

      {/* Form */}
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          fullWidth
          label="First Name"
          variant="outlined"
          value={formData.first_name}
          onChange={(e) => handleChange("first_name", e.target.value)}
          error={!!errors.first_name}
          helperText={errors.first_name}
      
        />
        <TextField
          fullWidth
          label="Last Name"
          variant="outlined"
          value={formData.last_name}
          onChange={(e) => handleChange("last_name", e.target.value)}
          error={!!errors.last_name}
          helperText={errors.last_name}
         
        />
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
   
        />
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          type="password"
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
       
        />
     

        {/* Actions */}
        <Box display="flex" justifyContent="space-between" mt={3}>
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{
              borderRadius: 2,
              textTransform: "none",
              color: "#37474f",
              borderColor: "#37474f",
              "&:hover": { borderColor: "#263238", backgroundColor: "#f5f5f5" },
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              borderRadius: 2,
              textTransform: "none",
              backgroundColor: "#37474f",
              "&:hover": { backgroundColor: "#263238" },
            }}
          >
            Register
          </Button>
        </Box>

        {/* Have an account? Login */}
        <Box textAlign="center" mt={2}>
          <Typography variant="body2" color="#666">
            Have an account?{" "}
            <Typography
              component="span"
              variant="body2"
              color="primary"
              sx={{
                cursor: "pointer",
                fontWeight: "bold",
                textDecoration: "underline",
              }}
              onClick={() => onLogin(true)}
            >
              Login
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Dialog>
  );
};
