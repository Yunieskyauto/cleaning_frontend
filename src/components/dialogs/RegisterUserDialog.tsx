import React, { useState } from "react";
import { Box, Button, Dialog, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const RegisterUserDialog = ({ open, onClose, onRegisterMessage, onLogin}) => {
  const navigate = useNavigate();

  // Default states
  const defaultFormState = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  };

  const defaultErrorState = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  };

  // Form state
  const [formData, setFormData] = useState(defaultFormState);

  // Error state
  const [errors, setErrors] = useState(defaultErrorState);

  // Handle input changes
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" })); // Clear error for the field
  };

  // Validate inputs
  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors = {
      first_name: formData.first_name ? "" : "First name is required.",
      last_name: formData.last_name ? "" : "Last name is required.",
      email: emailRegex.test(formData.email) ? "" : "Invalid email address.",
      password: formData.password.length >= 6
        ? ""
        : "Password must be at least 6 characters.",
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  // Reset form and error states
  const resetStates = () => {
    setFormData(defaultFormState);
    setErrors(defaultErrorState);
  };

  // Handle server error feedback
  const handleServerErrors = (serverErrors) => {
    if (serverErrors) {
      const updatedErrors = Object.keys(serverErrors).reduce((acc, field) => {
        acc[field] = serverErrors[field]?.[0] || ""; // Extract first error message
        return acc;
      }, {});

      setErrors((prev) => ({ ...prev, ...updatedErrors }));
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateInputs()) return;

    try {
      const response = await fetch("/sign-up-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        resetStates();
        onClose();
        navigate(`/?userId=${data.id}`);
        onRegisterMessage({"type": "success", "message": "Your account has been successfully registered. Please check your email inbox and click the validation link to activate your account"})
      } else {
        const data = await response.json();
        if (response.status === 409) {
          onRegisterMessage({"type": "error", "message": "The email address is already in use. Please try a different one."})
          handleChange("email", "");
          setFormData((prev) => ({ ...prev, password: "" }));
        } else {
          handleServerErrors(data.errors || {});
        }
      }
    } catch (error) {
     // onError("An error occurred during registration. Please try again later.");
      console.error("Error during registration:", error);
    }
  };

  // Close dialog and reset states
  const handleClose = () => {
    resetStates();
    onClose(false);
  };

  // Reusable button styles
  const buttonStyles = {
    borderRadius: 2,
    textTransform: "none",
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
          aria-label="First Name"
        />
        <TextField
          fullWidth
          label="Last Name"
          variant="outlined"
          value={formData.last_name}
          onChange={(e) => handleChange("last_name", e.target.value)}
          error={!!errors.last_name}
          helperText={errors.last_name}
          aria-label="Last Name"
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
          aria-label="Email Address"
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
          aria-label="Password"
        />

        {/* Actions */}
        <Box display="flex" justifyContent="space-between" mt={3}>
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{
              ...buttonStyles,
              color: "#37474f",
              borderColor: "#37474f",
              "&:hover": { borderColor: "#263238", backgroundColor: "#f5f5f5" },
            }}
            aria-label="Cancel"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              ...buttonStyles,
              backgroundColor: "#37474f",
              "&:hover": { backgroundColor: "#263238" },
            }}
            aria-label="Register"
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
              aria-label="Login"
            >
              Login
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Dialog>
  );
};
