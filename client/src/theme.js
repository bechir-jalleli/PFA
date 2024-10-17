import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  palette: {
    primary: {
      main: '#1890ff',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

export default theme;
