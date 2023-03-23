import React, { createContext, useCallback, useContext } from 'react';
import { api } from '../services/api';
import useReducerPersist from '../services/hooks/useReducerPersist';
import { AppContext } from './AppContext';

const initialValue = {
  loginState: {
    apelido: '',
    nome: '',
    email: '',
    uid: '',
    apiKey: '',
    foto: '',
    dizimista: '',
    id_pessoa: '',
    itens_menu: []
  },
  loginDispatch: (value) => {},
}

export const LoginContext = createContext(initialValue);

const loginReducer = (state, action) => {
  switch(action.type) {
    case 'LOGIN':
      return {
        ...action.loginState
      }
    case 'LOGOUT':
      return initialValue
  }
}

export function LoginContextProvider({ children }) {
  const [loginState, loginDispatch] = useReducerPersist(
    'loginState',
    loginReducer,
    initialValue.loginState,
  );

  const { appDispatch } = useContext(AppContext);

  const logout = useCallback(() => {
    loginDispatch({ type: 'LOGOUT' });
    appDispatch({ type: 'HANDLE_LOGIN', isSignedIn: false });
    return false;
  });

  const login = useCallback(async (email, password) => {
    appDispatch({ type: 'HANDLE_LOADING', loading: true });

    const response = await api.autenticacao.loginUser(email, password);

    if (response.result) {
      const user = {
        apelido: response.configuracoes.apelido,
        nome: '',
        email: response.auth.email,
        uid: response.auth.uid,
        apiKey: response.auth.apiKey,
        foto: response.configuracoes.foto,
        dizimista: response.configuracoes.dizimista,
        id_pessoa: response.configuracoes.id_pessoa,
        itens_menu: response.configuracoes.itens_menu,
      }
      appDispatch({ type: 'HANDLE_LOGIN', isSignedIn: response.result });
      loginDispatch({ type: 'LOGIN', loginState: user });
      appDispatch({ type: 'HANDLE_LOADING', loading: false });
      
      return true;
    }

    if (response.errorCode) {
      appDispatch({ type: 'HANDLE_LOGIN', isSignedIn: false })
      appDispatch({ type: 'HANDLE_ALERT', alert: 1 });
      appDispatch({ type: 'HANDLE_LOADING', loading: false });
      loginDispatch({ type: 'LOGOUT' });
    }
  }, [])

  return (
    <LoginContext.Provider
      value={{
        loginState,
        loginDispatch,
        login,
        logout
      }}
    >
      {children}
    </LoginContext.Provider>
  )
};