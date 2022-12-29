import { BrowserRouter as Router } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import AppRoutes from "./routes";
import './styles/global.css';


export default function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#0D2E63',
        contrastText: '#333333'
      },
      secondary: {
        main: '#FAFAFA',
        contrastText: '#333333'
      }
    }
  })
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppRoutes />
      </Router>
    </ThemeProvider>
  )
}