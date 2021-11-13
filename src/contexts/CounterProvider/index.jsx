import P from 'prop-types';
import { CounterContext } from './context';
import { useReducer } from 'react';
import { reducer } from './reducer';
import { data } from './data';

// Component: CounterProvider
export const CounterProvider = ({ children }) => {
  // criando estado inicial com o reducer
  const [counterState, counterDispatch] = useReducer(reducer, data);

  return (
    // exportando o contexto e o estado
    <CounterContext.Provider value={{ counterState, counterDispatch }}>
      {children}
    </CounterContext.Provider>
  );
};

// PropTypes
CounterProvider.propTypes = {
  children: P.node.isRequired,
};
