import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Box, FormControlLabel, Switch, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const EditProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    _id: '',
    email: '',
    gender: '',
    height: '',
    weight: '',
    goal: '',
    birthday: '',
    darkMode: false,
    notifications: false,
  });

  useEffect(() => {
    const savedUserData = JSON.parse(localStorage.getItem('userData'));
    if (savedUserData) {
      console.log("useEffect userData: " + savedUserData);
      console.log("useEffect userData.id: " + savedUserData._id);
      console.log("useEffect userData.email: " + savedUserData.email);
      setUserData(savedUserData);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData({ //called with savedUserDate from useEffect
      ...userData,
      [name]: type === 'checkbox' ? checked : value,
    });
    console.log("handleChange userData: " + userData);
 
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userData);

    const currentDate = new Date();   //birthday should be valid date
        const enteredDate = new Date(userData.birthday);
        
        if (enteredDate > currentDate) {
            alert("Geburtstag kann nicht in der Zukunft liegen.");
            return;
        }


    try {
      const userId = userData._id;
      await axios.patch(`/api/user/${userId}`, userData);  //!!!! patch instead of post?
      //await axios.post('/api/user/getUserByEmail', { email: email });
      localStorage.setItem('userData', JSON.stringify(userData));

      


      navigate('/profile'); //go back to profile after new data is saved
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  return (
    <div>
      <Navbar />
      <Container className="container" sx={{ pb: 10 }}>
        <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
          <Typography variant="h4" gutterBottom>
            Profil bearbeiten
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 600 }}>
          
            <TextField  //Email
              fullWidth
              label="Name"
              name="name"
              value={userData.name}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
            />
            <TextField    //Geschlecht
              fullWidth
              label="Geschlecht"
              name="gender"
              value={userData.gender}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
            />
            <TextField    //Größe
              fullWidth
              label="Größe (cm)"
              name="height"
              value={userData.height}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              type="number"
            />
            <TextField    //Gewicht
              fullWidth
              label="Gewicht (kg)"
              name="weight"
              value={userData.weight}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              type="number"
            />
            <TextField    //Zielgewicht
              fullWidth
              label="Zielgewicht (kg)"
              name="goal"
              value={userData.goal}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              type="number"
            />
            <TextField    //Geburtstag
              label="Geburtstag"
              name="birthday"
              value={userData.birthday}
              onChange={handleChange}
              fullWidth
              margin="normal"
              type="date"
              InputLabelProps={{
               shrink: true,
             }}
            />
            <FormControlLabel   //Dark Mode
              control={
                <Switch
                  checked={userData.darkMode}
                  onChange={(e) => setUserData({ ...userData, darkMode: e.target.checked })}
                  color="primary"
                />
              }
              label="Dark Mode"
            />
            <FormControlLabel   //Benachrichtigungen
              control={
                <Switch
                  checked={userData.notifications}
                    onChange={(e) => setUserData({ ...userData, notifications: e.target.checked })}
                    color="primary"
                />
              }
              label="Benachrichtigungen"
            />
            <Button   
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Speichern
            </Button>
          </form>
        </Box>
        
      </Container>
    </div>
  );
};

export default EditProfile;
