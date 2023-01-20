import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { AppContext } from './contexts/AppContext';
import Home from './pages/Home';
import Login from './pages/Login';

export default function AppRoutes() {
  const { appState } = useContext(AppContext);

  return (
    <Routes>
      <Route 
        index
        element={
          appState.isSignedIn ? <Home /> : <Login />
        } 
      />
      <Route 
        path="/home" 
        element={
          <ProtectedRoute isSignedIn={appState.isSignedIn}>
            <Home />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}