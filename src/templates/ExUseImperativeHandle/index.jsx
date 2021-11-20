import { useState, useRef, useLayoutEffect, useImperativeHandle } from 'react';
//importado forwardReF
import { forwardRef } from 'react';

// componente pai
export const ExUseImperativeHandle = () => {
  // cria um estado
  const [counted, setCounted] = useState([0, 1, 2, 3, 4]);
  // cria uma referência
  const divRef = useRef();

  // useLayoutEffect é um hook que executa uma função que é executada apenas quando o componente for renderizado em tela e não quando o componente for atualizado. ou seja, a função vai esperar o componente ser renderizado em tela para executar.
  useLayoutEffect(() => {
    // retorna a data em milisegundos
    const now = Date.now();
    // espera 3 segundos
    while (Date.now() < now + 300) {
      // scrollTop() retorna a posição do scroll
      // scrollHeight() retorna o tamanho do scroll
      divRef.current.divRef.scrollTop = divRef.current.divRef.scrollHeight;
    }
  });
  // função que incrementa o estado
  function handleClick() {
    // incrementa o estado
    setCounted((c) => [...c, c.length]);
    divRef.current.handleClick();
    console.log(divRef.current.divRef);
  }

  return (
    <>
      <button onClick={handleClick}>Count: {counted.slice(-1)}</button>
      {/* passando o ref para o componente filho */}
      <DisplayCounted counted={counted} ref={divRef} />
    </>
  );
};

// usando o forwardRef para passar o ref do componente pai para o componente filho
export const DisplayCounted = forwardRef(function DisplayCounted(
  { counted },
  ref,
) {
  const [rand, setRand] = useState('0.24');
  const divRef = useRef();

  const handleClick = () => {
    setRand(Math.random().toFixed(2));
  };

  // useImperativeHandle é um hook que permite passar uma função para o componente pai de forma obrigatória.
  useImperativeHandle(ref, () => ({
    handleClick,
    divRef: divRef.current,
  }));

  return (
    <div
      // usando o ref para pegar a div
      ref={divRef}
      style={{
        height: '200px',
        width: '200px',
        overflowY: 'scroll',
      }}
    >
      {counted.map((item) => {
        return (
          <p onClick={handleClick} key={`item-${item}`}>
            {item} +++ {rand}
          </p>
        );
      })}
    </div>
  );
});
