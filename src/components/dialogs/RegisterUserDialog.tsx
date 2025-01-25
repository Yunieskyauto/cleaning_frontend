import React, { useState, useEffect } from "react";
import { Box, Button, Dialog, TextField, Typography } from "@mui/material";

export const RegisterUserDialog = ({ open, onClose, onRegister, onLogin }) => {

  const [openRegisterDialog, setOprnRegisterDialog] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    additionalField: "",
  });

  // Error state
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    additionalField: "",
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
      firstName: formData.firstName ? "" : "First name is required.",
      lastName: formData.lastName ? "" : "Last name is required.",
      email: emailRegex.test(formData.email) ? "" : "Invalid email address.",
      password:
        formData.password.length >= 6
          ? ""
          : "Password must be at least 6 characters.",
      additionalField: formData.additionalField
        ? ""
        : "This field is required.",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateInputs()) return;

    // Mock API call
    fetch("/register", {
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
          setErrors((prev) => ({
            ...prev,
            ...data.errors,
          }));
        }
      })
      .catch((err) => {
        console.error("Error during registration:", err);
      });
  };

  // Close dialog
  const handleClose = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      additionalField: "",
    });
    setErrors({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      additionalField: "",
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
          value={formData.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
          error={!!errors.firstName}
          helperText={errors.firstName}
          required
        />
        <TextField
          fullWidth
          label="Last Name"
          variant="outlined"
          value={formData.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
          error={!!errors.lastName}
          helperText={errors.lastName}
          required
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
          required
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
          required
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
