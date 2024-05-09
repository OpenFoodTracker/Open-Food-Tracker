import { React, useEffect, useState } from "react";
import "bulma/css/bulma.css";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  if (loggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <form className="box">
      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input
            className="input"
            type="email"
            placeholder="e.g. alex@example.com"
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input className="input" type="password" placeholder="********" />
        </div>
      </div>

      <button
        className="button is-primary"
        onClick={() => {
          setLoggedIn(true);
        }}
      >
        Sign in
      </button>
    </form>
  );
};

export default Login;
