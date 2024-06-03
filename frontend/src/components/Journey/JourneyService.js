import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const useJourney = (token) => {
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
        const userRecipesResponse = await axios.post('/api/recipe/', userRecipesData);
        console.log('User recipes created successfully:', userRecipesResponse.data);
      } catch (error) {
        console.error('Error creating user recipes:', error.response ? error.response.data : error.message);
      }

      try {
        const userMealsResponse = await axios.post('/api/meal/user/', userMealsData);
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

  const startJourney = () => {
    setJourneyStarted(true);
  };

  return {
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
  };
};
