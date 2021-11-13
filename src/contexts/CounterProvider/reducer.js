import * as types from './types';

export const reducer = (state, action) => {
  switch (action.type) {
    //chamando o action de incrementar
    case types.INCREMENT_COUNTER:
      //retornando o state com o valor incrementado
      return { ...state, counter: state.counter + 1 };
    //chamando o action de decrementar
    case types.DECREMENT_COUNTER:
      //retornando o state com o valor decrementado
      return { ...state, counter: state.counter - 1 };
  }

  //retornando o state padrão
  return { ...state };
};
