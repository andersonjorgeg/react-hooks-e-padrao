import './styles.css';
import { useState } from 'react';

export default function ExUseState() {
  const [counter, setCounter] = useState(0);

  const handleIncrement = () => {
    setCounter(counter + 1);
  };
  const handleDecrement = () => {
    setCounter((c) => c - 1);
  };

  return (
    <div className="App">
      <header>
        <h1>Contador {counter}</h1>
        <button onClick={handleIncrement}>increment</button>
        <button onClick={handleDecrement}>decrement</button>
      </header>
    </div>
  );
}
