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
  },
  loginDispatch: (value) => {},
}

export const LoginContext = createContext(initialValue);

const loginReducer = (state, action) => {
  switch(action.type) {
    case 'LOGIN':
      return {
        ...state,
        loginState: {...action.loginState}
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
        apelido: '',
        nome: '',
        email: response.user.email,
        uid: response.user.uid,
        apiKey: response.user.apiKey
      }
      appDispatch({ type: 'HANDLE_LOGIN', isSignedIn: response.result });
      loginDispatch({ type: 'LOGIN', loginState: user });
      appDispatch({ type: 'HANDLE_LOADING', loading: false });
      
      return true;
    }

    if (response.errorCode) {
      appDispatch({ type: 'HANDLE_LOGIN', isSignedIn: false })
      appDispatch({ type: 'HANDLE_ALERT', alert: 1 });
      loginDispatch({ type: 'LOGOUT', loginState: user });
      appDispatch({ type: 'HANDLE_LOADING', loading: false });
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