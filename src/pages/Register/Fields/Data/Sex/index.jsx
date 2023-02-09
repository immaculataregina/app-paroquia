import { FormControlLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { memo, useCallback, useContext, useEffect, useState } from "react";
import { theme } from "../../../../../App";
import { RegisterContext } from "../../../../../contexts/RegisterContext";

function Sex() {
  const { registerState, registerDispatch } = useContext(RegisterContext);

  const value = registerState.dados.idSexo;

  useEffect(() => {
    registerDispatch({ type: 'HANDLE_VALID', stepValid: true });
  }, []);

  const isValid = useCallback((value) => {
    const regex = /[1,2]/;
    const result = regex.test(value);
    registerDispatch({ type: 'HANDLE_VALID', stepValid: result });
  }, []);

  const handleInput = useCallback((event) => {
    let newValue = event.target.value;
    isValid(newValue);
    registerDispatch({ type: 'HANDLE_SEX', idSexo: newValue });
  }, []);


  return (
    <>
      <Typography
        gutterBottom
        style={{ fontweight: 700, fontSize: '1.2em', display: 'flex', width: '100%' }}
      >
        Sexo
      </Typography>

      <RadioGroup
        style={{ display: 'flex', flexDirection: 'row', width: '100%' }}
        value={value}
        onChange={handleInput}>
        <FormControlLabel
          label='Feminino'
          value={2}
          control={<Radio color='primary' />}
        />
        <FormControlLabel
          label='Masculino'
          value={1}
          control={<Radio color='primary' />}
        />
      </RadioGroup>
    </>
  )
}

export default memo(Sex);