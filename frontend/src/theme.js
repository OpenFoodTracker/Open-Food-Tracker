import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1DAA82', //Figma: 75BE63
      mainLight:'#E4EEEB'
    },
    secondary: {
      main: '#D8BCFA', 
      mainDark:'#A373DE',
      mainLight: '#EDDEFF',
      gradient: '#B0B7F2',
    },
  },
});

export default theme;
