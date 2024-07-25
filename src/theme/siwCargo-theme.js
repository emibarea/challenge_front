import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2771d1', 
    },
    secondary: {
      main: '#f4f8fe', 
    },
    background: {
      default: '#f4f8fe',
      paper: '#fff', 
    },
    text: {
      primary: '#050c1a', 
      secondary: '#2771d1', 
    },
  },
});

export default theme;