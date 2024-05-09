import { React, useEffect } from "react";
import "bulma/css/bulma.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const Navigate = useNavigate();
  const goToLogInPage = () => navigate("/LogIn");
  //  const hideLogin = () => {
  //    //redirecten auf homepage oder login feld verstecken/removen
  //  };
  useEffect(() => {
    const goToHomePage = () => Navigate("/");
  });
  function CheckSignIn() {
    goToHomePage();
    //const email = document.getElementsByName("input email");
    //const password = document.getElementsByName("input password");
    //console.log(email);
    //console.log(password);
    //if(email == email_datenbank && passwort == passwort_datenbank){
    //    giveLogInToken/SesionCookie();
    //    hideLogin();
    //}
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

      <button className="button is-primary" onClick={CheckSignIn()}>
        Sign in
      </button>
    </form>
  );
};

export default Login;
