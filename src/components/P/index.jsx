import { useContext } from 'react';
import { GlobalContext } from '../../contexts/AppContext';

//eslint-disable-next-line
export const P = () => {
  const theContext = useContext(GlobalContext);
  const {
    state: { body },
    setState,
  } = theContext;
  return (
    <p onClick={() => setState((s) => ({ ...s, counter: s.counter + 1 }))}>
      {body}
    </p>
  );
};
