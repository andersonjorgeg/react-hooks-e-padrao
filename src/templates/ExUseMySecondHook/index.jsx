import './styles.css';
//importando o hook
import { useEffect, useState, useRef } from 'react';

// função para verificar se dois objetos são iguais
const isObjectEqual = (objA, objB) => {
  //transforma os objetos em strings e verifica se são iguais
  return JSON.stringify(objA) === JSON.stringify(objB);
};

// criando o hook useFetch para fazer requisições
const useFetch = (url, options) => {
  // cria o estado inicial do result
  const [result, setResult] = useState(null);
  // cria o estado inicial do loading
  const [loading, setLoading] = useState(false);
  // criando estado de carregamento da página
  const [shouldLoading, setShouldLoading] = useState(false);
  // criando a referência para url
  const urlRef = useRef(url);
  // criando a referência para options
  const optionsRef = useRef(options);

  // usando o hook useEffect para monitorar a url e options
  useEffect(() => {
    // flag para seta setShouldLoading
    let changed = false;

    // atualizando a referência da url
    if (!isObjectEqual(url, urlRef.current)) {
      urlRef.current = url;
      // seta o flag para true
      changed = true;
    }
    // atualizando a referência da options
    if (!isObjectEqual(options, optionsRef.current)) {
      optionsRef.current = options;
      // seta o flag para true
      changed = true;
    }
    if (changed) {
      setShouldLoading((s) => !s);
    }
  }, [url, options]);

  // usando o hook useEffect para chamar o hook useFetch
  useEffect(() => {
    // flag para seta o wait como false
    let wait = false;

    // verifica se deve carregar a página
    const controller = new AbortController();
    // criando uma função para cancelar a requisição
    const signal = controller.signal;

    console.log('EFFECT', new Date().toLocaleString());
    console.log(optionsRef.current.headers);
    // seta o state do loading
    setLoading(true);

    // cria a função que faz a requisição
    const fetchData = async () => {
      // cria uma promise para esperar a resposta da requisição
      await new Promise((r) => setTimeout(r, 1000));
      try {
        // cria uma constante para pegar a resposta da requisição
        const response = await fetch(urlRef.current, {
          signal,
          ...optionsRef.current,
        });
        // cria uma constante para pegar a resposta transformada em json
        const jsonResult = await response.json();

        // se wait for true
        if (!wait) {
          // seta o resultado no estado
          setResult(jsonResult);
          // seta o loading como false
          setLoading(false);
        }
        // caso ocorra algum erro
      } catch (error) {
        // se o wait for true
        if (!wait) {
          // seta o loading como false
          setLoading(false);
        }
        console.warn(error);
      }
    };
    // chama a função fetchData
    fetchData();

    // limpeza do hook useEffect - desmontando o componente
    return () => {
      // seta o wait como true
      wait = true;
      // cancela a requisição
      controller.abort();
    };
    // array de dependências do useEffect
  }, [shouldLoading]);

  // retorna o resultado e o loading da função useFetch
  return [result, loading];
};

export const ExUseMySecondHook = () => {
  const [postId, setPostId] = useState('');
  // usando o hook useFetch
  const [result, loading] = useFetch(
    'https://jsonplaceholder.typicode.com/posts/' + postId,
    {
      headers: {
        abc: '200' + postId,
      },
    },
  );

  // condicional para mostrar o loading
  if (loading) {
    return <div>Carregando...</div>;
  }

  const handleClick = (id) => {
    setPostId(id);
  };

  // condicional para mostrar o resultado
  if (!loading && result) {
    return (
      <div className="App">
        {result?.length > 0 ? (
          result.map((post) => (
            <div key={`post-${post.id}`} onClick={() => handleClick(post.id)}>
              <p>
                post {post.id} - {post.title}
              </p>
            </div>
          ))
        ) : (
          <div onClick={() => handleClick('')}>
            <p>post - {result.id}</p>
            <p>{result.body}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Meu segundo Hook</h1>
    </div>
  );
};
