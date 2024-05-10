import './Login.css';


// pages & components
import { Navigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';

import ProfilComponent from "../components/ProfileComponent";


const Login = () => {
  const [ user, setUser ] = useState({});

  function handleCallbackResponse(response){
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwtDecode(response.credential);
    console.log(userObject);
    setUser(userObject);
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "560988237934-8vl914madk3tpf281m0fklrrc6nof6fu.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {
        theme: "outline", size: "large"
      }
    )

    google.accounts.id.prompt();
  }, []);

  // Wenn kein User: sign in Page (Logo, Name, button)
  // Wenn ein User: zu Main Page
  return (
    <div className="App">
      {
        Object.keys(user).length === 0 &&
        <div className="signInContainer">
        <div className="textContainer">
          <div id="signInLabel">Willkommen zu OFT</div>
          <div id="signInLabelSub">Open-Food-Tracker</div>
        </div>
        <div id="logo"></div>
        <div id="signInDiv"></div>
      </div>
      }
      {
        Object.keys(user).length !== 0 &&
          <Navigate to="/home" />
      }  

        
          
        

    </div>
  );
}

export default Login;
