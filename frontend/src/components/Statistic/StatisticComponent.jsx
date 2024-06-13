import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, ToggleButtonGroup, ToggleButton, Tabs, Tab } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const conversionTable = {Calories: {show: 'Kalorien', unit: 'kcal'}, Fat: {show: 'Fett', unit: 'g'},
                         Protein: {show: 'Protein', unit: 'g'}, Carbs: {show: 'Kohlenhydrate', unit: 'g'}};

const StatisticComponent = ( { userData, token } ) => {
  const [timeframe, setTimeframe] = useState('week');
  const [tabValue, setTabValue] = useState('Calories');
  const [user] = useState(JSON.parse(localStorage.getItem('userData')));
  const [data, setData] = useState(null);
  const [graphData, setGraphData] = useState({});
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    const getMeals = async () => {
      try {
        const mealsFileId = user.mealsFileId;
        const response = await axios.post(`/api/meal/user/yearMeal`, 
          { mealsFileId, userDate: new Date() }, 
          {
              headers: {
                  'Authorization': `Bearer ${localStorage.getItem('userToken')}`
              }
          }
        );

        return response.data;
      } catch (error) {
          console.error('Error fetching meals:', error);
      }
    };
    getMeals().then(mealData => {
      mapCaloriesToDate(mealData);
    });
  }, []);


  const mapCaloriesToDate = (mealData) => {
    const valuesByDate = {};
  
    mealData[0].meals.forEach(mealDay => {
      const tempDate = new Date(mealDay.date);
      const date = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate());
      valuesByDate[date] = {
        totalCalories: 0,
        totalFat: 0,
        totalProtein: 0,
        totalCarbs: 0,
      };
  
      ['breakfast', 'lunch', 'dinner', 'snack'].forEach(mealType => {
        mealDay[mealType].forEach(meal => {
          valuesByDate[date].totalCalories += meal.kcal;
          valuesByDate[date].totalFat += meal.fat;
          valuesByDate[date].totalProtein += meal.protein;
          valuesByDate[date].totalCarbs += meal.carbs;
        });
      });
    });
  
    setData(valuesByDate); 
  };

  const getWeekday = (inputDate) => {
    const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
    return daysOfWeek[inputDate.getDay()];
  }

  useEffect(() => {
    if(data != null){
      updateGraph();
    }
  }, [data, tabValue, timeframe]);

  const updateGraph = () => {
    let tempDate = new Date();
    const updatedGraphData = [];
    let updatedTotalValue = 0;
    tempDate = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate());
    if(timeframe === 'week'){
      for(let i=0; i<7; i++){
        let currentValue = 0;
        if(data.hasOwnProperty(tempDate)){
          currentValue = data[tempDate][`total${tabValue}`];
        } 
        updatedTotalValue += currentValue;
        updatedGraphData.unshift({
          name: getWeekday(tempDate),
          uv: currentValue
        });
        tempDate = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate()-1);
      }
    } else if (timeframe === 'year') {
      for (let month = 0; month < 12; month++) {
        let currentValue = 0;
        
        while(tempDate.getDate() !== 1) {
          if (data.hasOwnProperty(tempDate)) {
            currentValue += data[tempDate][`total${tabValue}`];
          }
          tempDate = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate()-1);
        }
    
        updatedTotalValue += currentValue;
        updatedGraphData.unshift({
          name: tempDate.toLocaleString('default', { month: 'short' }).charAt(0),
          uv: currentValue
        });
        tempDate = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate()-1);
      }
    }

    setTotalValue(updatedTotalValue);
    setGraphData(updatedGraphData);
  };

  const handleTimeframeChange = (event, newTimeframe) => {
    setTimeframe(newTimeframe);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div class="statistic">
      <Card sx={{ minWidth: 275, maxWidth: 350, margin: 'auto' }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {conversionTable[tabValue].show}
          </Typography>
          <Typography variant="h5" component="div">
            {totalValue.toFixed(0)} {conversionTable[tabValue].unit}
          </Typography>
          <Box sx={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={graphData}>
                <Bar dataKey="uv" fill="#8884d8" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
              </BarChart>
            </ResponsiveContainer>
          </Box>
          <ToggleButtonGroup
            color="primary"
            value={timeframe}
            exclusive
            onChange={handleTimeframeChange}
            fullWidth
          >
            <ToggleButton value="week">1 Woche</ToggleButton>
            <ToggleButton value="year">1 Jahr</ToggleButton>
          </ToggleButtonGroup>
        </CardContent>

      </Card>
      <Tabs value={tabValue} onChange={handleTabChange} centered className="statisticTabsRoot">
            <Tab label="Kalorien" value="Calories" className="tab"/>
            <Tab label="Kohlenhydrate" value="Carbs" className="tab"/>
            <Tab label="Fett" value="Fat" className="tab"/>
            <Tab label="Protein" value="Protein" className="tab"/>
          </Tabs>
    </div>
  );
};

export default StatisticComponent;
