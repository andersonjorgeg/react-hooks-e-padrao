import './styles.css';
import { useReducer } from 'react';

const globalState = {
  title: 'O titulo do contexto',
  body: 'O body do contexto',
  counter: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'muda': {
      console.log('chamou muda com', action.payload);
      return { ...state, title: action.payload };
    }
    case 'inverter': {
      console.log('Chamou inverter');
      const { title } = state;
      return { ...state, title: title.split('').reverse().join('') };
    }
  }

  console.log('NENHUMA ACTION ENCONTRADA...');
  return { ...state };
};

export default function ExUseReducer() {
  const [state, dispatch] = useReducer(reducer, globalState);
  const { counter, title, body } = state;

  return (
    <div className="App">
      <h1>
        {title} {counter}
      </h1>
      <button
        onClick={() =>
          dispatch({
            type: 'muda',
            payload: new Date().toLocaleString('pt-BR'),
          })
        }
      >
        Mudar
      </button>
      <button onClick={() => dispatch({ type: 'inverter' })}>
        Inverter título
      </button>
      <button onClick={() => dispatch({ type: '' })}>Chamar</button>
    </div>
  );
}
