import { useState, useEffect, useCallback } from 'react';

const useAsync = (asyncFunction, shouldRun) => {
  // cria estados para armazenar o valor da promise
  const [state, setState] = useState({
    result: null,
    error: null,
    status: 'idle',
  });

  // usando o hook useCallback para não executar a função assíncrona em loop infinito
  const run = useCallback(async () => {
    console.log('EFFECT', new Date().toLocaleString());
    // usando a promise com setTimeout para simular o tempo de carregamento
    await new Promise((resolve) => setTimeout(resolve, 3000));
    // limpando o estado
    setState({
      result: null,
      error: null,
      status: 'pending',
    });

    await new Promise((resolve) => setTimeout(resolve, 3000));
    // retorno da função run
    return (
      asyncFunction()
        // caso de sucesso
        .then((response) => {
          // atualizando o estado
          setState({
            result: response,
            error: null,
            status: 'settled',
          });
        })
        // caso de erro
        .catch((e) => {
          // atualizando o estado
          setState({
            result: null,
            error: e,
            status: 'error',
          });
        })
    );
    // array de dependências do useEffect
  }, [asyncFunction]);

  // useEffect para executar a função run
  useEffect(() => {
    // executa a função run se o parâmetro for true
    if (shouldRun) {
      // executa a função run
      run();
    }
    // array de dependências do useEffect
  }, [run, shouldRun]);

  // retorno da função useAsync
  return [run, state.result, state.error, state.status];
};

const fetchData = async () => {
  /* throw new Error('que chato'); */
  // usando a promise com setTimeout para simular o tempo de carregamento
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // função que faz a requisição assíncrona
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  // transforma a resposta em json
  const data = await response.json();
  // retorno da função fetchData
  return data;
};

export const ExUseAsync = () => {
  // criação de um estado
  const [posts, setPosts] = useState(null);
  // usando o hook useAsync
  const [reFetchData, result, error, status] = useAsync(fetchData, true);

  // usando o hook useEffect para executar a função reFetchData
  useEffect(() => {
    setTimeout(() => {
      // executa a função reFetchData
      reFetchData();
    }, 8000);
  }, [reFetchData]);

  // função que lida com o click
  function handleClick() {
    // executa a função reFetchData
    reFetchData();
  }

  switch (status) {
    case 'idle':
      return <pre>idle: Nada executando</pre>;
    case 'pending':
      return <pre>pending: Carregando...</pre>;
    case 'error':
      return <pre>error: {error.message}</pre>;
    case 'settled':
      // JSON.stringify - converte valores em string
      return (
        <pre onClick={handleClick}>
          settled: {JSON.stringify(result, null, 2)}
        </pre>
      );
  }
  return 'deu ruim';
};
