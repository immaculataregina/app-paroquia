import { useContext } from 'react';
import { 
  BrowserRouter as Router,
  Route, 
  Switch
} from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { AppContext } from './contexts/AppContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

export function RouteWithSubRoutes({
  path,
  component: Component,
  key
}) {

  return (
    <Route
      key={key}
      path={path}
      render={(props) => (
        <Component {...props} />
      )}
    />
  );
}

export default function AppRoutes() {
  const { appState } = useContext(AppContext);

  return (
    <Switch>
      <Route exact path="/" component={appState.isSignedIn ? Home : Login} />
      <Route path="/cadastro" component={Register} />
      <ProtectedRoute path="/home" isSignedIn={appState.isSignedIn} component={Home} />
    </Switch>
  )
}