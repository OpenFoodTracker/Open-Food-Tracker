import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1DAA82', //Figma: 75BE63
      mainLight:'#E4EEEB'
    },
    secondary: {
      main: '#A5A6F6', //'#D8BCFA',    
      mainDark: '#7879F1',
      mainLight: '#EDDEFF',
      gradient1: '#D8BCFA' ,//'#A373DE', 
      gradient2: '#B0B7F2',
    },
  },
});

export default theme;
