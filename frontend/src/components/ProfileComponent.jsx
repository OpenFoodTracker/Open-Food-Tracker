import React from 'react';
import { Card, CardContent, Typography, Avatar, List, ListItem, ListItemText } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

const ProfilComponent = () => {
  const profileData = {
    username: "sophie12m@web.de",
    age: 17,
    gender: "weiblich",
    birthday: "2.6.2007",
    height: "1,62m",
    weight: "53kg"
  };

  return (
    <Card sx={{ minWidth: 275, maxWidth: 300, margin: 'auto', mt: 4, textAlign: 'center' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          HALLO SOPHIE
          <SettingsIcon sx={{ float: 'right' }} />
        </Typography>
        <Avatar sx={{ bgcolor: 'grey.300', width: 100, height: 100, margin: 'auto', mt: 2, mb: 2 }} />
        <List>
          <ListItem>
            <ListItemText primary="Nutzername" secondary={profileData.username} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Alter" secondary={profileData.age} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Geschlecht" secondary={profileData.gender} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Geburtstag" secondary={profileData.birthday} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Größe" secondary={profileData.height} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Gewicht" secondary={profileData.weight} />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default ProfilComponent;
