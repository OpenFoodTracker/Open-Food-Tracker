import React from 'react';
import { Container, Typography, Avatar, Box, CircularProgress, Grid, Paper } from '@mui/material';

const ProfileComponent = ({ userData, token }) => {
  if (!userData || !token) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  console.log("Profile Picture URL: ", token.picture);  // Debugging output

  return (
    <Container>
      <Box display="flex" alignItems="center" flexDirection="column" mt={5}>
        <Typography variant="h4" gutterBottom>
          Hallo, {token.given_name} {token.family_name}
        </Typography>
        {token.picture && (
          <Avatar
            alt="Profile"
            src={token.picture}
            sx={{ width: 120, height: 120, mt: 2, mb: 4 }}
            onError={(e) => e.target.style.display = 'none'}  // Hide Avatar if image fails to load
          />
        )}
        <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: 600 }}>
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
              <Typography variant="body1">{userData.goal} kg}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1"><strong>Geburtstag:</strong></Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                {new Date(userData.birthday).toLocaleDateString()}
              </Typography>
            </Grid>
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
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default ProfileComponent;
