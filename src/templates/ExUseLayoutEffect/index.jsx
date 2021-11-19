import { useState, useRef, useLayoutEffect } from 'react';

export const ExUseLayoutEffect = () => {
  // cria um estado
  const [counted, setCounted] = useState([0, 1, 2, 3, 4]);
  // cria uma referência
  const divRef = useRef();

  // useLayoutEffect é um hook que executa uma função que é executada apenas quando o componente for renderizado em tela e não quando o componente for atualizado. ou seja, a função vai esperar o componente ser renderizado em tela para executar.
  useLayoutEffect(() => {
    // retorna a data em milisegundos
    const now = Date.now();
    // espera 3 segundos
    while (Date.now() < now + 3000) {
      // scrollTop() retorna a posição do scroll
      // scrollHeight() retorna o tamanho do scroll
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  });
  // função que incrementa o estado
  function handleClick() {
    // incrementa o estado
    setCounted((c) => [...c, c.length]);
  }

  return (
    <>
      <button onClick={handleClick}>Count: {counted.slice(-1)}</button>
      <div
        // usando a referência para atualizar o scroll
        ref={divRef}
        style={{
          height: '200px',
          width: '200px',
          overflowY: 'scroll',
        }}
      >
        {counted.map((item) => {
          return <p key={`item-${item}`}>{item}</p>;
        })}
      </div>
    </>
  );
};
