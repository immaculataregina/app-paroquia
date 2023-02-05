import { TextField } from "@mui/material";
import { memo, useCallback, useContext, useState } from "react";
import { RegisterContext } from "../../../../contexts/RegisterContext";

function Name() {
  const { registerState, registerDispatch } = useContext(RegisterContext);
  const [stepValid, setStepValid] = useState(null);

  const value = registerState.nome;

  const nameIsValid = useCallback((value) => {
    const regex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]{2,}\s([A-Za-z\s]{2,3})?[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s']{4,}$/;
    const result = regex.test(value);
    (value !== null && setStepValid(result));
    registerDispatch({ type: 'HANDLE_VALID', stepValid: result });
  }, []);

  const handleInput = useCallback((event) => {
    let newValue = event.target.value;
    nameIsValid(newValue);
    registerDispatch({ type: 'HANDLE_NAME', name: newValue });
  }, []);


  return (
    <TextField
      fullWidth
      autoFocus
      label="Informe seu nome completo"
      error={stepValid !== null && !stepValid}
      value={value || ''}
      onInput={handleInput}
    />
  )
}

export default memo(Name);