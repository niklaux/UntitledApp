import React, { useState } from "react";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    // Reset the form data after submit
    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <h4 className="fw-bolder">Sign Up</h4>
      <p className="text-muted">Start your 30-day free trial.</p>

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

        <button
          type="submit"
          className="btn text-white mt-3"
          style={{ backgroundColor: "#7F56D9" }}
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

export default SignUp;
