import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField, InputAdornment, IconButton } from '@mui/material';
import MuiSnackbar from '../../components/MuiSnackbar';

import { theme } from '../../App';

import LogoImmaculata from '../../static/img/logo-Immaculata.png';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [trigger, setTrigger] = useState(0);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleInput = (e, key) => {
    if (key === 'email') {
      setEmail(e);
      return;
    }
    if (key === 'password') {
      setPassword(e);
      return;
    }

    return;
  }

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', padding: theme.spacing(8) }}
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
      <MuiSnackbar message={"Login Inválido"} type={"error"} trigger={trigger} />
      <form
        style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: '0 auto', padding: theme.spacing(1), width: '100%' }}
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
          disabled={loading}
          size="large"
        >{loading ? 'Entrando...' : 'Entrar'}</Button>
      </form>

      <div style={{ marginTop: theme.spacing(10)}}>
        <span>
          Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
        </span>
      </div>

      <footer style={{ position: 'absolute', bottom: theme.spacing(1), fontSize: theme.spacing(1.5), opacity: 0.6 }}>{new Date().getFullYear()} - Immaculata | v1.0.0</footer>
    </div>
  )
}
