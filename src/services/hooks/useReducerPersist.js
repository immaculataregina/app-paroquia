import { useReducer, useEffect } from 'react';

export default function useReducerPersist(key, reducer, initialArg) {
  const [state, dispatch] = useReducer(
    reducer,
    initialArg,
    (initialState) => {
      const valueStorage = localStorage.getItem(key);
      const value = valueStorage ? JSON.parse(valueStorage) : initialState;

      return { ...initialState, ...value };
    }
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, dispatch];
}