import React from 'react';
import {
  Button,
  Container,
  Box,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  TextField,
  MobileStepper,
  Paper,
  Slider,
  Grow,
  FormControl,
  FormLabel,
  CircularProgress,
  Grid,
} from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import MuiInput from '@mui/material/Input';
import { useJourney } from './JourneyService';
import { useTheme } from '@mui/material/styles';


const JourneyComponent = ({ token }) => {
  const theme = useTheme();
  const {
    step,
    formData,
    journeyStarted,
    handleNext,
    handleBack,
    handleChange,
    handleSliderChange,
    handleConfirm,
    questions,
    isNextButtonDisabled,
    startJourney
  } = useJourney(token);

  // Check if token is null or undefined
  if (!token) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const genderIcons = {
    Männlich: <MaleIcon />,
    Weiblich: <FemaleIcon  />,
    Divers: <TransgenderIcon />,
  };


  return (
    // Starte Journey
    <Container maxWidth="sm" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 'calc(100vh - 64px)' }}>
    <Box mt={10} textAlign="center" flex="1"> {/*distance to the top*/}
      {!journeyStarted ? (
        <Grow in={!journeyStarted} timeout={1000}>
          <Box  mt={6}>                       {/*16 in total*/}
            <Typography variant="h3">Willkommen</Typography>
            <Typography variant="h3" mb={9}>{token.given_name} {token.family_name}</Typography>
            <Box mt={4}>
              <Button size="large" variant="contained" color="primary" onClick={startJourney}>
                Starte deine Journey
              </Button>
            </Box>
          </Box>
        </Grow>
      ) : (
        <>
        
          <Box mt={1} flex="1"> 
            {step < questions.length ? (
              <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100%">
                <FormControl component="fieldset" fullWidth>
                  <FormLabel component="legend">
                    <Typography variant="h4" mb={4}>{questions[step].label}</Typography>
                  </FormLabel>
                  {questions[step].type === 'radio' ? (
                    <Grid container spacing={2} justifyContent="center">
                      {questions[step].options.map((option, index) => (
                        <Grid item xs={12} sm={6} md={index === 2 ? 12 : 6} key={option}>
                          <Card
                            onClick={() => handleChange({ target: { name: questions[step].name, value: option } })}
                            sx={{
                                cursor: 'pointer',
                                border: formData[questions[step].name] === option ? `2px solid ${theme.palette.primary.main}` : '1px solid grey',
                                backgroundColor: formData[questions[step].name] === option ? theme.palette.primary.main: theme.palette.primary.mainLight,
                                textAlign: 'center',
                                height: '100px',
                                '@media (max-height: 700px)': {
                                    height: '80px', 
                                },
                                //maxWidth: option === "Divers"? '100%' : '30%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '16px',
                              }}
                          >
                             <CardActionArea>
                              <CardContent>
                                {React.cloneElement(genderIcons[option], {
                                  sx: {
                                    fontSize: 80,
                                    '@media (max-height: 700px)': {
                                      height: '70px', 
                                    },
                                    //color: theme.palette.secondary.mainDark,
                                    color: formData[questions[step].name] === option ? theme.palette.secondary.mainLight: theme.palette.secondary.mainDark,
                      
                                  }
                                })}
                              </CardContent>
                            </CardActionArea>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                    ) : questions[step].type === 'slider' ? (
                      <Box px={2} mt={2} width="100%">
                        <Slider
                          value={formData[questions[step].name]}
                          min={questions[step].min}
                          max={questions[step].max}
                          step={questions[step].step}
                          onChange={handleSliderChange(questions[step].name)}
                          valueLabelDisplay="auto"
                          style={{ width: '90%', margin: '0 auto' }}
                        />
                        <Typography align="center" variant="h6">{formData[questions[step].name]} {questions[step].label.toLowerCase().includes('gewicht') ? 'kg' : 'cm'}</Typography>
                      </Box>
                    ) : (
                      <TextField
                        type={questions[step].type}
                        name={questions[step].name}
                        value={formData[questions[step].name]}
                        onChange={handleChange}
                        fullWidth
                        style={{ marginTop: '20px' }}
                      />
                    )}
                  </FormControl>
                </Box>
              ) : (
                
                <div>
                {/* Summary of all information */}
                <Box className="profileHeader" sx={{ width: '100%', textAlign: 'center' }}>
                  <Typography variant="h4" gutterBottom>
                    Deine Angaben
                  </Typography>
                </Box>
                  <Box className="profileDataContainer" elevation={3} sx={{ p: 3, width: '100%', maxWidth: 600 }}>
                  <Grid container spacing={2}>
                <Grid className="profileGridItem"item xs={6}>
                  <Typography className="profileForm"variant="body1">Geschlecht:</Typography>
                </Grid>
                <Grid className="profileGridItem" item xs={6}>
                  <Typography className="profileData" variant="body1">{formData.gender}</Typography>
                </Grid>
                <Grid className="profileGridItem" item xs={6}>
                  <Typography className="profileForm" variant="body1">Größe:</Typography>
                </Grid>
                <Grid className="profileGridItem" item xs={6}>
                  <Typography className="profileData" variant="body1">{formData.height} cm</Typography>
                </Grid>
                <Grid className="profileGridItem" item xs={6}>
                  <Typography className="profileForm" variant="body1">Gewicht:</Typography>
                </Grid>
                <Grid className="profileGridItem" item xs={6}>
                  <Typography className="profileData" variant="body1">{formData.weight} kg</Typography>
                </Grid>
                <Grid className="profileGridItem" item xs={6}>
                  <Typography className="profileForm" variant="body1">Zielgewicht:</Typography>
                </Grid>
                <Grid className="profileGridItem" item xs={6}>
                  <Typography className="profileData" variant="body1">{formData.goalWeight} kg</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className="profileForm" variant="body1">Geburtstag:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className="profileData" variant="body1">
                    {new Date(formData.birthday).toLocaleDateString()}
                  </Typography>
                </Grid>
              </Grid>
              <Box className="editButton" display="flex" justifyContent="center" mt={4}>
                <Button variant="contained" className="editButton" color="primary" onClick={handleConfirm}>
                  Bestätigen
                </Button>
              </Box>
                  </Box>
                </div>
              )}
            </Box>
          </>
        )}
      </Box>


      {/* Mobile Stepper at end of page */}
      {journeyStarted && (
        <MobileStepper
          variant="dots"
          steps={questions.length + 1}
          position="static"
          activeStep={step}
          sx={{
            marginBottom: 10,   //margin to the bottom
            '& .MuiMobileStepper-dot': {
              width: 12,        //dot size
              height: 12, 
              margin: '0 4px',  //spacing between dots
            },
            '& .MuiMobileStepper-dotActive': {
              backgroundColor: 'primary.main',
            },
          }}
          nextButton={
            step < questions.length && (
              <Button
                size="large"
                onClick={handleNext}
                disabled={isNextButtonDisabled()}
                sx={{ padding: '12px 24px', fontSize: '1.2rem' }} 
              >
                Weiter
                <KeyboardArrowRight />
              </Button>
            )
          }
          backButton={
            <Button
              size="large"
              onClick={handleBack}
              disabled={step === 0}
              sx={{ padding: '12px 24px', fontSize: '1.2rem' }} 
            >
              <KeyboardArrowLeft />
              Zurück
            </Button>
          }
        />
      )}
    </Container>
  );
};

export default JourneyComponent;
