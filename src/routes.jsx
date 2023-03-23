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
import Adm from './pages/Adm';

export function RouteWithSubRoutes({
  path,
  component: Component,
}) {

  return (
    <Route
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
      <Route path="/adm" component={Adm} />
      {/* <Route path="/home" component={Home} /> */}
      <ProtectedRoute path="/home" isSignedIn={appState.isSignedIn} component={Home} />
    </Switch>
  )
}