import React from 'react';
import { Container, Typography, Box, Link, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Navbar from "../Navbar/Navbar"
import Head from "../Head/Head"
import { useNavigate } from 'react-router-dom';

const CreditsComponent = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/settings');
      };

  return (
    <div>
    <Head />
    <Container>
        
        <Box mt={5}>

            <IconButton onClick={handleBackClick} color="primary">
                <ArrowBackIcon />
            </IconButton>

            <Typography variant="h4" gutterBottom>
                Bildnachweise
            </Typography>
            <Typography variant="body1" paragraph>
                Diese Anwendung wurde unter Verwendung von Ressourcen von Flaticon.com erstellt.
            </Typography>
            <Typography variant="body1">
            Icons:
            </Typography>
            <ul>
            <li>
                <Link href="https://www.flaticon.com/de/kostenlose-icons/speck" title="speck Icons" target="_blank" rel="noopener">Speck Icons erstellt von Freepik - Flaticon </Link>
            </li>
            <li>
                <Link href="https://www.flaticon.com/de/kostenlose-icons/essen-und-restaurant" title="essen und restaurant Icons" target="_blank" rel="noopener">Essen und restaurant Icons erstellt von Freepik - Flaticon</Link>
            </li>
            <li>
                <Link href="https://www.flaticon.com/de/kostenlose-icons/gesundes-essen" title="gesundes essen Icons" target="_blank" rel="noopener">Gesundes essen Icons erstellt von Freepik - Flaticon</Link>
            </li>
            <li>
                <Link href="https://www.flaticon.com/de/kostenlose-icons/kuchen" title="kuchen Icons" target="_blank" rel="noopener">Kuchen Icons erstellt von Freepik - Flaticon</Link>
            </li>
            </ul>
        </Box>
        {/* <Navbar /> */}
    </Container>
    </div>
  );
};

export default CreditsComponent;
