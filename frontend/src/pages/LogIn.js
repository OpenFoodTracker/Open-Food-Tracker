import './Login.css';
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const Login = () => {
  const [user, setUser] = useState({});
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [redirectPath, setRedirectPath] = useState(null);
  const [token, setToken] = useState(null);
  const [mealsData, setMealsData] = useState(null);
  const [recipeData, setRecipeData] = useState(null);

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwtDecode(response.credential);
    console.log(userObject);
    setUser(userObject);
    setToken(response.credential); // Roher JWT-Token speichern

    // Fetch user data from the backend
    fetchUserData(userObject.email);
  }

  const fetchUserData = async (email) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/user/getUserByEmail', { email: email });
      setUserData(response.data);
      console.log(response.data);

      console.log(response.data.mealsFileId);
      console.log(response.data.recipeFileId);

      // Set mealsFileId and recipeFileId from the response
      const responseMeals = await axios.post('/api/meals/getMealById', { mealsFileId: response.data.mealsFileId });
      setMealsData(responseMeals.data);
      console.log(responseMeals.data);
      
      const responseRecipe = await axios.post('/api/recipes/getRecipeById', { recipeFileId: response.data.recipeFileId });
      setRecipeData(responseRecipe.data);
      console.log(responseRecipe.data);

      setRedirectPath('/home');
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
    return (
      <Navigate 
        to={redirectPath} 
        state={{ 
          userData: userData, 
          token: jwtDecode(token), 
          mealsData: mealsData, // Stellen Sie sicher, dass die Daten korrekt weitergegeben werden
          recipeData: recipeData  // Stellen Sie sicher, dass die Daten korrekt weitergegeben werden
        }} 
      />
    );
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

export default Login;
