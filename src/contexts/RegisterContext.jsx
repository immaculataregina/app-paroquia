import React, { createContext, useCallback, useContext } from 'react';
import { api } from '../services/api';
import useReducerPersist from '../services/hooks/useReducerPersist';
import { AppContext } from './AppContext';

const initialValue = {
  registerState: {
    stepValid: false,
    cpf: '',
    nome: '',
    nascimento: '',
    celular: {
      numero: '',
      whatsapp: true
    },
    email: '',
    endereco: {
      cep: '',
      estado: '',
      cidade: '',
      bairro: '',
      logradouro: '',
      numero: '',
      complemento: ''
    }
  },
  registerDispatch: (value) => {},
};

export const RegisterContext = createContext(initialValue);

const registerReducer = (state, action) => {
  switch(action.type) {
    case 'HANDLE_VALID':
      return {
        ...state,
        stepValid: action.stepValid
      }
    case 'HANDLE_CPF':
      return {
        ...state,
        cpf: action.cpf
      }
    case 'HANDLE_NAME':
      return {
        ...state,
        nome: action.name
      }
    case 'HANDLE_BIRTHDAY':
      return {
        ...state,
        nascimento: action.birthday
      }
    case 'HANDLE_PHONE':
      return {
        ...state,
        celular: {
          ...state.celular,
          numero: action.number,
          whatsapp: action.whatsapp
        }
      }
    case 'HANDLE_EMAIL':
      return {
        ...state,
        email: action.email
      }
    case 'HANDLE_ADDRESS':
      return {
        ...state,
        endereco: {
          ...state.endereco,
          cep: action.cep,
          estado: action.estado,
          cidade: action.cidade,
          bairro: action.bairro,
          logradouro: action.logradouro,
          numero: action.numero,
          complemento: action.complemento
        }
      }
    case 'RESET':
      return initialValue;
  }
}

export function RegisterContextProvider({ children }) {
  const [registerState, registerDispatch] = useReducerPersist(
    'registerState',
    registerReducer,
    initialValue.registerState,
  );

  const { appDispatch } = useContext(AppContext);
  
  let lastCep;

  const searchAddress = useCallback(async (cep) => {
    if (lastCep === cep) return;
    appDispatch({ type: 'HANDLE_LOADING', loading: true });
    const response = await api.endereco.searchAddressByCep(cep);
    console.log(response);

    if (response.status === 200) {
      lastCep = response.data.cep;
      registerDispatch({ type: 'HANDLE_ADDRESS',
        ...registerState.endereco,
        cep: response.data.cep,
        estado: response.data.uf,
        cidade: response.data.localidade,
        bairro: response.data.bairro,
        logradouro: response.data.logradouro,
      })
    }

    appDispatch({ type: 'HANDLE_LOADING', loading: false });
  }, [registerState]);

  return (
    <RegisterContext.Provider
      value={{
        registerState,
        registerDispatch,
        searchAddress
      }}
    >
      {children}
    </RegisterContext.Provider>
  )
}