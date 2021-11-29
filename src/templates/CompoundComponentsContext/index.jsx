// importando os hooks
import { useState, createContext, useContext } from 'react';

// um objeto s foi criado para usar o style
const s = {
  style: {
    fontSize: '60px',
  },
};

// criando o contexto para o componente
// createContext() cria um contexto
// createContext() recebe um objeto como parâmetro
// createContext() retorna um objeto com o contexto e uma função que retorna o contexto
const TurnOnOffContext = createContext();

// Padrão Compound Components (Components compostos)
// são componentes que possuem componentes filhos
// Exemplo:
// componente Pai
const TurnOnOff = ({ children }) => {
  // setando o estado
  const [isOn, setIsOn] = useState(false);
  // função que altera o estado
  const onTurn = () => setIsOn((s) => !s);

  // criando o Provider
  return (
    // Provider é o componente que vai receber o contexto
    // Provider vai receber o estado e a função de alteração do estado
    <TurnOnOffContext.Provider value={{ isOn, onTurn }}>
      {children}
    </TurnOnOffContext.Provider>
  );
};

// componentes filho TurnedOn
// buscando o contexto
const TurnedOn = ({ children }) => {
  // usando o contexto
  const { isOn } = useContext(TurnOnOffContext);
  // retorna o contexto
  return isOn ? children : null;
};

// componentes filho TurnedOff
// buscando o contexto
const TurnedOff = ({ children }) => {
  // usando o contexto
  const { isOn } = useContext(TurnOnOffContext);
  // retorna o contexto
  return isOn ? null : children;
};

// componentes filho TurnButton
// buscando o contexto
const TurnButton = ({ ...props }) => {
  // usando o contexto
  const { isOn, onTurn } = useContext(TurnOnOffContext);
  // retorna o contexto
  return (
    // passando os props para o componente
    <button onClick={onTurn} {...props}>
      {/* passando o estado para o componente */}
      Turn {isOn ? 'off' : 'on'}
    </button>
  );
};

// componentes filho P
const P = ({ children }) => <p {...s}>{children}</p>;

export const CompoundComponentsContext = () => {
  return (
    <TurnOnOff>
      {/* usando o context para poder usar a div como filho do TurnOnOff */}
      <div>
        <header>
          <TurnedOn>
            <P>Aqui as coisas que vão acontecer quando estiver on.</P>
          </TurnedOn>
        </header>
        <section>
          <TurnedOff>
            <P>Aqui vem as coisas do off.</P>
          </TurnedOff>
        </section>
      </div>
      <TurnButton {...s} />
    </TurnOnOff>
  );
};
