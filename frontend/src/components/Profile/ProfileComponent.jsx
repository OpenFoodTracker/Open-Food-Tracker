import React from 'react';
import { Button, Container, Typography, Avatar, Box, CircularProgress, Grid, Paper, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';

//Jetzt versuche ich es

const ProfileComponent = ({ userData, token }) => {
  const navigate = useNavigate();

  if (!userData || !token) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  console.log("Profile Picture URL: ", token.picture);  // Debugging output

  const handleEditClick = () => {
    navigate('/edit-profile');  //go to editing page 
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');  //remove user data from local Storage and go to login page
    navigate('/');
  };

  const handleSettingsClick = () => {
    navigate('/settings'); 
  };

  return (
      <Container className="profileContainer">
        <div className="settingsButtonContainer">
          <div className="trying">
          <IconButton className="settingsButton" onClick={handleSettingsClick}>
            <SettingsIcon />
          </IconButton>
          </div>
          
        </div>
        
        <Box display="flex" alignItems="center" flexDirection="column" mt={5}>
          <Box className="profileHeader" sx={{ width: '100%', textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
              Hallo, {userData.email.substring(0, userData.email.indexOf('@'))}
            </Typography>
          </Box>
          
          {token.picture && (
            <Avatar
              alt="Profile"
              src={token.picture}
              sx={{ width: 120, height: 120, mt: 2, mb: 4 }}
              onError={(e) => e.target.style.display = 'none'}  // Hide Avatar if image fails to load
            />
          )}




            <Box className="profileDataContainer" elevation={3} sx={{ p: 3, width: '100%', maxWidth: 600 }}>
            
              <Grid container spacing={2}>
                <Grid className="profileGridItem" item xs={6}>
                  <Typography className="profileForm" variant="body1">Email:</Typography>
                </Grid>
                <Grid className="profileGridItem" item xs={6}>
                  <Typography className="profileData" variant="body1">{userData.email}</Typography>
                </Grid>
                <Grid className="profileGridItem"item xs={6}>
                  <Typography className="profileForm"variant="body1">Geschlecht:</Typography>
                </Grid>
                <Grid className="profileGridItem" item xs={6}>
                  <Typography className="profileData" variant="body1">{userData.gender}</Typography>
                </Grid>
                <Grid className="profileGridItem" item xs={6}>
                  <Typography className="profileForm" variant="body1">Größe:</Typography>
                </Grid>
                <Grid className="profileGridItem" item xs={6}>
                  <Typography className="profileData" variant="body1">{userData.height} cm</Typography>
                </Grid>
                <Grid className="profileGridItem" item xs={6}>
                  <Typography className="profileForm" variant="body1">Gewicht:</Typography>
                </Grid>
                <Grid className="profileGridItem" item xs={6}>
                  <Typography className="profileData" variant="body1">{userData.weight} kg</Typography>
                </Grid>
                <Grid className="profileGridItem" item xs={6}>
                  <Typography className="profileForm" variant="body1">Zielgewicht:</Typography>
                </Grid>
                <Grid className="profileGridItem" item xs={6}>
                  <Typography className="profileData" variant="body1">{userData.goal} kg</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className="profileForm" variant="body1">Geburtstag:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className="profileData" variant="body1">
                    {new Date(userData.birthday).toLocaleDateString()}
                  </Typography>
                </Grid>
                {/*
                <Grid item xs={6}>
              
                  <Typography variant="body1"><strong>Dark Mode:</strong></Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">{userData.darkMode ? 'Aktiviert' : 'Deaktiviert'}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1"><strong>Benachrichtigungen:</strong></Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">{userData.notifications ? 'Aktiviert' : 'Deaktiviert'}</Typography>
                </Grid> */}
              </Grid>
              <Box className="editButton" display="flex" justifyContent="center" mt={4}>
                <Button variant="contained" className="editButton" color="primary" onClick={handleEditClick}>
                  Profil bearbeiten
                </Button>
              </Box>
            </Box>
            <Box className="logOutButton" display="flex" justifyContent="center" mt={4}>
              <Button variant="outlined" className="logOutButton" color="error" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
        </Box>          
      </Container>

  );
};

export default ProfileComponent;
