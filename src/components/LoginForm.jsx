import React, { useState } from "react";

function LoginForm({ onLoginSuccess, onSwitchToSignup }) {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
    setMessage("");
  };

  const handleLogin = () => {
    const validationErrors = {};
    if (!values.email.trim()) validationErrors.email = "email is required";
    if (!values.password.trim()) validationErrors.password = "Password is required";

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.email === values.email && u.password === values.password);

    if (user) {
      setMessage("login sucessfull");
      setValues({ email: "", password: "" });
      setErrors({});
      onLoginSuccess?.(user.email);
    } else {
      setMessage("invalid email or password");
      setErrors({});
    }
  };

  return (
    <div className="login-form">
      <h2>login</h2>

      <div className="form-group">
        <label htmlFor="email">email</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="enter Email"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <small className="error-message">{errors.email}</small>}
      </div>

      <div className="form-group">
        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="enter Password"
          value={values.password}
          onChange={handleChange}
        />
        {errors.password && <small className="error-message">{errors.password}</small>}
      </div>

      <button type="button" onClick={handleLogin}>login</button>

      {message && <p className={message.startsWith ? "sucess-message" : "eror-message"}>{message}</p>}

      <p className="switch-link">
        not have an account? <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToSignup(); }}>go to sign up</a>
      </p>
    </div>
  );
}

export default LoginForm;
