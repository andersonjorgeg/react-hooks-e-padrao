import { useReducer, createContext, useContext, useRef } from 'react';
import P from 'prop-types';
import './styles.css';

//actions.js
export const actions = {
  CHANGE_TITLE: 'CHANGE_TITLE',
};

//data.js
export const globalState = {
  title: 'Anderson Jorge',
  body: 'O body do contexto',
  counter: 0,
};

//reducer.js
export const reducer = (state, action) => {
  switch (action.type) {
    case actions.CHANGE_TITLE: {
      console.log('mudar titulo');
      return { ...state, title: action.payload };
    }
  }
  return { ...state };
};

//AppContext.jsx
export const Context = createContext();
export const AppContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, globalState);

  const changeTitle = (payload) => {
    dispatch({ type: actions.CHANGE_TITLE, payload });
  };

  return (
    <Context.Provider value={{ state, changeTitle }}>
      {children}
    </Context.Provider>
  );
};

//propTypes
AppContext.propTypes = {
  children: P.node,
};

//H1/index.jsx
export const H1 = () => {
  const context = useContext(Context);
  const inputRef = useRef();

  return (
    <>
      <h1 onClick={() => context.changeTitle(inputRef.current.value)}>
        {context.state.title}
      </h1>
      <input type="text" ref={inputRef} />
    </>
  );
};

//ExUseContextExUseReducer/index.jsx
export default function ExUseContextExUseReducer() {
  return (
    <AppContext>
      <div className="App">
        <h1>useContext + useReducer</h1>
        <H1 />
      </div>
    </AppContext>
  );
}
