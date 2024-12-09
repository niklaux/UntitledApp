import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { getUsers } from "../helpers/UserApis";
import CommonButton from "./CommonButton";

const CustomerModal = ({ open, handleClose, handleSave, initialData }) => {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      website: "",
      about: "",
      country: "",
      users: [], // Array of selected user IDs
      licensesUsed: 0,
    }
  );
  const [userList, setUserList] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    if (open) {
      getUsers()
        .then((data) => {
          setUserList(data);
          setLoadingUsers(false);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
          setLoadingUsers(false);
        });
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUserChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const updatedUsers = checked
        ? [...prevData.users, value]  // Add user to array if checked
        : prevData.users.filter((userId) => userId !== value);  // Remove user if unchecked
      return { ...prevData, users: updatedUsers };
    });
  };

  const onSave = () => {
    handleSave(formData);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      PaperProps={{ className: "rounded-3" }}
      fullWidth
    >
      <DialogTitle>
        {initialData ? "Edit Customer" : "Add Customer"}
      </DialogTitle>
      <DialogContent>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Company Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="website" className="form-label">
            Website
          </label>
          <input
            type="text"
            className="form-control"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="about" className="form-label">
            About
          </label>
          <textarea
            className="form-control"
            id="about"
            name="about"
            value={formData.about}
            onChange={handleChange}
            rows="3"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="country" className="form-label">
            Country
          </label>
          <input
            type="text"
            className="form-control"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="licensesUsed" className="form-label">
            Number of Licenses Used
          </label>
          <input
            type="number"
            className="form-control"
            id="licensesUsed"
            name="licensesUsed"
            value={formData.licensesUsed}
            onChange={handleChange}
          />
        </div>

        {/* Users Checkboxes */}
        <div className="mb-3">
          <label className="form-label">Users</label>
          <div>
            {!loadingUsers ? (
              userList.map((user) => (
                <FormControlLabel
                  key={user.id}
                  control={
                    <Checkbox
                      value={user.id}
                      checked={formData.users.includes(user.id)}  // Check if user is selected
                      onChange={handleUserChange}  // Handle change on checkbox
                    />
                  }
                  label={user.name}
                />
              ))
            ) : (
              <div>Loading Users...</div>
            )}
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <CommonButton
          label="Cancel"
          onClick={handleClose}
          className="btn-secondary"
          backgroundColor="white"
          textColor="inherit"
        />
        <CommonButton
          label="Save"
          onClick={onSave}
          className="btn-primary"
        />
      </DialogActions>
    </Dialog>
  );
};

export default CustomerModal;
