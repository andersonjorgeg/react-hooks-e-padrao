import * as types from './types';

//criando a ação para incrementar o contador
export const incrementCounter = (dispatch) => {
  //dispatch é o que vai disparar a ação
  dispatch({ type: types.INCREMENT_COUNTER });
};

//criando a ação para decrementar o contador
export const decrementCounter = (dispatch) => {
  //dispatch é o que vai disparar a ação
  dispatch({ type: types.DECREMENT_COUNTER });
};
