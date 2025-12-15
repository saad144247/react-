import React, { useState } from "react";

function validateForm(values) {
  const errors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "full name is reqquired";
  }

  if (!values.email.trim()) {
    errors.email = "email is required.";
  }

  if (values.password.length < 8) {
    errors.password = "password length 8 characters";
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "passwords is not matched";
  }

  return errors;
}

function SignupForm({ onSwitchToLogin }) {
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setMessage("");
  }


  function handleSignup() {
    const validationErrors = validateForm(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
     
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.some((u) => u.email === values.email)) {
      setErrors({ email: "this email is already have an registerd" });
      return;
    }

    const newUser = {
      fullName: values.fullName,
      email: values.email,
      password: values.password,
    };

    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    setMessage("signup sucessfull go to login");

    setValues({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    setTimeout(() => {
      setMessage("");
      onSwitchToLogin?.();
    }, 2500);
  }

  return (
    <div className="form-card">
      <h2>Signup</h2>

      <div>
        <div className="form-group">
          <label htmlFor="fullName">full Name</label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            value={values.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <p className="error-message">{errors.fullName}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">confirm password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
        </div>

        <button type="button" onClick={handleSignup}>signup</button>

        {message && (
          <p className={message.includes("successful") ? "success-message" : "error-message"}>
            {message}
          </p>
        )}
      </div>

      <p>
        do you have and already account?{" "}
        <a href="#" onClick={onSwitchToLogin}>
          Please log in
        </a>
      </p>
    </div>
  );
}

export default SignupForm;
