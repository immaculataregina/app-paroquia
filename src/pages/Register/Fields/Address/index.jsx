import { memo, useCallback, useContext, useMemo, useState, useEffect } from "react";
import { CircularProgress, InputAdornment, MenuItem, TextField } from "@mui/material";
import { RegisterContext } from "../../../../contexts/RegisterContext";
import { AppContext } from "../../../../contexts/AppContext";
import InputMask from "react-input-mask";
import { firstLetterUpper } from '../../../../services/firstLetterUpper.js';

function Address() {
  const { appState } = useContext(AppContext);
  const { registerState, registerDispatch, searchAddress } = useContext(RegisterContext);
  const [stepValid, setStepValid] = useState({
    cep: null,
    estado: null,
    cidade: null,
    bairro: null,
    logradouro: null,
    numero: null
  });

  const regex = {
    cep: /^\d{5}-\d{3}$/,
    estado: /^[A-Z]{2}$/,
    idCidade: /^\d{1,}$/,
    cidade: /^[.a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ() \-'`]{2,}$/,
    bairro: /^[.a-zA-Z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ() \-'`]{2,}$/,
    logradouro: /^[.a-zA-Z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ() \-'`]{2,}$/,
    numero: /^[a-zA-Z0-9 ]{1,}$/
  };

  const value = registerState.endereco;

  useEffect(() => {
    isStepValid();
  }, [value]);

  const isValid = useCallback((attr, value) => {
    if (!(attr in stepValid)) return;

    const result = (regex[attr] || /./).test(value);
    stepValid[attr] = (value === null ? null : result);

    if (attr === 'cep' && stepValid[attr] && !value.cidade) {
      getAddressByCep(value);
    }
    setStepValid(stepValid);
  }, [stepValid]);

  const isStepValid = useCallback(() => {
    Object.entries(value).map(([attr, valor]) => isValid(attr, valor));
    let attrsValid = (
      (Object.values(stepValid).indexOf(false) === -1) &&
      (Object.values(stepValid).indexOf(null) === -1)
    );

    registerDispatch({ type: 'HANDLE_VALID', stepValid: attrsValid });
  }, [value]);

  const handleInput = useCallback((attr, event) => {
    let newValue = (event !== null && typeof event === 'object') ? event.target.value : event;

    if (attr === 'state') value[attr] = newValue;
    else value[attr] = firstLetterUpper(newValue)
    isValid(attr, newValue);
    registerDispatch({ type: 'HANDLE_ADDRESS', ...value });
  }, [value]);

  const clearFields = useCallback((fields = []) => {
    fields.map(field => {
      handleInput(field, null);
    });
  }, []);

  const getStates = useMemo(() => {
    const states = [
      { sigla: 'AC', nome: 'Acre' },
      { sigla: 'AL', nome: 'Alagoas' },
      { sigla: 'AP', nome: 'Amapá' },
      { sigla: 'AM', nome: 'Amazonas' },
      { sigla: 'BA', nome: 'Bahia' },
      { sigla: 'CE', nome: 'Ceará' },
      { sigla: 'DF', nome: 'Distrito Federal' },
      { sigla: 'ES', nome: 'Espírito Santo' },
      { sigla: 'GO', nome: 'Goiás' },
      { sigla: 'MA', nome: 'Maranhão' },
      { sigla: 'MT', nome: 'Mato Grosso' },
      { sigla: 'MS', nome: 'Mato Grosso do Sul' },
      { sigla: 'MG', nome: 'Minas Gerais' },
      { sigla: 'PA', nome: 'Pará' },
      { sigla: 'PB', nome: 'Paraíba' },
      { sigla: 'PR', nome: 'Paraná' },
      { sigla: 'PE', nome: 'Pernambuco' },
      { sigla: 'PI', nome: 'Piauí' },
      { sigla: 'RJ', nome: 'Rio de Janeiro' },
      { sigla: 'RN', nome: 'Rio Grande do Norte' },
      { sigla: 'RS', nome: 'Rio Grande do Sul' },
      { sigla: 'RO', nome: 'Rondônia' },
      { sigla: 'RR', nome: 'Roraima' },
      { sigla: 'SC', nome: 'Santa Catarina' },
      { sigla: 'SP', nome: 'São Paulo' },
      { sigla: 'SE', nome: 'Sergipe' },
      { sigla: 'TO', nome: 'Tocantins' },
    ];
    return states.map(state => 
      <MenuItem key={state.sigla} value={state.sigla}>
        {state.nome}
      </MenuItem>
    );
  }, []);

  const getAddressByCep = useCallback(async (cep) => {
    if(stepValid.cep === null || stepValid === false) return;
    await searchAddress(cep);
  }, [value]);

  return (
    <>
      <InputMask
        fullWidth
        mask="99999-999"
        label="Informe seu CEP"
        type="tel"
        maskChar=" "
        value={value.cep || ''}
        onChange={(event) => {
          handleInput('cep', event);
        }}
      >
        {(inputProps) => (
          <TextField 
            {...inputProps}
            InputProps={{
              endAdornment: appState.carregando && <InputAdornment position='end'><CircularProgress size={20}/></InputAdornment>
            }}
          />
        )}
      </InputMask>
      <TextField
        style={{ marginTop: '24px', textAlign: 'left' }}
        fullWidth
        select
        label="Estado"
        disabled
        value={value.estado || ''}
        onChange={event => {
          handleInput('state', event);
        }}
      >
        {getStates}
      </TextField>
      <TextField
        style={{ marginTop: '24px' }}
        fullWidth
        label="Cidade"
        disabled
        value={value.cidade || ''}
        onChange={event => {
          handleInput('cidade', event);
        }}
      />
      <TextField
        style={{ marginTop: '24px' }}
        fullWidth
        label="Bairro"
        disabled
        value={value.bairro || ''}
        onChange={event => {
          handleInput('bairro', event);
        }}
      />
      <TextField
        style={{ marginTop: '24px' }}
        fullWidth
        label="Logradouro"
        disabled
        placeholder="Rua, Avenida, Alameda..."
        value={value.logradouro || ''}
        onChange={event => {
          handleInput('logradouro', event);
        }}
      />
      <TextField
        style={{ marginTop: '24px' }}
        fullWidth
        label="Número"
        disabled={appState.loading}
        value={value.numero || ''}
        onChange={event => {
          handleInput('numero', event);
        }}
      />
      <TextField
        style={{ marginTop: '24px' }}
        fullWidth
        label="Complemento"
        disabled={appState.loading}
        value={value.complemento || ''}
        onChange={event => {
          handleInput('complemento', event);
        }}
        InputProps={{
          endAdornment: <InputAdornment style={{ opacity: '0.5', fontSize: '0.8rem' }} position='end'>(opcional)</InputAdornment>
        }}
      />
    </>
  )
}

export default memo(Address);