import React, { createContext } from 'react';
import useReducerPersist from '../services/hooks/useReducerPersist';

const initialValue = {
  appState: {
    schema: 'immaculata',
    loading: false,
    alert: 0,
    dialog: 0,
    isSignedIn: false,
  },
  appDispatch: (value) => {},
}

export const AppContext = createContext(initialValue);

const appReducer = (state, action) => {
  switch(action.type) {
    case 'HANDLE_SCHEMA':
      return {
        ...state,
        schema: action.schema
      }
    case 'HANDLE_LOADING':
      return {
        ...state,
        loading: action.loading
      }
    case 'HANDLE_ALERT':
      return {
        ...state,
        alert: action.alert
      }
    case 'HANDLE_DIALOG':
      return {
        ...state,
        dialog: action.dialog
      }
    case 'HANDLE_LOGIN':
      return {
        ...state,
        isSignedIn: action.isSignedIn
      }
  }
}

export function AppContextProvider({ children }) {
  const [appState, appDispatch] = useReducerPersist(
    'appState',
    appReducer,
    initialValue.appState,
  );

  return (
    <AppContext.Provider
      value={{
        appState,
        appDispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  )
};