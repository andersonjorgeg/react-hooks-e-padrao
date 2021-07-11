import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

export default function App() {
  const [reverse, setReverse] = useState(false);
  const reverseClass = reverse ? 'reverse' : '';
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    setReverse((reverse) => !reverse);
  };

  const handleIncrement = () => {
    //usando callback
    setCounter((Counter) => Counter + 1);
  };
  const handleDecrement = () => {
    setCounter((Counter) => Counter - 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className={`App-logo ${reverseClass}`} alt="logo" />

        <h1>Contador: {counter}</h1>
        <p>
          <button onClick={handleIncrement}>Increment</button>
        </p>
        <p>
          <button onClick={handleDecrement}>Decrement</button>
        </p>
        <p>
          <button type="button" onClick={handleClick}>
            Reverse {reverseClass}
          </button>
        </p>
      </header>
    </div>
  );
}
