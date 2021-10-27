import P from 'prop-types';
import { useState, useCallback, useMemo } from 'react';
import './styles.css';

export default function ExUseMemo() {
  const Button = ({ incrementButton }) => {
    console.log('Filho, renderizou');
    return <button onClick={() => incrementButton(100)}>+</button>;
  };

  Button.propTypes = {
    incrementButton: P.func,
  };

  const [counter, setCounter] = useState(0);

  const incrementCounter = useCallback((num) => {
    setCounter((c) => c + num);
  }, []);

  console.log('Pai, renderizou');
  const btn = useMemo(() => {
    return <Button incrementButton={incrementCounter} />;
  }, [incrementCounter]);

  return (
    <div className="App">
      <p>teste 3</p>
      <h1>C: {counter}</h1>
      {btn}
    </div>
  );
}
