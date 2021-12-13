import React, { Suspense, useState } from 'react';

const loadComponent = () => {
  console.log('Componente carregando...');
  return import('./lazy-component');
};

// usando o lazy para carregar o componente de forma suspensa
const LazyComponent = React.lazy(loadComponent);

export const ExLazy = () => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <p>
        {/* !s serve para trocar o estado booleano ou seja se for false fica true e vice versa */}
        {/* onMouseOver serve para quando o mouse estiver sobre o componente ele troca o estado */}
        <button onMouseOver={loadComponent} onClick={() => setShow((s) => !s)}>
          {show ? 'esconder' : 'mostrar'}
        </button>
      </p>
      <Suspense fallback={<p>Loading...</p>}>
        {show && <LazyComponent />}
      </Suspense>
    </div>
  );
};
