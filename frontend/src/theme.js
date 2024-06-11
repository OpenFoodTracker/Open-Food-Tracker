import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1aac83;', 
      mainLight:'#E4EEE5'
    },
    secondary: {
      main: '#A5A6F6', 
      mainDark:'#7879F1',
      mainLight: '#E0E5FF',
      gradient: '#a298dd',
    },
  },
});

export default theme;
