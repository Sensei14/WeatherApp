import React, { useState } from "react";
import "./Auth.css";

const Auth = props => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = event => {
    if (event.target.name === "login") setLogin(event.target.value);
    if (event.target.name === "password") setPassword(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    props.login(login, password);
  };

  return (
    <div className="auth">
      <p>Please SIGN IN to use our WEATHER APP </p>
      <form onSubmit={handleSubmit}>
        <div className="form-group ">
          <label htmlFor="loginInput">Login</label>
          <input
            type="text"
            value={login}
            onChange={handleChange}
            name="login"
            id="loginInput"
            className="form-control"
          />
        </div>
        <div className="form-group ">
          <label htmlFor="passwordInput"> Password</label>
          <input
            type="password"
            value={password}
            onChange={handleChange}
            name="password"
            id="passwordInput"
            className="form-control"
          />
        </div>
        {props.error && <p className="error">{props.error}</p>}
        <button className="btn btn-primary btn-block" type="submit">
          Zaloguj
        </button>
      </form>
    </div>
  );
};

export default Auth;
