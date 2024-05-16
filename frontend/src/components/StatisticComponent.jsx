import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, ToggleButtonGroup, ToggleButton, Tabs, Tab } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {name: 'M', uv: 4000},
  {name: 'D', uv: 3000},
  {name: 'M', uv: 2000},
  {name: 'D', uv: 2780},
  {name: 'F', uv: 1890},
  {name: 'S', uv: 2390},
  {name: 'S', uv: 3490},
];

const StatisticComponent = ( { userData, token } ) => {
  const [timeframe, setTimeframe] = useState('week');
  const [tabValue, setTabValue] = useState(0);

  const handleTimeframeChange = (event, newTimeframe) => {
    setTimeframe(newTimeframe);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Card sx={{ minWidth: 275, maxWidth: 350, margin: 'auto' }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Kalorien
        </Typography>
        <Typography variant="h5" component="div">
          9622 kcal
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          +3,1% Sie haben diese Woche konsumiert
        </Typography>
        <ToggleButtonGroup
          color="primary"
          value={timeframe}
          exclusive
          onChange={handleTimeframeChange}
          fullWidth
        >
          <ToggleButton value="week">1 Woche</ToggleButton>
          <ToggleButton value="month">1 Monat</ToggleButton>
          <ToggleButton value="year">1 Jahr</ToggleButton>
        </ToggleButtonGroup>
        <Box sx={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={data}>
              <Bar dataKey="uv" fill="#8884d8" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
            </BarChart>
          </ResponsiveContainer>
        </Box>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Kalorien" />
          <Tab label="Kohlenhydrate" />
          <Tab label="Fett" />
          <Tab label="Protein" />
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default StatisticComponent;
