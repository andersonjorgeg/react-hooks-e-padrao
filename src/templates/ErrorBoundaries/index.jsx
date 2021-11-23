import { useEffect, useState, Component } from 'react';

export const ErrorBoundaries = () => {
  const s = {
    style: {
      fontSize: '60px',
    },
  };

  // class errorBoundaries para tratamento de erros
  class MyErrorBoundary extends Component {
    constructor(props) {
      super(props);
      // estado inicial da class
      this.state = { hasError: false };
    }

    // propriedade estática para tratamento de erros
    static getDerivedStateFromError(error) {
      // Atualiza o state para que a próxima renderização mostre a UI alternativa.
      return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
      // Você também pode registrar o erro em um serviço de relatórios de erro
      //console.log(error, errorInfo);
    }

    render() {
      if (this.state.hasError) {
        // Você pode renderizar qualquer UI alternativa
        return <p {...s}>Deu ruim</p>;
      }

      return this.props.children;
    }
  }

  const ItWillThrowError = () => {
    const [counter, setCounter] = useState(0);

    const handleClick = () => {
      setCounter(counter + 1);
    };

    useEffect(() => {
      if (counter > 3) {
        throw new Error('Error');
      }
    }, [counter]);

    return (
      <div>
        <button {...s} onClick={handleClick}>
          click to increase {counter}
        </button>
      </div>
    );
  };

  return (
    <div>
      <h1>Exemplo prático de Error Boundaries</h1>
      <p style={{ margin: '10px' }}>
        aumente o contador para que fique maior que três para simular o erro
      </p>
      <MyErrorBoundary>
        <ItWillThrowError />
      </MyErrorBoundary>
      <MyErrorBoundary>
        <ItWillThrowError />
      </MyErrorBoundary>
      <MyErrorBoundary>
        <ItWillThrowError />
      </MyErrorBoundary>
      <MyErrorBoundary>
        <ItWillThrowError />
      </MyErrorBoundary>
      <MyErrorBoundary>
        <ItWillThrowError />
      </MyErrorBoundary>
    </div>
  );
};
