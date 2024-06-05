import { useState, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode'; // Import korrigiert
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [redirectPath, setRedirectPath] = useState(null);
  const navigate = useNavigate();

  const handleCallbackResponse = useCallback((response) => {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwtDecode(response.credential);
    console.log(userObject);
    setUser(userObject);
    localStorage.setItem('token', JSON.stringify(userObject));
    console.log("Direkt nach speichern:", localStorage.getItem('token'));
    fetchUserData(userObject.email);
  }, []);

  const fetchUserData = async (email) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/user/getUserByEmail', { email: email });
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

  return {
    user,
    loading,
    redirectPath,
    handleCallbackResponse,
  };
};
