import { TextField } from "@mui/material";
import { memo, useCallback, useContext, useState, useEffect } from "react";
import { RegisterContext } from "../../../../../contexts/RegisterContext";

function Email() {
  const { registerState, registerDispatch } = useContext(RegisterContext);
  const [stepValid, setStepValid] = useState(null);

  const value = registerState.contato.email;

  useEffect(() => {
    isValid(value);
  }, []);

  const isValid = useCallback((value) => {
    const regex = /^[a-z0-9._-]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?(\.[a-z]+)?$/;
    const result = regex.test(value);
    (value !== null && setStepValid(result));
    registerDispatch({ type: 'HANDLE_VALID', stepValid: result });
  }, []);

  const handleInput = useCallback((event) => {
    let newValue = event.target.value;
    isValid(newValue);
    registerDispatch({ type: 'HANDLE_EMAIL', email: newValue });
  }, [value]);


  return (
    <TextField 
      fullWidth
      label="Informe o seu e-mail"
      type="email"
      error={stepValid !== null && !stepValid}
      value={value || ''}
      onInput={handleInput}
    />
  )
}

export default memo(Email);