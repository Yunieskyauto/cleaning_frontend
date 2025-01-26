import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { Box, TextField, Typography } from "@mui/material";
import "./../../styles/variables.scss";

export const LoginDialog = ({ open, onClose, onOpenRegister, onUser }) => {
  const navigate = useNavigate();

  // State for form inputs and errors
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // Dialog open/close state
  const [openDialog, setOpenDialog] = useState(false);

  // Handle input changes
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" })); // Clear errors on change
  };

  // Validate inputs
  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors = {
      email: emailRegex.test(formData.email) ? "" : "Invalid email address.",
      password: formData.password.length >= 6 ? "" : "Password must be at least 6 characters.",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateInputs()) return;

    fetch(`/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      
      .then((data) => {
        console.log(data)
        
        if (data.Errors) {
          setErrors({
            email: data.Errors.email?.[0] || "",
            password: data.Errors.password?.[0] || "",
          });
        } else if (data.access_token) {
          onUser({
            firstName: data.first_name,
            lastName: data.last_name,
            accessToken: data.token.access_token,
            accessLevel: data.access_level,
            id: data.id
          });
          navigate("/dashboard");
        } else {
          onUser(undefined);
        }
      } )
      .catch((err) => {
        console.error(err);
      });
  };

  // Handle dialog open/close
  useEffect(() => {
    setOpenDialog(open);
  }, [open]);

  const handleCloseDialog = (isOpen) => {
   //setOpenDialog(isOpen);
    onClose(isOpen);
  };

  return (
    <Dialog
      open={openDialog}
      onClose={() => handleCloseDialog(false)}
      PaperProps={{
        sx: {
          borderRadius: "10px",
          bgcolor: "#f5f5f5",
          padding: 4,
        },
        component: "form",
        onSubmit: handleSubmit,
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          textAlign: "center",
          marginBottom: 4,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#37474f" }}>
          Welcome back
        </Typography>
        <Typography variant="body2" sx={{ color: "#37474f" }}>
          Glad to see you again. Login to your account below.
        </Typography>
      </Box>

      {/* Form Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField
          required
          label="Email"
          type="email"
          variant="outlined"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          required
          label="Password"
          type="password"
          variant="outlined"
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <label>
              <input type="checkbox" /> Remember me
            </label>
          </Box>
          <Typography
            variant="body2"
            sx={{
              color: "#01579b",
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={() => navigate("/forgot-password")}
          >
            Forgot password?
          </Typography>
        </Box>
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#37474f",
            color: "#e0e0e0",
            borderRadius: 2,
            padding: 1.5,
            "&:hover": {
              backgroundColor: "#263238",
            },
          }}
        >
          Login
        </Button>
      </Box>

      {/* Footer Section */}
      <Box
        sx={{
          textAlign: "center",
          marginTop: 3,
        }}
      >
        <Typography variant="body2" sx={{ color: "#37474f" }}>
          Don’t have an account?{" "}
          <Typography
            component="span"
            sx={{
              color: "#01579b",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={() => onOpenRegister(true)}
          >
            Sign up for free
          </Typography>
        </Typography>
      </Box>
    </Dialog>
  );
};
