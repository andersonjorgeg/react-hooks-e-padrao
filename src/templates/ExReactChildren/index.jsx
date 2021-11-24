import { Children, cloneElement } from 'react';

const s = {
  style: {
    fontSize: '60px',
  },
};

// ReactChildren é uma função que retorna um array de elementos.
const Parent = ({ children }) => {
  // children é um array de elementos
  console.log(children);
  return Children.map(children, (child) => {
    // child é um elemento
    console.log(child);

    // cloneElement é uma função que recebe um elemento e um objeto com as propriedades que deseja alterar
    const newChild = cloneElement(child, { ...s });
    return newChild;
  });
};

export const ExReactChildren = () => {
  return (
    <Parent>
      <p>oi</p>
      <p>oi 2</p>
      <span>Olá</span>
    </Parent>
  );
};
