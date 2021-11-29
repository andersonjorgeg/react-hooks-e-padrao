import { useState, Children, cloneElement } from 'react';

const s = {
  style: {
    fontSize: '60px',
  },
};

// Padrão Compound Components (Components compostos)
// são componentes que possuem componentes filhos
// Exemplo:
// componente Pai
const TurnOnOff = ({ children }) => {
  // setando o estado
  const [isOn, setIsOn] = useState(false);
  // função que altera o estado
  const onTurn = () => setIsOn((s) => !s);

  // retornando os componentes filhos
  return Children.map(children, (child) => {
    // confere se o tipo do componente é 'string'
    if (typeof child.type === 'string') {
      // se for retorna o componente filho original
      return child;
    }
    // child é um elemento
    const newChild = cloneElement(child, {
      isOn,
      onTurn,
    });
    // retornando o elemento
    return newChild;
  });
};

// componentes filhos
const TurnedOn = ({ isOn, children }) => (isOn ? children : null);
const TurnedOff = ({ isOn, children }) => (isOn ? null : children);
const TurnButton = ({ isOn, onTurn, ...props }) => {
  return (
    // passando os props para o componente
    <button onClick={onTurn} {...props}>
      {/* passando o estado para o componente */}
      Turn {isOn ? 'off' : 'on'}
    </button>
  );
};
const P = ({ children }) => <p {...s}>{children}</p>;

export const CompoundComponents = () => {
  return (
    <TurnOnOff>
      <TurnedOn>
        <P>Aqui as coisas que vão acontecer quando estiver on.</P>
      </TurnedOn>
      <p>oi</p>
      <TurnedOff>
        <P>Aqui vem as coisas do off.</P>
      </TurnedOff>
      <TurnButton {...s} />
    </TurnOnOff>
  );
};
