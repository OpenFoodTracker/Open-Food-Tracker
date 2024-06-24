import React, { useState, useEffect } from 'react';
import { Typography, Box, ToggleButtonGroup, ToggleButton, Tabs, Tab } from '@mui/material';
import { ReferenceLine, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
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
  const [lineValue, setLineValue] = useState(0);

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

    if(mealData.length === 0){
      return;
    }
  
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
    const daysOfWeek = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
    return daysOfWeek[inputDate.getDay()];
  }

  //updates the Graph on data change
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
    } else if (timeframe === 'month') {
      for (let day = 0; day < 30; day++) {
        let currentValue = 0;
        

        if (data.hasOwnProperty(tempDate)) {
          currentValue += data[tempDate][`total${tabValue}`];
        }
        
        updatedTotalValue += currentValue;
        updatedGraphData.unshift({
          name: tempDate.getDate(),
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
          name: tempDate.toLocaleString('de-DE', { month: 'short' }).substring(0, 2),
          uv: currentValue
        });
        tempDate = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate()-1);
      }
    }

    setTotalValue(updatedTotalValue);
    setGraphData(updatedGraphData);
  };

  const calculateDailyCalorieGoal = (currentWeight, goalWeight) => {
    const weightDifference = currentWeight - goalWeight;
    const baseCalories = currentWeight * 24; 

    const calorieAdjustment = weightDifference * 10;
    return baseCalories - calorieAdjustment;
  };

  //Updates the red line
  useEffect(() => {
    let newLineValue = 0;
    if(tabValue === "Calories"){
      newLineValue = userData && userData.weight && userData.goal ? calculateDailyCalorieGoal(userData.weight, userData.goal) : 2000;
    } else if(tabValue === "Carbs") {
      newLineValue = 300;
    } else if(tabValue === "Fat") {
      newLineValue = 70;
    } else if(tabValue === "Protein"){
      newLineValue = 50;
    }

    if(timeframe === "year"){
      newLineValue = newLineValue*30;
    }
    setLineValue(newLineValue);
  }, [tabValue, timeframe]);

  const handleTimeframeChange = (event, newTimeframe) => {
    setTimeframe(newTimeframe);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div class="statistic">
      <div className="statisticHead">
          <Typography className="statisticTitle" gutterBottom>
            { conversionTable[tabValue].show}
          </Typography>
          <Typography className="statisticDescription" variant="h5" component="div">
            { totalValue.toFixed(0)} {conversionTable[tabValue].unit}
          </Typography>
          <Box sx={{ width: '100%', height: '40vh' }}>
            <ResponsiveContainer>
              <LineChart data={graphData} className="statisticChart">
                <Line type="monotone" dataKey="uv" stroke="#7879F1" strokeWidth={2}/>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <ReferenceLine y={lineValue} stroke="red" strokeDasharray="3 3" />
              </LineChart>
            </ResponsiveContainer>
          </Box>
          <ToggleButtonGroup
            color="primary"
            value={timeframe}
            exclusive
            onChange={handleTimeframeChange}
            fullWidth
            className="statisticTimeButton"
          >
            <ToggleButton className="left" value="week">1 Woche</ToggleButton>
            <ToggleButton value="month">1 Monat</ToggleButton>
            <ToggleButton className="right" value="year">1 Jahr</ToggleButton>
          </ToggleButtonGroup>
      </div>
      <Tabs value={tabValue} onChange={handleTabChange} centered className="statisticTabsRoot"
        TabIndicatorProps={{
          style: { display: 'none' }
        }}>
            <Tab label="Kalorien" value="Calories" className="tab" />
            <Tab label="Kohlenhydrate" value="Carbs" className="tab"/>
            <Tab label="Fett" value="Fat" className="tab"/>
            <Tab label="Protein" value="Protein" className="tab"/>
      </Tabs>
    </div>
  );
};

export default StatisticComponent;
