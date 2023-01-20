import { BrowserRouter as Router } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import AppRoutes from "./routes";
import './styles/global.css';
import { AppContextProvider } from "./contexts/AppContext";

export const theme = createTheme({
  palette: {
    primary: {
      main: '#0D2E63',
      contrastText: '#FAFAFA'
    },
  }
})

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppContextProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AppContextProvider>
    </ThemeProvider>
  )
}