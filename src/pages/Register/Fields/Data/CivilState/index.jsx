import { FormControlLabel, MenuItem, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { memo, useCallback, useContext, useEffect, useState } from "react";
import { theme } from "../../../../../App";
import { RegisterContext } from "../../../../../contexts/RegisterContext";

function CivilState() {
  const { registerState, registerDispatch } = useContext(RegisterContext);
  const [stepValid, setStepValid] = useState(null);

  const value = registerState.dados.idEstadoCivil;
  const childrens = registerState.dados.filhos;

  useEffect(() => {
    isValid(value);
  }, []);

  const isValid = useCallback((value) => {
    const regex = /^[1-9][0-9]*$/;
    const result = regex.test(value);
    (value !== null && setStepValid(result));
    registerDispatch({ type: 'HANDLE_VALID', stepValid: result });
  }, []);

  const handleInput = useCallback((event) => {
    let newValue = event.target.value;
    isValid(newValue);
    registerDispatch({ type: 'HANDLE_MARRIAGE', idEstadoCivil: newValue });
  }, []);

  const handleChildrens = useCallback((event) => {
    let newValue = event.target.value;
    if (newValue === 'true') {
      console.log(childrens);
      newValue = (childrens === "0" || childrens === 0) ? 1 : childrens;
      console.log(newValue);
    } 
      
    registerDispatch({ type: 'HANDLE_CHILDREN', filhos: newValue})
  }, []);

  return (
    <>
      <TextField
        style={{ textAlign: 'left' }}
        fullWidth
        select
        label="Estado Civil"
        error={stepValid !== null && !stepValid}
        value={value || ''}
        onChange={handleInput}
      >
        <MenuItem value={1}>
          Solteiro(a)
        </MenuItem>
        <MenuItem value={2}>
          Casado(a)
        </MenuItem>
        <MenuItem value={3}>
          Viúvo(a)
        </MenuItem>
        <MenuItem value={4}>
          Divorciado(a)
        </MenuItem>
        <MenuItem value={5}>
          Apenas moro junto
        </MenuItem>
      </TextField>

      <Typography 
        gutterBottom
        style={{ marginTop: theme.spacing(3), fontweight: 600, fontSize: '1.2em', display: 'flex', width: '100%' }}
      >
        Tem filhos?
      </Typography>

      <RadioGroup
        style={{ display: 'flex', flexDirection: 'row', width: '100%' }}
        value={childrens > 0 ? true : 0}
        onChange={handleChildrens}>
        <FormControlLabel
          label='Sim'
          value={true}
          control={<Radio color='primary' />}
        />
        <FormControlLabel
          label='Não'
          value={0}
          control={<Radio color='primary' />}
        />
      </RadioGroup>
      {childrens !== '0' && (
        <TextField 
          fullWidth
          style={{ marginTop: theme.spacing(3)}}
          label="Quantos filhos?"
          type="number"
          value={childrens || ''}
          onChange={handleChildrens}
        />
      )}
    </>
  )
}

export default memo(CivilState);