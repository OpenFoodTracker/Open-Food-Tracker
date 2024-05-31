import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const Login = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [redirectPath, setRedirectPath] = useState(null);

  const handleCallbackResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
    const userObject = jwtDecode(response.credential);
    console.log(userObject);
    setUser(userObject);
    localStorage.setItem('token', JSON.stringify(userObject));
    console.log("Direkt nach speichern:", localStorage.getItem('token'));
    fetchUserData(userObject.email);
  };

  const fetchUserData = async (email) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/user/getUserByEmail', { email });
      const userData = response.data;
      console.log("User data received:", userData);

      localStorage.setItem('userData', JSON.stringify(userData));
      console.log("Direkt nach speichern:", localStorage.getItem('userData'));

      // Ensure data is saved before redirecting
      setTimeout(() => {
        setRedirectPath('/home');
      }, 100); // Short delay to ensure data is saved
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("User-Data not found, redirecting to journey");
        setRedirectPath('/journey');
      } else {
        console.error("Error fetching user data", error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Clear localStorage once on component mount
    localStorage.clear();
    console.log("localStorage zu Beginn: ", localStorage);
    /* global google */
    google.accounts.id.initialize({
      client_id: "560988237934-8vl914madk3tpf281m0fklrrc6nof6fu.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    );

    google.accounts.id.prompt();
  }, []);

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
};

export default Login;
