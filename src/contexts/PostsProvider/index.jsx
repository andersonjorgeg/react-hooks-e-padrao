import P from 'prop-types';
import { PostsContext } from './context';
import { useReducer } from 'react';
import { reducer } from './reducer';
import { data } from './data';

// Component: PostsProvider
export const PostsProvider = ({ children }) => {
  // criando estado inicial com o reducer
  const [postsState, postsDispatch] = useReducer(reducer, data);

  return (
    // exportando o contexto e o estado
    <PostsContext.Provider value={{ postsState, postsDispatch }}>
      {children}
    </PostsContext.Provider>
  );
};

// PropTypes
PostsProvider.propTypes = {
  children: P.node.isRequired,
};
