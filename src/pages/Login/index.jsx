import { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField, InputAdornment, IconButton } from '@mui/material';
import MuiSnackbar from '../../components/MuiSnackbar';

import { theme } from '../../App';

import LogoImmaculata from '../../static/img/logo-Immaculata.png';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { AppContext } from '../../contexts/AppContext';
import { LoginContext } from '../../contexts/LoginContext';

export default function Login() {
  const navigate = useNavigate();

  const { appState, appDispatch } = useContext(AppContext);
  const { login } = useContext(LoginContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { loading } = appState;

  const handleClickShowPassword = useCallback(() => setShowPassword(!showPassword), []);

  const handleInput = useCallback((e, key) => {
    if (key === 'email') {
      setEmail(e);
      return;
    }
    if (key === 'password') {
      setPassword(e);
      return;
    }

    return;
  }, []);

  const handleLogin = useCallback(async (e) => {
    e.preventDefault();
    
    const response = await login(email, password);

    if (response.login) {
      navigate("/home");
    }
  }, [email, password, appState]);

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', padding: theme.spacing(8), height: '100vh' }}
    >
      <header
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <img 
          src={LogoImmaculata} 
          alt="Logo"
          style={{ width: '140px', marginBottom: theme.spacing(4), borderRadius: 100}}  
        />
      </header>
      <MuiSnackbar message="Login Inválido" type="error" />
      <form
        style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: '0 auto', padding: theme.spacing(1), width: '100%' }}
        onSubmit={handleLogin}
      >
        <TextField 
          color="primary"
          value={email}
          type="email"
          label="E-mail"
          autoComplete='off'
          onChange={e => handleInput(e.target.value, 'email')}
          style={{ marginBottom: theme.spacing(2) }}
        />
        <TextField 
          color="primary"
          value={password}
          type={showPassword ? "text" : "password"}
          label="Senha"
          autoComplete='off'
          onChange={e => handleInput(e.target.value, 'password')}
          style={{ marginBottom: theme.spacing(4) }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          disabled={loading || (!email || !password)}
          size="large"
        >{loading ? 'Entrando...' : 'Entrar'}</Button>
      </form>

      <div style={{ margin: `${theme.spacing(10)} 0`}}>
        <span>
          Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
        </span>
      </div>

      <footer style={{ fontSize: theme.spacing(1.5), opacity: 0.6, marginTop: 'auto' }}>{new Date().getFullYear()} - Immaculata | v1.0.0</footer>
    </div>
  )
}
