import { useContext, useEffect, useRef } from 'react';
import { loadPosts } from '../../contexts/PostsProvider/actions';
import { PostsContext } from '../../contexts/PostsProvider/context';
import { CounterContext } from '../../contexts/CounterProvider/context';
import { incrementCounter } from '../../contexts/CounterProvider/action';
import { decrementCounter } from '../../contexts/CounterProvider/action';

export const Posts = () => {
  const isMounted = useRef(true);

  //buscando o contexto do contexts/PostsProvider/context.js
  const postsContext = useContext(PostsContext);
  //desestruturando o state e o dispatch do contexto
  const { postsState, postsDispatch } = postsContext;

  //buscando o contexto do contexts/CounterProvider/context.js
  const counterContext = useContext(CounterContext);
  //desestruturando o state e o dispatch do contexto
  const { counterState, counterDispatch } = counterContext;

  //disparando a action de loadPosts
  useEffect(() => {
    loadPosts(postsDispatch).then((dispatch) => {
      if (isMounted.current) {
        dispatch();
      }
    });

    //limpeza da memoria
    return () => {
      isMounted.current = false;
    };
    //usando a dependência para disparar a action de loadPosts
  }, [postsDispatch]);

  return (
    <div>
      {/* criando o botão para aumentar o contador */}
      <button
        onClick={() => {
          incrementCounter(counterDispatch);
        }}
      >
        +
      </button>

      {/* criando o botão para diminuir o contador */}
      <button
        onClick={() => {
          decrementCounter(counterDispatch);
        }}
      >
        -
      </button>
      {/* mostrando o contador */}
      <p>Counter {counterState.counter}</p>

      <h1>Posts</h1>
      {/* mostrando o carregamento se enquanto os posts não são carregados */}
      {postsState.loading && (
        <p>
          <strong>Loading...</strong>
        </p>
      )}
      {/* usando o map para mostrar os posts na tela */}
      {postsState.posts.map((post) => (
        <p key={post.id}>{post.title}</p>
      ))}
    </div>
  );
};
