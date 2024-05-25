import React from 'react';
import { Button, Container, Typography, Avatar, Box, CircularProgress, Grid, Paper, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import '../pages/Profile.css';

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
    <div className="settingsContainer">
      <Box display="flex" alignItems="center" flexDirection="column" mt={5}>
        <Typography variant="h4" gutterBottom className="profileTitle">
          Hallo, {token.given_name} {token.family_name} 
          {/* Hallo, {userData.name} */}
        </Typography>
        
        <IconButton className="settingsButton" onClick={handleSettingsClick}>
          <SettingsIcon />
        </IconButton>
       
        {token.picture && (
          <Avatar
            alt="Profile"
            src={token.picture}
            sx={{ width: 120, height: 120, mt: 2, mb: 4 }}
            onError={(e) => e.target.style.display = 'none'}  // Hide Avatar if image fails to load
          />
        )}
        <Paper className="profilePaper" elevation={3} sx={{ p: 3, width: '100%', maxWidth: 600 }}>
        
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Email:</strong></Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{userData.email}</Typography>
            </Grid>
            
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Geschlecht:</strong></Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{userData.gender}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Größe:</strong></Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{userData.height} cm</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Gewicht:</strong></Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{userData.weight} kg</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Zielgewicht:</strong></Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{userData.goal} kg</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Geburtstag:</strong></Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
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
          <Box display="flex" justifyContent="center" mt={4}>
            <Button variant="contained" color="primary" onClick={handleEditClick}>
              Profil bearbeiten
            </Button>
          </Box>
          
        </Paper>
      </Box>

      <Box display="flex" justifyContent="center" mt={4}>
        <Button variant="outlined" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
      <Box display="flex" justifyContent="center" mt={4}>
        <p>{"\n\n"}</p>
      </Box>
      </div>
    </Container>
  );
};

export default ProfileComponent;
