import { useState, useEffect, useDebugValue } from 'react';

//criando hook useMediaQuery
const useMediaQuery = (queryValue, initialValue = false) => {
  // criando o estado inicial de match
  const [match, setMatch] = useState(initialValue);

  useDebugValue(`Query: ${queryValue}`, (name) => {
    return name + ' modificado';
  });

  // criando o useEffect para verificar a media query
  useEffect(() => {
    // garante que o componente está montado
    let isMounted = true;
    // criando uma nova media query
    const matchMedia = window.matchMedia(queryValue);

    // criando a função de callback para atualizar o estado de match
    const handleChange = () => {
      if (!isMounted) return;
      // atualizando o estado de match
      setMatch(Boolean(matchMedia.matches));
    };

    // adicionando o listener de mudança no media query
    matchMedia.addEventListener('change', handleChange);

    // atualizando o estado de match
    setMatch(!!matchMedia.matches);

    // limpando o listener de mudança no media query
    return () => {
      isMounted = false;
      matchMedia.removeEventListener('change', handleChange);
    };

    // esse array de dependências assiste para ver se muda
  }, [queryValue]);

  // retornando do useMediaQuery
  return match;
};

export const ExUseMediaQuery = () => {
  // criando a const huge para o parâmetro do useMediaQuery
  const huge = useMediaQuery('(min-width: 980px)');
  // criando a const big para o parâmetro do useMediaQuery
  const big = useMediaQuery('(max-width: 979px) and (min-width: 768px)');
  // criando a const medium para o parâmetro do useMediaQuery
  const medium = useMediaQuery('(max-width: 767px) and (min-width: 321px)');
  // criando a const small para o parâmetro do useMediaQuery
  const small = useMediaQuery('(max-width: 321px)');

  // criando o background do componente com o useMediaQuery
  const background = huge
    ? 'green'
    : big
    ? 'red'
    : medium
    ? 'yellow'
    : small
    ? 'purple'
    : null;

  return <div style={{ fontSize: '60px', background }}>Oi</div>;
};
