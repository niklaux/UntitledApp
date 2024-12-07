import React, { useState } from "react";
import CommonButton from "./CommonButton";
import { createUser } from "../helpers/UserApis";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the API to create a user
      const { name, email, password } = formData;
      await createUser(name, email, password);
      setSuccessMessage("Account created successfully!");
      setError("");

      // Reset the form data
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (err) {
      setError(err.message);
      setSuccessMessage("");
    }
  };

  return (
    <div>
      <h1 className="fw-semibold">Sign Up</h1>
      <p className="text-muted">Start your 30-day free trial.</p>

      {/* Success Message */}
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name*
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter your name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email*
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password*
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Create a password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <small className="form-text text-muted">
            Must be at least 8 characters
          </small>
        </div>

        <CommonButton
          label="Create Account"
          className="w-100"
          style={{ backgroundColor: "#7F56D9" }}
          type="submit"
        />
      </form>
    </div>
  );
}

export default SignUp;
