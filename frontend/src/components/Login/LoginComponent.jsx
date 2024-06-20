import React, { useEffect } from 'react';
import { Navigate } from "react-router-dom";
import { useLogin } from './LoginService';

const LoginComponent = () => {
  const {
    user,
    loading,
    redirectPath,
    handleCallbackResponse,
  } = useLogin();

  useEffect(() => {
    const initializeGoogleSignIn = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          callback: handleCallbackResponse
        });

        // Render the button
        window.google.accounts.id.renderButton(
          document.getElementById("signInDiv"),
          { theme: "outline", size: "large" }
        );

        // Remove or comment out this line to disable the pop-up
        // window.google.accounts.id.prompt();
      }
    };

    // Load the Google Sign-In script
    const script = document.createElement('script');
    script.src = "https://accounts.google.com/gsi/client";
    script.onload = initializeGoogleSignIn;
    script.onerror = () => console.error("Google Sign-In script could not be loaded.");
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [handleCallbackResponse]);

  if (redirectPath) {
    return <Navigate to={redirectPath} />;
  }

  return (
    <div className="App">
      {Object.keys(user).length === 0 &&
        <div className="signInContainer">
          <div className="textContainer">
            <div id="signInLabel">Willkommen zu OFT</div>
            <div id="signInLabelSub">Open-Food-Tracker</div>
          </div>
          <div id="logo"></div>
          <div id="signInDiv"></div>
        </div>
      }
      {Object.keys(user).length !== 0 && loading &&
        <div>Loading...</div>
      }
    </div>
  );
}

export default LoginComponent;
