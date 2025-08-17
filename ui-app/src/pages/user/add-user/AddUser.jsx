import {
  TextField,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Snackbar,
  Alert
} from "@mui/material";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import "./AddUser.css";
import {API_BASE_URL} from "../../../config/api.config";

function AddUser({ isDialogOpen, handleDiaglogClosed }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "user",
  });
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const validate = () => {
    let newErrors = {};
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add user");
      }

      await response.json();
      setSnackbar({
        open: true,
        message: "User added successfully!",
        severity: "success",
      });
      handleDiaglogClosed(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "user",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || "Error adding user",
        severity: "error",
      });
    }
  };

  return (
    <>
      <Dialog
        maxWidth="sm"
        fullWidth={true}
        open={isDialogOpen}
      >
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <TextField
                label="First Name"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                error={!!errors.firstName}
                helperText={errors.firstName}
                fullWidth
              />
            </div>
            <div className="row">
              <TextField
                label="Last Name"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                error={!!errors.lastName}
                helperText={errors.lastName}
                fullWidth
              />
            </div>
            <div className="row">
              <TextField
                label="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                error={!!errors.email}
                helperText={errors.email}
                fullWidth
              />
            </div>
            <div className="row">
              <TextField
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                error={!!errors.password}
                helperText={errors.password}
                fullWidth
              />
            </div>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                value={formData.role}
                label="Role"
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
            <DialogActions>
              <Button onClick={() => handleDiaglogClosed(false)}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default AddUser;