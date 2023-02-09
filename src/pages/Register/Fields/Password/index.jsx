import { useCallback, useContext, useEffect, useState } from 'react';
import { TextField, InputAdornment, IconButton, Typography } from '@mui/material';

import { RegisterContext } from "../../../../contexts/RegisterContext";

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { theme } from '../../../../App';


export default function Password() {
  const { registerState, registerDispatch } = useContext(RegisterContext);

  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [stepValid, setStepValid] = useState(null);

  const value = registerState.usuario.senha;

  const handleClickShowPassword = useCallback(() => setShowPassword(!showPassword), [showPassword]);

  useEffect(() => {
    isValid(value);
  }, [confirmPassword]);

  const isValid = useCallback((value) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const result = regex.test(value);

    if (result && confirmPassword === value) {
      setStepValid(true)
      registerDispatch({ type: 'HANDLE_VALID', stepValid: true });
    } else {
      setStepValid(false)
      registerDispatch({ type: 'HANDLE_VALID', stepValid: false });
    }
  }, [confirmPassword]);

  const handleInput = useCallback((event) => {
    let newValue = event.target.value;
    isValid(newValue);
    registerDispatch({ type: 'HANDLE_USER', password: newValue });
  }, []);

  return (
    <>
      <TextField
        fullWidth
        color="primary"
        value={value || ''}
        type={showPassword ? "text" : "password"}
        label="Informe sua senha de acesso"
        error={stepValid !== null && !stepValid}
        onInput={handleInput}
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
      <TextField
        fullWidth
        style={{ marginTop: theme.spacing(4) }}
        color="primary"
        type={showPassword ? "text" : "password"}
        label="Confirme sua senha de acesso"
        error={stepValid !== null && !stepValid}
        helperText={
          <Typography style={{ fontSize: '1em', marginTop: '8px' }}>
            <span style={{ fontWeight: 700 }}>A senha precisa ter:</span>
            <ul>
              <li>Uma letra minúscula</li>
              <li>Uma letra maiúscula</li>
              <li>Um número</li>
              <li>Um caractere especial</li>
              <li>Comprimento de 8 ou mais caracteres</li>
            </ul>
          </Typography>
        }
        onInput={(e) => setConfirmPassword(e.target.value)}
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
    </>
  )
}
