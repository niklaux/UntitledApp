import React, { useState } from "react";
import CommonButton from "./CommonButton";
import { loginUser, createUser } from "../helpers/UserApis";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
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
      if (isLogin) {
        // Log in the user
        const { email, password } = formData;
        const user = await loginUser(email, password);
        setSuccessMessage(`Welcome back, ${user.name}!`);
      } else {
        // Sign up the user
        const { name, email, password } = formData;
        await createUser(name, email, password);
        setSuccessMessage("Account created successfully!");
      }
      setError("");
      setFormData({ name: "", email: "", password: "" });
    } catch (err) {
      setError(err.message);
      setSuccessMessage("");
    }
  };

  return (
    <div>
      <h1 className="fw-semibold">{isLogin ? "Log In" : "Sign Up"}</h1>
      <p className="text-muted">
        {isLogin
          ? "Welcome back! Please log in to continue."
          : "Start your 30-day free trial."}
      </p>

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
        {!isLogin && (
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
              required={!isLogin}
            />
          </div>
        )}

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
            placeholder={
              isLogin ? "Enter your password" : "Create a password"
            }
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {!isLogin && (
            <small className="form-text text-muted">
              Must be at least 8 characters
            </small>
          )}
        </div>

        <CommonButton
          label={isLogin ? "Log In" : "Create Account"}
          className="w-100"
          style={{ backgroundColor: "#7F56D9" }}
          type="submit"
        />
      </form>

      <p className="mt-3">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          type="button"
          className="btn btn-link p-0"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Sign Up" : "Log In"}
        </button>
      </p>
    </div>
  );
}

export default AuthForm;
