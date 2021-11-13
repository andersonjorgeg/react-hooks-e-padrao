import * as types from './types';

//criando ação para carregar os posts
export const loadPosts = async (dispatch) => {
  //criando o loading da ação
  dispatch({ type: types.POSTS_LOADING });

  //fazendo a requisição dos posts
  const postsRaw = await fetch('https://jsonplaceholder.typicode.com/posts');
  //transformando o resultado em json
  const posts = await postsRaw.json();
  console.log('Carreguei');

  //retornando uma função para carregar os posts
  return () => dispatch({ type: types.POSTS_SUCCESS, payload: posts });
};
