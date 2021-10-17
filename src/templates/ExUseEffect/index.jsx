import './styles.css';
import { useState, useEffect } from 'react';

const eventFn = () => {
  console.log('h2 clicado');
};

export default function ExUseEffect() {
  const [counter, setCounter] = useState(0);
  const [counter2, setCounter2] = useState(0);

  // componentDidUpdate - executa toda vez que o componente atualiza
  useEffect(() => {
    console.log('componentDidUpdate');
  });

  // componentDidMount - executa só uma vez
  useEffect(() => {
    //console.log('componentDidMount');
    document.querySelector('h2')?.addEventListener('click', eventFn);

    // componentWillUnmount - limpeza
    return () => {
      document.querySelector('h2')?.removeEventListener('click', eventFn);
    };
  }, []);

  // Com dependência - executa toda a vez que a dependência mudar
  useEffect(() => {
    console.log(`Contador mudou para ${counter}`);
  }, [counter]);

  const handleIncrement = () => {
    setCounter(counter + 1);
  };
  const handleIncrement2 = () => {
    setCounter2(counter2 + 1);
  };

  return (
    <div className="App">
      <h1>Exemplo do Hook useEffect</h1>
      <p>teste 4</p>
      <h2>Contador: {counter}</h2>
      <button onClick={handleIncrement}>increment</button>
      <h2>Contador: {counter2}</h2>
      <button onClick={handleIncrement2}>increment</button>
    </div>
  );
}
