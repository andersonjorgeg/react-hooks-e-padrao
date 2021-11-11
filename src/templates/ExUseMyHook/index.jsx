import './styles.css';
import { useState, useEffect, useRef } from 'react';

const useMyHook = (cb, delay = 1000) => {
  const savedCb = useRef();

  //vai lembrar o ultimo callback chamado
  useEffect(() => {
    savedCb.current = cb;
  }, [cb]);

  useEffect(() => {
    const interval = setInterval(() => {
      savedCb.current(); //chamando o useRef
    }, delay);

    //limpando o interval
    return () => clearInterval(interval);
  }, [delay]);
};

export default function ExUseMyHook() {
  const [counter, setCounter] = useState(0);
  const [delay, setDelay] = useState(1000);
  const [incrementor, setIncrementor] = useState(1000);

  useMyHook(() => setCounter((c) => c + 1), delay);

  return (
    <div className="App">
      <h1>Meu hook</h1>
      <p>Contador: {counter}</p>
      <p>Delay: {delay}</p>
      <button
        onClick={() => {
          setDelay((d) => d + incrementor);
        }}
      >
        +{incrementor}
      </button>
      <button
        onClick={() => {
          setDelay((d) => d - incrementor);
        }}
      >
        -{incrementor}
      </button>
      <input
        type="number"
        value={incrementor}
        onChange={(e) => setIncrementor(Number(e.target.value))}
      />
    </div>
  );
}
