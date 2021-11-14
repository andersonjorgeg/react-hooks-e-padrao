import './styles.css';

import { useEffect, useState } from 'react';

const useFetch = (url, options) => {
  // seta o estado inicial
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // executa a requisição
  useEffect(() => {
    console.log('EFFECT', new Date().toLocaleString());
    // seta o loading
    setLoading(true);

    // faz a requisição
    const fetchData = async () => {
      await new Promise((r) => setTimeout(r, 3000));
      try {
        const response = await fetch(url, options);
        const jsonResult = await response.json();
        setResult(jsonResult);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        throw error;
      }
    };
    fetchData();
  }, [url, options]);

  return [result, loading];
};

export const ExUseMySecondHook = () => {
  const [result, loading] = useFetch(
    'https://jsonplaceholder.typicode.com/posts',
    /*  {
      method: 'GET',
      headers: {
        ABC: '1',
      },
    },
  ); */
  );

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!loading && result) {
    console.log(result);
  }

  return (
    <div className="App">
      <h1>Meu segundo Hook</h1>
    </div>
  );
};
