import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { memo, useCallback, useContext, useEffect, useState } from "react";
import { RegisterContext } from "../../../../../contexts/RegisterContext";
import InputMask from 'react-input-mask';

function Phone() {
  const { registerState, registerDispatch } = useContext(RegisterContext);
  const [stepValid, setStepValid] = useState(null);

  const value = registerState.contato;

  useEffect(() => {
    isValid(value.celular);
  }, []);

  const isValid = useCallback((value) => {
    const regex = /\([1-9][0-9]\)\s?[9]?\s?\d{4}([\s-])?\d{4}/;
    const result = regex.test(value);
    (value !== null && setStepValid(result));
    registerDispatch({ type: 'HANDLE_VALID', stepValid: result });
  }, []);

  const handleInput = useCallback((event) => {
    let newValue = event.target.value;
    isValid(newValue);
    registerDispatch({ type: 'HANDLE_PHONE', number: newValue, whatsapp: value.whatsapp });
  }, [value]);

  const handleWhatsapp = useCallback((event) => {
    registerDispatch({ type: 'HANDLE_PHONE', number: value.celular, whatsapp: event.target.checked });
  }, [value]);


  return (
    <>
      <InputMask
        fullWidth
        label='Informe o seu Celular'
        type='tel'
        mask='(99) 99999-9999'
        maskChar=' '
        error={stepValid !== null && !stepValid}
        value={value.celular || ''}
        onChange={handleInput}>
        {(inputProps) => <TextField {...inputProps}/>}
      </InputMask>

      <FormControlLabel
        label="Este número tem WhatsApp?"
        style={{ width: '100%', paddingLeft: '12px' }}
        control={
          <Checkbox
            value={value.whatsapp}
            color='primary'
            checked={String(value.whatsapp) === 'true'}
            onChange={handleWhatsapp}
          />
        }
      />
    </>
  )
}

export default memo(Phone);