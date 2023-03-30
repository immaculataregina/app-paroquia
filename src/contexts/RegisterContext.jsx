import React, { createContext, useCallback, useContext } from 'react';
import { api } from '../services/api';
import useReducerPersist from '../services/hooks/useReducerPersist';
import { AppContext } from './AppContext';

const initialValue = {
  registerState: {
    stepValid: false,
    dados :{
      cpf: '',
      nomeCompleto: '',
      apelido: '',
      idPerfilPessoa: 1,
      dtNascimento: '',
      idEstadoCivil: 1, // 1 ou 2
      filhos: null, // se não tem mandar 0
      idSexo: null, // 1 ou 2
      idProfissao: null,
      idGrauInstrucao: null,
      idFormacao: null 
    },
    endereco: {
      cep: '',
      estado: '',
      cidade: '',
      bairro: '',
      logradouro: '',
      numero: '',
      complemento: '',
      ibge: '',
    },
    vinculo: {
      idPastoral: null
    },
    contato : {
      celular: '',
      whatsapp: true,
      email: '',
    },
    usuario: {
      senha: '',
      idsFuncionalidades: '',
    },
    termo: {
      idTermo: 1,
      aceito: true
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
        dados: {
          ...state.dados,
          cpf: action.cpf
        }
      }
    case 'HANDLE_NAME':
      return {
        ...state,
        dados: {
          ...state.dados,
          nomeCompleto: action.name
        }
      }
    case 'HANDLE_SURNAME':
      return {
        ...state,
        dados: {
          ...state.dados,
          apelido: action.surname
        }
      }
    case 'HANDLE_BIRTHDAY':
      return {
        ...state,
        dados: {
          ...state.dados,
          dtNascimento: action.birthday
        }
      }
    case 'HANDLE_MARRIAGE':
      return {
        ...state,
        dados: {
          ...state.dados,
          idEstadoCivil: action.idEstadoCivil
        }
      }
    case 'HANDLE_CHILDREN':
      return {
        ...state,
        dados: {
          ...state.dados,
          filhos: action.filhos
        }
      }
    case 'HANDLE_SEX':
      return {
        ...state,
        dados: {
          ...state.dados,
          idSexo: action.idSexo
        }
      }
    case 'HANDLE_PROFESSION':
      return {
        ...state,
        dados: {
          ...state.dados,
          idProfissao: action.idProfissao
        }
      }
    case 'HANDLE_LEVEL_OF_EDUCATION':
      return {
        ...state,
        dados: {
          ...state.dados,
          idGrauInstrucao: action.idGrauInstrucao
        }
      }
    case 'HANDLE_TRAINING':
      return {
        ...state,
        dados: {
          ...state.dados,
          idFormacao: action.idFormacao
        }
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
          complemento: action.complemento,
          ibge: action.ibge
        }
      }
    case 'HANDLE_PHONE':
      return {
        ...state,
        contato: {
          ...state.contato,
          celular: action.number,
          whatsapp: action.whatsapp
        }
      }
    case 'HANDLE_EMAIL':
      return {
        ...state,
        contato: {
          ...state.contato,
          email: action.email
        }
      }
    case 'HANDLE_USER':
      return {
        ...state,
        usuario: {
          ...state.usuario,
          senha: action.password
        }
      }
    case 'HANDLE_TERM':
      return {
        ...state,
        termo: {
          ...state.termo,
          aceito: action.term
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

    if (response.status === 200) {
      lastCep = response.data.cep;
      registerDispatch({ type: 'HANDLE_ADDRESS',
        ...registerState.endereco,
        cep: response.data.cep,
        estado: response.data.uf,
        cidade: response.data.localidade,
        bairro: response.data.bairro,
        logradouro: response.data.logradouro,
        ibge: response.data.ibge
      })
    }

    appDispatch({ type: 'HANDLE_LOADING', loading: false });
  }, [registerState]);

  const verifyCpf = useCallback(async (cpf) => {
    appDispatch({ type: 'HANDLE_LOADING', loading: true });
    const response = await api.pessoas.verifyCpf(cpf);
    appDispatch({ type: 'HANDLE_LOADING', loading: false });

    return response;
  }, []);


  const signUpUser = useCallback(async () => {
    appDispatch({ type: 'HANDLE_LOADING', loading: true });
    
    const body = {
      dados: registerState.dados,
      endereco: registerState.endereco,
      vinculo: registerState.vinculo,
      contato: registerState.contato,
      usuario: registerState.usuario,
      termo: registerState.termo
    }
    
    const response = await api.pessoas.signUpUser(body);
    appDispatch({ type: 'HANDLE_LOADING', loading: false });
    return response;
  })

  return (
    <RegisterContext.Provider
      value={{
        registerState,
        registerDispatch,
        searchAddress,
        verifyCpf,
        signUpUser
      }}
    >
      {children}
    </RegisterContext.Provider>
  )
}