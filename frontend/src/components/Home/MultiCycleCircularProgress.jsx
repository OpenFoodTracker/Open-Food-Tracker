import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme';

const MultiCycleCircularProgress = ({ value, dailyGoal }) => {
  const fullCycles = Math.floor(value / dailyGoal);
  const remainingValue = (value % dailyGoal) / dailyGoal * 100;

  return (
    <ThemeProvider theme={theme}>
      {/* <Box sx={{ position: 'relative', display: 'inline-flex' }}> */}
        {Array.from({ length: fullCycles }).map((_, index) => (
          <CircularProgress
            key={index}
            variant="determinate"
            value={100}
            size={140}
            thickness={7}
            sx={{
              position: 'absolute',
              left: 0,
              color: index % 2 === 0 ? theme.palette.primary.main : theme.palette.secondary.main,
            }}
          />
        ))}
        <CircularProgress
          variant="determinate"
          value={remainingValue}
          size={140}
          thickness={7}
          sx={{
            position: 'absolute',
            left: 0,
            color: fullCycles % 2 === 0 ? theme.palette.primary.main : theme.palette.secondary.main,
          }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 0 1vh 0'
          }}
        >
         <Typography variant="h5" component="div"
              sx={{ 
                  fontSize: value > 9999? '16px' : '20px',
                }} >
                {value} kcal
              </Typography>
        </Box>
      {/* </Box> */}
    </ThemeProvider>
  );
};

export default MultiCycleCircularProgress;
