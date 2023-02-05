import { createTheme, ThemeProvider } from '@mui/material/styles';

import AppRoutes from "./routes";
import './styles/global.css';
import { AppContextProvider } from "./contexts/AppContext";
import { LoginContextProvider } from "./contexts/LoginContext";
import { RegisterContextProvider } from './contexts/RegisterContext';

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
        <LoginContextProvider>
          <RegisterContextProvider>
            <AppRoutes />
          </RegisterContextProvider>
        </LoginContextProvider>
      </AppContextProvider>
    </ThemeProvider>
  )
}