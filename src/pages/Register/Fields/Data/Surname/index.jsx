import { TextField } from "@mui/material";
import { memo, useCallback, useContext, useEffect, useState } from "react";
import { RegisterContext } from "../../../../../contexts/RegisterContext";

function Surname() {
  const { registerState, registerDispatch } = useContext(RegisterContext);

  const value = registerState.dados.apelido;

  useEffect(() => {
    registerDispatch({ type: 'HANDLE_VALID', stepValid: true });
  }, []);

  const handleInput = useCallback((event) => {
    let newValue = event.target.value;

    registerDispatch({ type: 'HANDLE_SURNAME', surname: newValue });
  }, []);


  return (
    <TextField
      fullWidth
      autoFocus
      label="Informe seu apelido"
      value={value || ''}
      onChange={handleInput}
    />
  )
}

export default memo(Surname);