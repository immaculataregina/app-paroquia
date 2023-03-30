import { createTheme, ThemeProvider } from '@mui/material/styles';

import AppRoutes from "./routes";
import './styles/global.css';
import { AppContextProvider } from "./contexts/AppContext";
import { LoginContextProvider } from "./contexts/LoginContext";
import { RegisterContextProvider } from './contexts/RegisterContext';
import { useCallback } from 'react';
import { api } from './services/api';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#0D2E63',
      contrastText: '#FAFAFA',
    },
  }
})

export default function App() {

  // const getDataParoquia = useCallback(async () => {
  //   const res = await api.autenticacao.getData();
  //   console.log('------> ', res);
  // }, []);

  // getDataParoquia();

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