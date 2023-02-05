import { TextField } from "@mui/material";
import InputMask from 'react-input-mask';
import { memo, useCallback, useContext, useState, useMemo } from "react";
import { RegisterContext } from "../../../../contexts/RegisterContext";

function Birthday() {
  const { registerState, registerDispatch } = useContext(RegisterContext);
  const [stepValid, setStepValid] = useState(null);

  const value = useMemo(() => {
    if (registerState.nascimento) {
      const ano = registerState.nascimento.split('-')[0];
      const mes = registerState.nascimento.split('-')[1];
      const dia = registerState.nascimento.split('-')[2];

      return `${dia}/${mes}/${ano}`;
    }

    return '';
}, []);

  const birthdayIsValid = useCallback((value) => {
    const regex = /(((0[1-9]|[12][0-9]|30)[-/]?(0[13-9]|1[012])|31[-/]?(0[13578]|1[02])|(0[1-9]|1[0-9]|2[0-8])[-/]?02)[-/]?[0-9]{4}|29[-/]?02[-/]?([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00))/;
    const result = regex.test(value);
    (value !== null && setStepValid(result));
    registerDispatch({ type: 'HANDLE_VALID', stepValid: result });
  }, []);

  const handleInput = useCallback((event) => {
    let newValue = event.target.value;
    birthdayIsValid(newValue);
    registerDispatch({ 
      type: 'HANDLE_BIRTHDAY', 
      birthday: newValue 
    });
  }, []);


  return (
    <InputMask
      fullWidth
      autoFocus
      label="Informe sua data de nascimento"
      mask='99/99/9999'
      maskChar=''
      type='tel'
      error={stepValid !== null && !stepValid}
      defaultValue={value || ''}
      onInput={handleInput}
    >
      {(inputProps) => <TextField {...inputProps} />}
    </InputMask>
  )
}

export default memo(Birthday);