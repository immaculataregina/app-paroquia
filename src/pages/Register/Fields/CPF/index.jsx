import { TextField } from "@mui/material";
import { memo, useCallback, useContext, useState } from "react";
import InputMask from 'react-input-mask';
import { RegisterContext } from "../../../../contexts/RegisterContext";
import { isValid } from 'cpf';

function CPF() {
  const { registerState, registerDispatch } = useContext(RegisterContext);
  const [stepValid, setStepValid] = useState(null);

  const value = registerState.cpf;

  const cpfIsValid = useCallback((value) => {
    const result = isValid(value);
    (value !== null && setStepValid(result));
    registerDispatch({ type: 'HANDLE_VALID', stepValid: result });
  }, []);

  const handleInput = useCallback((event) => {
    let newValue = event.target.value;
    cpfIsValid(newValue);
    registerDispatch({ type: 'HANDLE_CPF', cpf: newValue });
  }, []);


  return (
    <InputMask
      fullWidth
      label='CPF'
      mask='999.999.999-99'
      maskChar=' '
      type='tel'
      error={stepValid !== null && !stepValid}
      value={value || ''}
      onChange={handleInput}
    >
      {(inputProps) => <TextField {...inputProps} />}
    </InputMask>
  )
}

export default memo(CPF);