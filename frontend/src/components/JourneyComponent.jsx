import React, { useState } from 'react';
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
} from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const JourneyComponent = ({ token }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    gender: '',
    height: 160,
    weight: 60,
    birthday: '',
    goalWeight: 60
  });
  const [journeyStarted, setJourneyStarted] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    setStep(prevStep => prevStep + 1);
  };

  const handleBack = () => {
    setStep(prevStep => prevStep - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSliderChange = (name) => (event, newValue) => {
    setFormData({
      ...formData,
      [name]: newValue
    });
  };

  const handleConfirm = async () => {
    const userData = {
      email: token.email,
      gender: formData.gender,
      height: formData.height,
      weight: formData.weight,
      birthday: new Date(formData.birthday).toISOString(),
      goal: formData.goalWeight,
      darkMode: true,
      notifications: true
    };

    try {
      console.log(userData);
      const response = await axios.post('/api/user/', userData); // relative URL
      console.log('User data posted successfully:', response.data);

      const IdResponse = await axios.post('/api/user/getUserByEmail', { email: token.email });
      const userId = IdResponse.data._id; // Stellen Sie sicher, dass userId hier korrekt abgerufen wird
      const recipeFileId = IdResponse.data.recipeFileId;
      const mealsFileId = IdResponse.data.mealsFileId;
      console.log('User ID fetched successfully:', userId);
      console.log('Recipe File ID fetched successfully:', recipeFileId);
      console.log('Meals File ID fetched successfully:', mealsFileId);

      const userRecipesData = {
        recipeFileId: recipeFileId,
        userId: userId, // Stellen Sie sicher, dass userId hier gesetzt wird
        recipes: [] // Stellen Sie sicher, dass recipes kein null recipeId enthält
      };

      const userMealsData = {
        mealsFileId: mealsFileId,
        userId: userId, // Stellen Sie sicher, dass userId hier gesetzt wird
        meals: []
      };

      try {
        const userRecipesResponse = await axios.post('/api/recipes/', userRecipesData);
        console.log('User recipes created successfully:', userRecipesResponse.data);
      } catch (error) {
        console.error('Error creating user recipes:', error.response ? error.response.data : error.message);
      }

      try {
        const userMealsResponse = await axios.post('/api/meals/', userMealsData);
        console.log('User meals created successfully:', userMealsResponse.data);
      } catch (error) {
        console.error('Error creating user meals:', error.response ? error.response.data : error.message);
      }

      // Save userData to localStorage
      localStorage.setItem('userData', JSON.stringify(userData));

      // Navigate to the home page after successful operations
      navigate('/home');

    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  const questions = [
    {
      label: 'Geschlecht',
      name: 'gender',
      type: 'radio',
      options: ['Male', 'Female', 'Other'],
    },
    {
      label: 'Größe (cm)',
      name: 'height',
      type: 'slider',
      min: 100,
      max: 220,
      step: 1,
    },
    {
      label: 'Gewicht (kg)',
      name: 'weight',
      type: 'slider',
      min: 40,
      max: 150,
      step: 1,
    },
    {
      label: 'Geburtstag',
      name: 'birthday',
      type: 'date',
    },
    {
      label: 'Zielgewicht (kg)',
      name: 'goalWeight',
      type: 'slider',
      min: 40,
      max: 150,
      step: 1,
    }
  ];

  const isNextButtonDisabled = () => {
    const currentQuestion = questions[step];
    const currentAnswer = formData[currentQuestion.name];
    return currentAnswer === '' || currentAnswer === undefined;
  };

  // Check if token is null or undefined
  if (!token) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 'calc(100vh - 64px)' }}>
      <Box mt={4} textAlign="center" flex="1">
        {!journeyStarted ? (
          <Grow in={!journeyStarted} timeout={1000}>
            <Box>
              <Typography variant="h3">Willkommen</Typography>
              <Typography variant="h3">{token.given_name} {token.family_name}</Typography>
              <Typography variant="subtitle1" mt={2}>{token.email}</Typography>
              <Box mt={4}>
                <Button variant="contained" color="primary" onClick={() => setJourneyStarted(true)}>
                  Starte deine Journey
                </Button>
              </Box>
            </Box>
          </Grow>
        ) : (
          <>
            <Box mt={4} flex="1">
              {step < questions.length ? (
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100%">
                  <FormControl component="fieldset" fullWidth>
                    <FormLabel component="legend">
                      <Typography variant="h4">{questions[step].label}</Typography>
                    </FormLabel>
                    {questions[step].type === 'radio' ? (
                      <Box display="flex" justifyContent="center" mt={2}>
                        {questions[step].options.map(option => (
                          <Card key={option} onClick={() => handleChange({ target: { name: questions[step].name, value: option } })} style={{ margin: '0 10px', cursor: 'pointer', border: formData[questions[step].name] === option ? '2px solid blue' : '1px solid grey' }}>
                            <CardActionArea>
                              <CardContent>
                                <Typography variant="h6">{option}</Typography>
                              </CardContent>
                            </CardActionArea>
                          </Card>
                        ))}
                      </Box>
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
                        <Typography align="center" variant="h6">{formData[questions[step].name]} {questions[step].label.includes('Gewicht') ? 'kg' : 'kg'}</Typography>
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
                <Box mt={4}>
                  <Paper elevation={3} style={{ padding: '16px' }}>
                    <Typography variant="h6">Zusammenfassung Ihrer Angaben</Typography>
                    <Typography>Geschlecht: {formData.gender}</Typography>
                    <Typography>Größe: {formData.height} cm</Typography>
                    <Typography>Gewicht: {formData.weight} kg</Typography>
                    <Typography>Geburtstag: {formData.birthday}</Typography>
                    <Typography>Zielgewicht: {formData.goalWeight} kg</Typography>
                  </Paper>
                  <Box mt={2}>
                    <Button variant="contained" color="primary" onClick={handleConfirm}>
                      Bestätigen
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          </>
        )}
      </Box>
      {journeyStarted && (
        <MobileStepper
          variant="dots"
          steps={questions.length + 1}
          position="static"
          activeStep={step}
          nextButton={
            step < questions.length && (
              <Button size="small" onClick={handleNext} disabled={isNextButtonDisabled()}>
                Weiter
                <KeyboardArrowRight />
              </Button>
            )
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={step === 0}>
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
