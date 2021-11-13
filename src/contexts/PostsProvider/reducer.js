import * as types from './types';

export const reducer = (state, action) => {
  switch (action.type) {
    //chamando o action de criar post
    case types.POSTS_SUCCESS: {
      console.log(action.type);
      //retornando o state com o novo post
      return { ...state, posts: action.payload, loading: false };
    }
    //chamando o action de loading da pagina
    case types.POSTS_LOADING: {
      console.log(action.type);
      //retornando o state com o loading
      return { ...state, loading: true };
    }
  }
  console.log('Não encontrei a action:', action.type);
  //se não for nenhum dos casos acima, retorna o state
  return { ...state };
};
